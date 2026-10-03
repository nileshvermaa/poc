// Pure helpers: formatting, comparative rows and change detection.
import { TRADELINE_FIELDS, PERSONAL_SECTIONS, HISTORY_COLUMNS } from '../data/sampleData.js';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function fmtDate(v) {
  if (!v) return '—';
  const p = String(v).split('-');
  if (p.length !== 3) return String(v);
  return `${p[2]} ${MONTHS[Number(p[1]) - 1]} ${p[0]}`;
}

export function today() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function display(v, type, fmt) {
  if (type === 'check') return v ? 'Yes' : 'No';
  if (type === 'date' || fmt === 'date') return fmtDate(v);
  if (v === '' || v === undefined || v === null) return '—';
  if (fmt === 'amt') {
    const n = Number(String(v).replace(/,/g, ''));
    return Number.isNaN(n) ? String(v) : `₹ ${n.toLocaleString('en-IN')}`;
  }
  if (fmt === 'pct') return `${v}%`;
  return String(v);
}

/** One comparative row: reported value vs. the consumer's proposed value. */
export function buildRow({ key, label, type, optionsKey, reported, proposed, fmt }) {
  const changed = type !== 'ro' && String(proposed) !== String(reported);
  return {
    key, label, type, optionsKey, fmt, reported, proposed, changed,
    from: display(reported, type, fmt),
    to: display(proposed, type, fmt),
  };
}

export function tradelineSections(tl, edits = {}) {
  return TRADELINE_FIELDS.map((s) => ({
    title: s.title,
    rows: s.fields.map(([key, label, type, optionsKey, fmt]) =>
      buildRow({ key, label, type, optionsKey, fmt, reported: tl[key], proposed: key in edits ? edits[key] : tl[key] })),
  }));
}

export function historyBase(tl, i) {
  return { accountStatus: tl.accountStatus, assetClass: tl.assetClass, suitFiled: tl.suitFiled, dpd: tl.dpd, ...(tl.hist[i] || {}) };
}

/** Rows for the monthly history table. Edit keys are `${monthIndex}.${field}`. */
export function historyRows(tl, histEdits = {}) {
  return tl.months.map((month, i) => {
    const base = historyBase(tl, i);
    const cells = HISTORY_COLUMNS.map((c) => {
      const k = `${i}.${c.field}`;
      const proposed = k in histEdits ? histEdits[k] : base[c.field];
      return { ...c, editKey: k, reported: base[c.field], proposed, changed: proposed !== base[c.field] };
    });
    return { month, cells };
  });
}

export function tradelineChanges(tl, edits, histEdits) {
  const out = [];
  tradelineSections(tl, edits).forEach((s) => s.rows.forEach((r) => {
    if (r.changed) out.push({ field: r.key, label: r.label, from: r.from, to: r.to });
  }));
  historyRows(tl, histEdits).forEach((h) => h.cells.forEach((c) => {
    if (c.changed) out.push({ field: `history.${c.editKey}`, label: `${h.month} · ${c.label}`, from: c.reported, to: c.proposed || '—' });
  }));
  return out;
}

export function personalSections(edits = {}) {
  return PERSONAL_SECTIONS.map((s) => ({
    title: s.title,
    rows: s.fields.map(([key, label, type, optionsKey, reported, fmt]) =>
      buildRow({ key, label, type, optionsKey, fmt, reported, proposed: key in edits ? edits[key] : reported })),
  }));
}

export function personalChanges(edits) {
  const out = [];
  personalSections(edits).forEach((s) => s.rows.forEach((r) => {
    if (r.changed) out.push({ field: r.key, label: `${s.title} · ${r.label}`, from: r.from, to: r.to });
  }));
  return out;
}

export const isCaseOpen = (c) => c.children.some((ch) => ch.stage < 3);
