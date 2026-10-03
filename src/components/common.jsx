import React, { useState } from 'react';
import { useDispute } from '../state/DisputeContext.jsx';
import Wordmark from './brand/Wordmark.jsx';
import PortalHeader from './brand/PortalHeader.jsx';
import SiteHeader from './brand/SiteHeader.jsx';
import Breadcrumbs from './brand/Breadcrumbs.jsx';
import Footer from './brand/Footer.jsx';
import Gauge from './brand/Gauge.jsx';
import Tag from './brand/Tag.jsx';
import Message from './brand/Message.jsx';
import Page from './brand/Page.jsx';

export { Wordmark, SiteHeader, PortalHeader, Breadcrumbs, Footer, Gauge, Tag, Message, Page };

export function BrandMark() {
  return <Wordmark tone="crimson" />;
}

export function IconBack() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export function IconCheck() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

const NAV = [
  ['web', 'Website'],
  ['login', 'Log in / Sign up'],
  ['home', 'D2C home'],
  ['report', 'Free report'],
  ['dispute', 'Dispute section'],
  ['status', 'Dispute status'],
];

/** Prototype-only navigator with collapsible drawer and contextual dev triggers. */
export function PrototypeNav() {
  const { state, actions } = useDispute();
  const [collapsed, setCollapsed] = useState(false);
  const active = ['tl', 'pi', 'enq', 'review', 'done'].includes(state.screen) ? 'dispute' : state.screen;

  if (collapsed) {
    return (
      <aside className="proto proto__collapsed" aria-label="Prototype controls">
        <button
          type="button"
          className="proto__toggle"
          onClick={() => setCollapsed(false)}
        >
          Show prototype toolbar ▾
        </button>
      </aside>
    );
  }

  return (
    <aside className="proto" aria-label="Prototype navigation">
      <div className="proto__inner">
        <span className="proto__badge">PROTOTYPE</span>
        <span className="proto__label">Jump to:</span>
        <div className="proto__links">
          {NAV.map(([k, label]) => (
            <button
              key={k}
              type="button"
              className={`proto__btn ${active === k ? 'proto__btn--active' : ''}`}
              onClick={() => (k === 'report' ? actions.viewReport() : actions.go(k))}
            >
              {label}
            </button>
          ))}
        </div>

        {state.screen === 'status' && state.cases && state.cases.length > 0 && (
          <button
            type="button"
            className="proto__dev-btn"
            onClick={() => {
              state.cases.forEach((c) => actions.advanceCase(c.id));
            }}
            title="Advance stage for all cases"
          >
            Advance dispute stage
          </button>
        )}

        <span className="proto__note">Demo sandbox · no live transmission</span>
        <button
          type="button"
          className="proto__toggle"
          onClick={() => setCollapsed(true)}
          aria-label="Hide prototype toolbar"
        >
          Hide ▴
        </button>
      </div>
    </aside>
  );
}

export function AppBar() {
  return <PortalHeader />;
}

export function BackLink({ label = 'Back to Dispute section', to = 'dispute' }) {
  const { actions } = useDispute();
  return (
    <div style={{ marginBottom: 'var(--s4)' }}>
      <button
        type="button"
        className="btn--link"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--s1)', fontSize: 'var(--fs-small)' }}
        onClick={() => {
          if (to === 'report') {
            actions.viewReport();
          } else {
            actions.go(to);
          }
        }}
      >
        <IconBack />
        <span>{label}</span>
      </button>
    </div>
  );
}

function renderTwoToneTitle(title) {
  if (typeof title !== 'string' || !title.includes('*')) {
    return title;
  }
  const parts = title.split('*');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <span key={index} className="accent-crimson">
          {part}
        </span>
      );
    }
    return part;
  });
}

export function PageHeader({ title, lead }) {
  return (
    <div className="page-head">
      <h1 className="page-head__title">{renderTwoToneTitle(title)}</h1>
      <span className="page-head__rule" aria-hidden="true" />
      {lead && <p className="page-head__lead">{lead}</p>}
    </div>
  );
}

/** Sticky footer for the dispute forms: change counter, Reset, Add to request. */
export function FormActionBar({ changeCount, onAdd }) {
  const { state, actions } = useDispute();
  const label = changeCount === 1 ? '1 change' : `${changeCount} changes`;
  return (
    <div className="form-action-bar">
      <div className="container form-action-bar__inner">
        <div className="form-action-bar__summary">
          <strong className="form-action-bar__count">{label}</strong>
          {state.formMsg && (
            <div className="form-action-bar__error" role="alert">
              {state.formMsg}
            </div>
          )}
        </div>
        <div className="form-action-bar__buttons">
          <button type="button" className="btn btn--outline" onClick={actions.resetForm}>
            Reset
          </button>
          <button type="button" className="btn" onClick={onAdd}>
            Add to dispute request
          </button>
        </div>
      </div>
    </div>
  );
}
