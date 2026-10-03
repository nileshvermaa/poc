import { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';
import { TRADELINES, ENQUIRIES, SCENARIOS, SEED_CASES } from '../data/sampleData.js';
import { tradelineChanges, personalChanges, fmtDate, today } from '../lib/disputeLogic.js';
import { submitDispute } from '../services/disputeApi.js';

const DisputeContext = createContext(null);

const INITIAL = {
  screen: 'web',             // web | login | home | report | dispute | tl | pi | enq | review | done | status
  reportPulled: false,       // true once the consumer has generated / viewed a report
  scenario: 'incorrect',
  tlId: 'T1',
  tlEdits: {},               // { [tradelineId]: { [field]: value } }
  histEdits: {},             // { [tradelineId]: { [`${monthIdx}.${field}`]: value } }
  piEdits: {},               // { [field]: value }
  enqEdits: {},              // { [enquiryId]: boolean }
  basket: [],                // DisputeItem[] — submitted together as one parent case
  toast: '',
  formMsg: '',
  submitting: false,
  submitError: '',
  lastCaseId: '',
  cases: SEED_CASES,
};

const NO_CHANGES = 'Nothing changed yet. Edit at least one value in "Your correction".';

export function DisputeProvider({ children, hasRecentReport = false }) {
  const [state, setState] = useState(INITIAL);
  const stateRef = useRef(state);
  stateRef.current = state;
  const patch = useCallback((p) => setState((s) => ({ ...s, ...(typeof p === 'function' ? p(s) : p) })), []);

  const go = useCallback((screen, extra = {}) => {
    patch({ screen, formMsg: '', toast: '', submitError: '', ...extra });
    window.scrollTo(0, 0);
  }, [patch]);

  const withNotMine = (s, id) => ({ ...s.tlEdits, [id]: { ...(s.tlEdits[id] || {}), notMine: true } });

  const actions = useMemo(() => ({
    go,
    viewReport: () => go('report', { reportPulled: true }),

    openTradeline: (id, scenario) => {
      patch((s) => {
        const tlId = id || s.tlId;
        const sc = scenario || s.scenario;
        return { screen: 'tl', tlId, scenario: sc, formMsg: '', toast: '', ...(sc === 'unrecognized' ? { tlEdits: withNotMine(s, tlId) } : {}) };
      });
      window.scrollTo(0, 0);
    },
    pickScenario: (sc) => patch((s) => ({ scenario: sc, formMsg: '', ...(sc === 'unrecognized' ? { tlEdits: withNotMine(s, s.tlId) } : {}) })),
    pickTradeline: (id) => patch((s) => ({ tlId: id, formMsg: '', ...(s.scenario === 'unrecognized' ? { tlEdits: withNotMine(s, id) } : {}) })),

    setTradelineField: (id, key, value) => patch((s) => ({ formMsg: '', tlEdits: { ...s.tlEdits, [id]: { ...(s.tlEdits[id] || {}), [key]: value } } })),
    setHistoryCell: (id, key, value) => patch((s) => ({ formMsg: '', histEdits: { ...s.histEdits, [id]: { ...(s.histEdits[id] || {}), [key]: value } } })),
    setPersonalField: (key, value) => patch((s) => ({ formMsg: '', piEdits: { ...s.piEdits, [key]: value } })),
    toggleEnquiry: (id, value) => patch((s) => ({ formMsg: '', enqEdits: { ...s.enqEdits, [id]: value } })),

    resetForm: () => patch((s) => {
      if (s.screen === 'tl') return { formMsg: '', tlEdits: { ...s.tlEdits, [s.tlId]: s.scenario === 'unrecognized' ? { notMine: true } : {} }, histEdits: { ...s.histEdits, [s.tlId]: {} } };
      if (s.screen === 'pi') return { formMsg: '', piEdits: {} };
      if (s.screen === 'enq') return { formMsg: '', enqEdits: {} };
      return {};
    }),

    addTradeline: () => setState((s) => {
      const tl = TRADELINES.find((t) => t.id === s.tlId);
      let changes = tradelineChanges(tl, s.tlEdits[tl.id], s.histEdits[tl.id]);
      if (!changes.length && s.scenario === 'duplicate') changes = [{ field: 'scenario', label: 'Dispute scenario', from: '—', to: 'Duplicate account' }];
      if (!changes.length) return { ...s, formMsg: NO_CHANGES };
      const item = { id: `tl-${tl.id}`, kind: 'tl', ref: tl.id, scenario: s.scenario, category: 'Account details', title: `${SCENARIOS[s.scenario].label}: ${tl.institution} ${tl.accountNumber.slice(-8)}`, changes };
      return { ...s, screen: 'dispute', formMsg: '', basket: upsert(s.basket, [item]), toast: `Added to your request: ${item.title}` };
    }),
    addPersonal: () => setState((s) => {
      const changes = personalChanges(s.piEdits);
      if (!changes.length) return { ...s, formMsg: NO_CHANGES };
      const item = { id: 'pi', kind: 'pi', category: 'Personal information', title: 'Personal information correction', changes };
      const changeText = changes.length === 1 ? '1 change' : `${changes.length} changes`;
      return { ...s, screen: 'dispute', formMsg: '', basket: upsert(s.basket, [item]), toast: `Added to your request: personal information (${changeText})` };
    }),
    addEnquiries: () => setState((s) => {
      const flagged = ENQUIRIES.filter((e) => s.enqEdits[e.id]);
      const unflagged = ENQUIRIES.filter((e) => !s.enqEdits[e.id]).map((e) => `enq-${e.id}`);
      if (!flagged.length && !s.basket.some((b) => b.kind === 'enq')) return { ...s, formMsg: 'Tick at least one enquiry you never applied for.' };
      const items = flagged.map((e) => ({ id: `enq-${e.id}`, kind: 'enq', ref: e.id, category: 'Enquiry details', title: `Unauthorised enquiry: ${e.inst} (${fmtDate(e.date)})`, changes: [{ field: 'unauthorised', label: 'Never applied for this loan/card', from: 'No', to: 'Yes' }] }));
      const enqText = flagged.length === 1 ? '1 enquiry dispute' : `${flagged.length} enquiry disputes`;
      return { ...s, screen: 'dispute', formMsg: '', basket: upsert(s.basket, items, unflagged), toast: flagged.length ? `Added ${enqText} to your request` : 'Enquiry items updated' };
    }),

    removeItem: (id) => patch((s) => ({ basket: s.basket.filter((b) => b.id !== id) })),
    editItem: (item) => (item.kind === 'tl' ? actions.openTradeline(item.ref, item.scenario) : go(item.kind)),

    submit: async () => {
      const items = stateRef.current.basket;
      if (!items.length || stateRef.current.submitting) return;
      patch({ submitting: true, submitError: '' });
      try {
        const res = await submitDispute({ consumerId: 'SAMPLE-CONSUMER', items });
        const byItem = Object.fromEntries(res.children.map((c) => [c.itemId, c.id]));
        const newCase = { id: res.parentCaseId, date: today(), children: items.map((it) => ({ id: byItem[it.id], category: it.category, title: it.title, stage: 1 })) };
        setState((s) => ({ ...s, submitting: false, cases: [newCase, ...s.cases], basket: [], tlEdits: {}, histEdits: {}, piEdits: {}, enqEdits: {}, lastCaseId: newCase.id, screen: 'done' }));
        window.scrollTo(0, 0);
      } catch (e) {
        setState((s) => ({ ...s, submitting: false, submitError: e.message || 'Submission failed' }));
      }
    },

    // Demo only: in production, stage updates come from Salesforce / DRS.
    advanceCase: (id) => patch((s) => ({ cases: s.cases.map((c) => (c.id !== id ? c : { ...c, children: c.children.map((ch) => ({ ...ch, stage: Math.min(3, ch.stage + 1) })) })) })),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [go, patch]);

  const value = { state, actions, hasReport: state.reportPulled || hasRecentReport };
  return <DisputeContext.Provider value={value}>{children}</DisputeContext.Provider>;
}

function upsert(basket, items, removeIds = []) {
  return basket.filter((x) => !items.some((i) => i.id === x.id) && !removeIds.includes(x.id)).concat(items);
}

export function useDispute() {
  const ctx = useContext(DisputeContext);
  if (!ctx) throw new Error('useDispute must be used inside <DisputeProvider>');
  return ctx;
}
