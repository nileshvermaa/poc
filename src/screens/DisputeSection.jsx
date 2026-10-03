import React from 'react';
import { useDispute } from '../state/DisputeContext.jsx';
import { Page, Message } from '../components/common.jsx';
import { SCENARIOS } from '../data/sampleData.js';
import { isCaseOpen } from '../lib/disputeLogic.js';

export function StatusCounts({ withLink = false }) {
  const { state, actions } = useDispute();
  const open = state.cases.filter(isCaseOpen).length;
  const closed = state.cases.length - open;

  return (
    <div className="status-strip">
      <div className="status-strip__stats">
        <div className="status-strip__item">
          <span className="status-strip__label">Open disputes</span>
          <span className="status-strip__count">{open}</span>
        </div>
        <span style={{ color: 'var(--line-strong)', opacity: 0.5 }} aria-hidden="true">·</span>
        <div className="status-strip__item">
          <span className="status-strip__label">Closed disputes</span>
          <span className="status-strip__count">{closed}</span>
        </div>
      </div>
      {withLink && (
        <button
          type="button"
          className="btn--link"
          style={{ fontSize: 'var(--fs-small)' }}
          onClick={() => actions.go('status')}
        >
          Track your disputes ▸
        </button>
      )}
    </div>
  );
}

export default function DisputeSection() {
  const { state, actions, hasReport } = useDispute();
  const { basket } = state;

  const crumbs = [
    { label: 'Home', to: 'home' },
    { label: 'Dispute Section' },
  ];

  return (
    <Page crumbs={crumbs}>
      <div className="page-head">
        <h1 className="page-head__title">
          Raise a <span className="accent-crimson">Dispute</span>
        </h1>
        <span className="page-head__rule" aria-hidden="true" />
        <p className="page-head__lead">
          Choose what you want to correct. You can add several items and submit them together.
        </p>
      </div>

      {state.toast && (
        <Message tone="ok" className="toast-msg">
          {state.toast}
        </Message>
      )}

      <StatusCounts withLink />

      {!hasReport ? (
        <div className="block block--rule">
          <h2 className="block__title" style={{ marginBottom: 'var(--s2)' }}>
            You need a recent credit report first
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--s4)' }}>
            Disputes are raised against the values in your credit report. Your free report for the year is available right here, read-only.
          </p>
          <button
            type="button"
            className="btn"
            onClick={actions.viewReport}
          >
            Get my free credit report
          </button>
        </div>
      ) : (
        <div className="grid-8-4">
          {/* Main category hub */}
          <div className="hub-group">
            {/* Account details */}
            <div className="hub-section">
              <div className="hub-section__head">
                <h2 className="hub-section__title">Account details</h2>
                <p className="hub-section__desc">
                  Choose the scenario that fits, then pick the account.
                </p>
              </div>
              <div>
                {Object.entries(SCENARIOS).map(([k, sc]) => (
                  <button
                    key={k}
                    type="button"
                    className="hub-row"
                    onClick={() => actions.openTradeline(null, k)}
                  >
                    <div className="hub-row__left">
                      <span className="hub-row__title">{sc.label}</span>
                      <span className="hub-row__desc">{sc.sub}</span>
                    </div>
                    <span className="hub-row__arrow" aria-hidden="true">›</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Personal information */}
            <div className="hub-section">
              <div className="hub-section__head">
                <h2 className="hub-section__title">Personal information</h2>
                <p className="hub-section__desc">
                  Name, date of birth, gender, IDs, addresses, phone and email.
                </p>
              </div>
              <button
                type="button"
                className="hub-row"
                onClick={() => actions.go('pi')}
              >
                <div className="hub-row__left">
                  <span className="hub-row__title">Review personal information</span>
                  <span className="hub-row__desc">Correct demographic and contact details</span>
                </div>
                <span className="hub-row__arrow" aria-hidden="true">›</span>
              </button>
            </div>

            {/* Enquiry details */}
            <div className="hub-section">
              <div className="hub-section__head">
                <h2 className="hub-section__title">Enquiry details</h2>
                <p className="hub-section__desc">
                  Flag enquiries for loans or cards you never applied for.
                </p>
              </div>
              <button
                type="button"
                className="hub-row"
                onClick={() => actions.go('enq')}
              >
                <div className="hub-row__left">
                  <span className="hub-row__title">Review enquiries</span>
                  <span className="hub-row__desc">Flag unauthorised credit enquiries</span>
                </div>
                <span className="hub-row__arrow" aria-hidden="true">›</span>
              </button>
            </div>
          </div>

          {/* Request basket */}
          <aside className="request-list" aria-label="Your dispute request">
            <h2 className="request-list__title">
              Your dispute request ({basket.length})
            </h2>
            <p className="request-list__lead">
              All items in this request are submitted together. You will receive one Dispute ID to track.
            </p>

            {basket.length === 0 ? (
              <p className="request-list__empty">
                No items yet. Choose a category from the left to start.
              </p>
            ) : (
              <div>
                {basket.map((b) => {
                  const changeText = b.changes.length === 1 ? '1 change' : `${b.changes.length} changes`;
                  return (
                    <div key={b.id} className="request-list__item">
                      <div className="request-list__item-left">
                        <span className="request-list__item-cat">{b.category}</span>
                        <strong className="request-list__item-title">{b.title}</strong>
                        <span className="request-list__item-changes">{changeText}</span>
                      </div>
                      <div className="request-list__item-actions">
                        <button
                          type="button"
                          className="btn--link"
                          style={{ fontSize: 'var(--fs-small)' }}
                          onClick={() => actions.editItem(b)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn--danger-text"
                          onClick={() => actions.removeItem(b.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="request-list__footer">
              <button
                type="button"
                className="btn btn--full"
                disabled={basket.length === 0}
                onClick={() => actions.go('review')}
              >
                Review and submit ({basket.length})
              </button>
            </div>
          </aside>
        </div>
      )}
    </Page>
  );
}
