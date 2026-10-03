import React from 'react';
import { fmtDate, today } from '../../lib/disputeLogic.js';

export function Gauge({ score = 742, min = 300, max = 900, date }) {
  const clamped = Math.max(min, Math.min(max, score));
  const ratio = (clamped - min) / (max - min);
  const arcLength = Math.PI * 75; // ~235.62
  const dashOffset = arcLength * (1 - ratio);
  const displayDate = date || fmtDate(today());

  return (
    <div className="gauge" role="img" aria-label={`Credit score ${score} out of ${max}`}>
      <div className="gauge__chart">
        <svg viewBox="0 0 200 115" className="gauge__svg" aria-hidden="true">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--ok)" />
              <stop offset="100%" stopColor="var(--efx-teal)" />
            </linearGradient>
          </defs>
          {/* Background track */}
          <path
            d="M 25 100 A 75 75 0 0 1 175 100"
            fill="none"
            stroke="var(--line)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Score value arc */}
          <path
            d="M 25 100 A 75 75 0 0 1 175 100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 0.6s ease-out' }}
          />
        </svg>
        <div className="gauge__value-wrap">
          <span className="gauge__score">{score}</span>
        </div>
      </div>
      <div className="gauge__label">Equifax Credit Score</div>
      <div className="gauge__date">Report date: {displayDate}</div>
      <div className="gauge__range">Scale: {min} – {max}</div>
    </div>
  );
}

export default Gauge;
