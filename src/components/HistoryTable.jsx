import React from 'react';
import { HISTORY_COLUMNS } from '../data/sampleData.js';
import { OptionSelect } from './ComparisonTable.jsx';

/** Monthly payment history; each reported month is editable per BRD. */
export default function HistoryTable({ rows, onChange }) {
  return (
    <section className="compare-group">
      <div className="compare-group__header">
        <h3 className="compare-group__title">Payment history (reported months)</h3>
      </div>
      <div className="compare-table-wrap">
        <table className="history-table">
          <thead>
            <tr>
              <th>Month / Year</th>
              {HISTORY_COLUMNS.map((c) => (
                <th key={c.field}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((h) => (
              <tr key={h.month}>
                <td className="tabular" style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>
                  {h.month}
                </td>
                {h.cells.map((c) => (
                  <td key={c.field}>
                    <div className={`history-cell ${c.changed ? 'history-cell--changed' : ''}`}>
                      {c.optionsKey ? (
                        <OptionSelect
                          optionsKey={c.optionsKey}
                          value={c.proposed}
                          onChange={(v) => onChange(c.editKey, v)}
                          ariaLabel={`${h.month} ${c.label}`}
                        />
                      ) : (
                        <input
                          className="field__input field__input--compact"
                          type="text"
                          value={c.proposed ?? ''}
                          onChange={(e) => onChange(c.editKey, e.target.value)}
                          aria-label={`${h.month} ${c.label}`}
                        />
                      )}
                      {c.changed && <div className="history-was">Reported: {c.reported}</div>}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
