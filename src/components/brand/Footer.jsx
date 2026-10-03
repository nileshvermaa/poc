import React from 'react';
import Wordmark from './Wordmark.jsx';

const TAGLINE_IMG = 'https://assets.equifax.com/global/images/tagline/english_185x10.png';

export function Footer({ variant = 'compact' }) {
  const handleInertLink = (e) => {
    e.preventDefault();
  };

  return (
    <footer className={`footer footer--${variant}`}>
      <div className="container footer__container">
        {variant === 'full' && (
          <div className="footer__grid">
            <div className="footer__col">
              <h3 className="footer__col-title">Credit Report Help</h3>
              <ul className="footer__link-list">
                <li><a href="#" onClick={handleInertLink}>What is a Credit Report?</a></li>
                <li><a href="#" onClick={handleInertLink}>Understanding Credit Score</a></li>
                <li><a href="#" onClick={handleInertLink}>Free Annual Credit Report</a></li>
                <li><a href="#" onClick={handleInertLink}>Dispute Resolution</a></li>
              </ul>
            </div>

            <div className="footer__col">
              <h3 className="footer__col-title">Customer Education</h3>
              <ul className="footer__link-list">
                <li><a href="#" onClick={handleInertLink}>Credit Health Guidelines</a></li>
                <li><a href="#" onClick={handleInertLink}>Identity Protection</a></li>
                <li><a href="#" onClick={handleInertLink}>Financial Knowledge Base</a></li>
                <li><a href="#" onClick={handleInertLink}>Credit Myths &amp; Facts</a></li>
              </ul>
            </div>

            <div className="footer__col">
              <h3 className="footer__col-title">About Us</h3>
              <ul className="footer__link-list">
                <li><a href="#" onClick={handleInertLink}>Company Information</a></li>
                <li><a href="#" onClick={handleInertLink}>Leadership Team</a></li>
                <li><a href="#" onClick={handleInertLink}>Careers at Equifax</a></li>
                <li><a href="#" onClick={handleInertLink}>Media &amp; Press Releases</a></li>
              </ul>
            </div>

            <div className="footer__col">
              <h3 className="footer__col-title">Support</h3>
              <ul className="footer__link-list">
                <li><a href="#" onClick={handleInertLink}>Contact Equifax India</a></li>
                <li><a href="#" onClick={handleInertLink}>Consumer Grievance Redressal</a></li>
                <li><a href="#" onClick={handleInertLink}>Free Credit Report Support</a></li>
                <li><a href="#" onClick={handleInertLink}>Branch Locator</a></li>
              </ul>
            </div>
          </div>
        )}

        <div className="footer__bottom">
          <div className="footer__legal-links">
            <a href="#" onClick={handleInertLink}>Sitemap</a>
            <span className="footer__sep" aria-hidden="true">|</span>
            <a href="#" onClick={handleInertLink}>Privacy Policy</a>
            <span className="footer__sep" aria-hidden="true">|</span>
            <a href="#" onClick={handleInertLink}>Terms of Use</a>
            <span className="footer__sep" aria-hidden="true">|</span>
            <a href="#" onClick={handleInertLink}>
              {variant === 'full' ? 'Report a Vulnerability' : 'Customer Grievance Redressal'}
            </a>
          </div>

          <div className="footer__brand-lockup">
            <Wordmark tone="white" />
            {variant === 'full' && (
              <img
                src={TAGLINE_IMG}
                alt="powering the world with knowledge®"
                width="185"
                height="10"
                className="footer__tagline-img"
              />
            )}
          </div>
        </div>

        <div className="footer__copyright">
          &copy; 2026 Equifax Inc., Atlanta, Georgia. All rights reserved. Equifax and the Equifax marks used herein are trademarks of Equifax Inc.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
