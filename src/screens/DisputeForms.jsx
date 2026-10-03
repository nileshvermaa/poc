// The three dispute forms: Account details, Personal information, Enquiry details.
import React from 'react';
import { useDispute } from '../state/DisputeContext.jsx';
import { Page, BackLink, PageHeader, FormActionBar } from '../components/common.jsx';
import ComparisonTable from '../components/ComparisonTable.jsx';
import HistoryTable from '../components/HistoryTable.jsx';
import { TRADELINES, ENQUIRIES, SCENARIOS } from '../data/sampleData.js';
import {
  tradelineSections,
  historyRows,
  tradelineChanges,
  personalSections,
  personalChanges,
  fmtDate,
  display,
} from '../lib/disputeLogic.js';

function TradelinePicker({ group, title }) {
  const { state, actions } = useDispute();
  const list = TRADELINES.filter((t) => t.group === group);

  return (
    <div className="tl-picker-list" role="radiogroup" aria-label={title}>
      {list.map((t) => {
        const isSelected = t.id === state.tlId;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={`tl-option ${isSelected ? 'tl-option--selected' : ''}`}
            onClick={() => actions.pickTradeline(t.id)}
          >
            <input
              type="radio"
              checked={isSelected}
              readOnly
              className="tl-option__radio"
              aria-hidden="true"
            />
            <div className="tl-option__content">
              <span className="tl-option__institution">{t.institution}</span>
              <span className="tl-option__meta">
                {t.accountType} · {t.accountNumber}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function TradelineForm() {
  const { state, actions } = useDispute();
  const tl = TRADELINES.find((t) => t.id === state.tlId) || TRADELINES[0];
  const edits = state.tlEdits[tl.id] || {};
  const hEdits = state.histEdits[tl.id] || {};
  const sc = SCENARIOS[state.scenario];

  const crumbs = [
    { label: 'Home', to: 'home' },
    { label: 'Dispute Section', to: 'dispute' },
    { label: 'Account details' },
  ];

  return (
    <Page crumbs={crumbs}>
      <BackLink to="dispute" />
      <PageHeader title={sc.label} lead={sc.help} />

      {/* Scenario switcher tabs */}
      <div className="scenario-tabs" role="tablist" aria-label="Dispute scenario">
        {Object.entries(SCENARIOS).map(([k, s]) => {
          const isActive = k === state.scenario;
          return (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`scenario-tab ${isActive ? 'scenario-tab--active' : ''}`}
              onClick={() => actions.pickScenario(k)}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Account selector */}
      <div className="block" style={{ marginBottom: 'var(--s5)' }}>
        <h2 className="block__title" style={{ marginBottom: 'var(--s3)' }}>
          Select account
        </h2>
        <div className="tl-picker-grid">
          <div className="tl-picker-group">
            <div className="tl-picker-group__title">Open accounts</div>
            <TradelinePicker group="open" title="Open accounts" />
          </div>
          <div className="tl-picker-group">
            <div className="tl-picker-group__title">Closed accounts</div>
            <TradelinePicker group="closed" title="Closed accounts" />
          </div>
        </div>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-small)', marginBottom: 'var(--s4)' }}>
        Left: what the lender reported. Right: your correction. Edited rows are highlighted.
      </p>

      <ComparisonTable
        sections={tradelineSections(tl, edits)}
        onChange={(k, v) => actions.setTradelineField(tl.id, k, v)}
      />

      <HistoryTable
        rows={historyRows(tl, hEdits)}
        onChange={(k, v) => actions.setHistoryCell(tl.id, k, v)}
      />

      <FormActionBar
        changeCount={tradelineChanges(tl, edits, hEdits).length}
        onAdd={actions.addTradeline}
      />
    </Page>
  );
}

export function PersonalInfoForm() {
  const { state, actions } = useDispute();

  const crumbs = [
    { label: 'Home', to: 'home' },
    { label: 'Dispute Section', to: 'dispute' },
    { label: 'Personal information' },
  ];

  return (
    <Page crumbs={crumbs}>
      <BackLink to="dispute" />
      <PageHeader
        title="Correct your personal *information*"
        lead="Edit only what is wrong. Read-only fields cannot be changed here."
      />

      <ComparisonTable
        sections={personalSections(state.piEdits)}
        onChange={actions.setPersonalField}
      />

      <FormActionBar
        changeCount={personalChanges(state.piEdits).length}
        onAdd={actions.addPersonal}
      />
    </Page>
  );
}

export function EnquiryForm() {
  const { state, actions } = useDispute();

  const crumbs = [
    { label: 'Home', to: 'home' },
    { label: 'Dispute Section', to: 'dispute' },
    { label: 'Enquiry details' },
  ];

  return (
    <Page crumbs={crumbs}>
      <BackLink to="dispute" />
      <PageHeader
        title="Flag enquiries you *don't recognise*"
        lead="Each flagged enquiry becomes its own item in your dispute request."
      />

      <div className="compare-group" style={{ marginBottom: 'var(--s5)' }}>
        <div className="compare-group__header">
          <h2 className="compare-group__title">Credit enquiries</h2>
        </div>
        <div className="compare-table-wrap">
          <table className="table-read">
            <thead>
              <tr>
                <th>Lender</th>
                <th>Date</th>
                <th>Time</th>
                <th>Purpose</th>
                <th className="amount">Amount</th>
                <th>Unauthorised enquiry</th>
              </tr>
            </thead>
            <tbody>
              {ENQUIRIES.map((e) => {
                const isFlagged = !!state.enqEdits[e.id];
                return (
                  <tr
                    key={e.id}
                    className={`enquiry-row ${isFlagged ? 'enquiry-row--flagged' : ''}`}
                  >
                    <td><strong>{e.inst}</strong></td>
                    <td className="tabular">{fmtDate(e.date)}</td>
                    <td className="tabular">{e.time}</td>
                    <td>{e.purpose}</td>
                    <td className="amount tabular">{display(e.amount, 'text', 'amt')}</td>
                    <td>
                      <label className="check">
                        <input
                          type="checkbox"
                          checked={isFlagged}
                          onChange={(ev) => actions.toggleEnquiry(e.id, ev.target.checked)}
                        />
                        <span>I did not apply</span>
                      </label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <FormActionBar
        changeCount={ENQUIRIES.filter((e) => state.enqEdits[e.id]).length}
        onAdd={actions.addEnquiries}
      />
    </Page>
  );
}
