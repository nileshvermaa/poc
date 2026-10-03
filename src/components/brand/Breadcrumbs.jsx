import React from 'react';
import { useDispute } from '../../state/DisputeContext.jsx';

function HomeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function Breadcrumbs({ items = [] }) {
  const { actions, state } = useDispute();
  const homeTarget = state.screen === 'web' ? 'web' : 'home';

  return (
    <nav aria-label="Breadcrumb" className="crumbs-bar">
      <div className="container crumbs-bar__inner">
        <ol className="crumbs-list">
          <li className="crumbs-item">
            <button
              type="button"
              className="crumbs-link"
              onClick={() => actions.go(homeTarget)}
              aria-label="Home"
            >
              <HomeIcon />
            </button>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="crumbs-item">
                <span className="crumbs-sep" aria-hidden="true">›</span>
                {isLast ? (
                  <span className="crumbs-current" aria-current="page">
                    {item.label}
                  </span>
                ) : item.to ? (
                  <button
                    type="button"
                    className="crumbs-link"
                    onClick={() => {
                      if (item.to === 'report') {
                        actions.viewReport();
                      } else {
                        actions.go(item.to);
                      }
                    }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <span className="crumbs-text">{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

export default Breadcrumbs;
