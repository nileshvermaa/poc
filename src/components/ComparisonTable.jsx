import React from 'react';
import { OPTIONS } from '../data/sampleData.js';
import { Tag } from './brand/Tag.jsx';

/** Dropdown bound to one of the OPTIONS lists. */
export function OptionSelect({ optionsKey, value, onChange, ariaLabel }) {
  const opts = OPTIONS[optionsKey] || [];
  return (
    <select
      className="field__select field__input--compact"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
    >
      {opts.map((o) => (
        <option key={o} value={o}>
          {o || '—'}
        </option>
      ))}
    </select>
  );
}

function Editor({ row, onChange }) {
  const { type, label, proposed, optionsKey } = row;
  if (type === 'ro') {
    return (
      <span style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-small)' }}>
        Cannot be changed here
      </span>
    );
  }
  if (type === 'check') {
    return (
      <label className="check">
        <input
          type="checkbox"
          checked={!!proposed}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>{proposed ? 'Yes, this is not my account' : 'No'}</span>
      </label>
    );
  }
  if (type === 'select') {
    return (
      <OptionSelect
        optionsKey={optionsKey}
        value={proposed}
        onChange={onChange}
        ariaLabel={label}
      />
    );
  }
  return (
    <input
      className="field__input field__input--compact"
      type={type === 'date' ? 'date' : 'text'}
      inputMode={row.fmt === 'amt' || row.fmt === 'pct' ? 'decimal' : undefined}
      value={proposed ?? ''}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
    />
  );
}

/**
 * Comparative view: Field | As reported | Your correction.
 * @param sections  [{ title, rows: buildRow()[] }]
 * @param onChange  (fieldKey, value) => void
 */
export default function ComparisonTable({ sections, onChange }) {
  return (
    <div className="compare-container">
      {sections.map((sec) => (
        <section key={sec.title} className="compare-group">
          <div className="compare-group__header">
            <h3 className="compare-group__title">{sec.title}</h3>
          </div>
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th style={{ width: '32%' }}>Field</th>
                  <th style={{ width: '34%' }}>
                    As reported <span className="compare-col-caption">(by the lender)</span>
                  </th>
                  <th style={{ width: '34%' }}>Your correction</th>
                </tr>
              </thead>
              <tbody>
                {sec.rows.map((r) => (
                  <tr
                    key={r.key}
                    className={`compare-row ${r.changed ? 'compare-row--edited' : ''}`}
                  >
                    <td>
                      <div className="compare-label-wrap">
                        <span className="compare-label">{r.label}</span>
                        {r.changed && <Tag tone="warn">Edited</Tag>}
                      </div>
                    </td>
                    <td>
                      <span className="compare-reported">{r.from}</span>
                    </td>
                    <td>
                      <div className="compare-correction">
                        <Editor row={r} onChange={(v) => onChange(r.key, v)} />
                        {r.changed && (
                          <div className="compare-reported-hint">
                            Reported: {r.from}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
