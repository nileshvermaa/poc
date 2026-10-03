import React from 'react';
import { useDispute } from '../../state/DisputeContext.jsx';
import Wordmark from './Wordmark.jsx';

const INDIA_FLAG = 'https://assets.equifax.com/global/images/flags/India_27x27.png';

export function SiteHeader({ active = 'grievance' }) {
  const { actions } = useDispute();

  const handleInertLink = (e) => {
    e.preventDefault();
  };

  return (
    <header className="site-header">
      {/* Tier 1: Brand, Segments, Utilities */}
      <div className="site-header__top">
        <div className="container site-header__top-inner">
          <div className="site-header__brand-group">
            <a href="#" onClick={handleInertLink} className="site-header__logo" aria-label="Equifax India">
              <Wordmark tone="crimson" />
            </a>
            <div className="site-header__segments" role="tablist">
              <span className="site-header__segment site-header__segment--active" role="tab" aria-selected="true">
                Personal
              </span>
              <a href="#" onClick={handleInertLink} className="site-header__segment" role="tab" aria-selected="false">
                Business
              </a>
            </div>
          </div>

          <div className="site-header__utilities">
            <a href="#" onClick={handleInertLink} className="site-header__util-link">About Us</a>
            <span className="site-header__util-sep" aria-hidden="true">|</span>
            <a href="#" onClick={handleInertLink} className="site-header__util-link">Contact Us</a>
            <span className="site-header__util-sep" aria-hidden="true">|</span>
            <a href="#" onClick={handleInertLink} className="site-header__util-link">Support ▸</a>
            <span className="site-header__util-sep" aria-hidden="true">|</span>
            <a href="#" onClick={handleInertLink} className="site-header__util-link site-header__util-link--country">
              <img src={INDIA_FLAG} alt="" width="16" height="16" className="site-header__flag" />
              <span>India ▸</span>
            </a>
          </div>
        </div>
      </div>

      {/* Tier 2: Main nav, Search, Login */}
      <div className="site-header__main">
        <div className="container site-header__main-inner">
          <nav className="site-header__nav" aria-label="Marketing navigation">
            <ul className="site-header__nav-list">
              <li>
                <a href="#" onClick={handleInertLink} className="site-header__nav-link">
                  Personal Credit Report
                </a>
              </li>
              <li>
                <a href="#" onClick={handleInertLink} className="site-header__nav-link">
                  Free Credit Report
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleInertLink}
                  className={`site-header__nav-link ${active === 'grievance' ? 'site-header__nav-link--active' : ''}`}
                >
                  Customer Grievance Redressal
                </a>
              </li>
              <li>
                <a href="#" onClick={handleInertLink} className="site-header__nav-link">
                  FAQ
                </a>
              </li>
            </ul>
          </nav>

          <div className="site-header__actions">
            <div className="site-header__search" role="search">
              <input
                type="search"
                className="site-header__search-input"
                placeholder="Search..."
                aria-label="Search equifax.co.in"
              />
            </div>
            <button
              type="button"
              className="btn btn--dark btn--sm site-header__login-btn"
              onClick={() => actions.go('login')}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
