import React, { useState } from 'react';
import { useDispute } from '../../state/DisputeContext.jsx';
import { CONSUMER } from '../../data/sampleData.js';
import Wordmark from './Wordmark.jsx';

export function PortalHeader({ minimal = false }) {
  const { state, actions } = useDispute();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeKey = ['tl', 'pi', 'enq', 'review', 'done'].includes(state.screen)
    ? 'dispute'
    : state.screen;

  const navItems = [
    { key: 'home', label: 'Home', onClick: () => actions.go('home') },
    { key: 'report', label: 'My Credit Report', onClick: () => actions.viewReport() },
    { key: 'dispute', label: 'Dispute', onClick: () => actions.go('dispute') },
    { key: 'status', label: 'Track Your Disputes', onClick: () => actions.go('status') },
  ];

  return (
    <header className="portal-header">
      <div className="container portal-header__inner">
        <div className="portal-header__brand">
          <button
            type="button"
            className="portal-header__logo-btn"
            onClick={() => actions.go('home')}
            aria-label="Equifax Home"
          >
            <Wordmark tone="crimson" />
          </button>
          <span className="portal-header__divider" aria-hidden="true" />
          <span className="portal-header__product">My Credit Report</span>
        </div>

        {!minimal && (
          <>
            <button
              type="button"
              className="portal-header__menu-btn btn btn--secondary btn--sm"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>

            <nav className={`portal-header__nav ${menuOpen ? 'portal-header__nav--open' : ''}`}>
              <ul className="portal-header__list">
                {navItems.map((item) => {
                  const isActive = activeKey === item.key;
                  return (
                    <li key={item.key} className="portal-header__item">
                      <button
                        type="button"
                        className={`portal-header__link ${isActive ? 'portal-header__link--active' : ''}`}
                        onClick={() => {
                          setMenuOpen(false);
                          item.onClick();
                        }}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="portal-header__user">
                <span className="portal-header__user-name">{CONSUMER.name}</span>
                <span className="portal-header__user-sep" aria-hidden="true">|</span>
                <button
                  type="button"
                  className="portal-header__logout btn--link"
                  onClick={() => {
                    setMenuOpen(false);
                    actions.go('web');
                  }}
                >
                  Log out
                </button>
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}

export default PortalHeader;
