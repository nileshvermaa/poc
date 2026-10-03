// Review & submit, confirmation (Dispute ID) and Dispute Status.
import React, { useState } from 'react';
import { useDispute } from '../state/DisputeContext.jsx';
import { Page, BackLink, PageHeader, IconCheck, Tag, Message } from '../components/common.jsx';
import { StatusCounts } from './DisputeSection.jsx';
import { isCaseOpen } from '../lib/disputeLogic.js';

const CONSUMER_STAGES = ['Received', 'Under review', 'With the lender', 'Resolved'];

export function Review() {
  const { state, actions } = useDispute();
  const [confirmed, setConfirmed] = useState(false);
  const { basket } = state;

  const crumbs = [
    { label: 'Home', to: 'home' },
    { label: 'Dispute Section', to: 'dispute' },
    { label: 'Review' },
  ];

  const countText = basket.length === 1 ? '1 item' : `${basket.length} items`;

  return (
    <Page crumbs={crumbs}>
      <BackLink label="Add more items" to="dispute" />
      <PageHeader
        title="Review your *request*"
        lead={`${countText} will be sent together under one Dispute ID. We'll pass each item to the lender and keep you updated.`}
      />

      {basket.map((b, i) => (
        <div key={b.id} className="compare-group">
          <div className="compare-group__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--s2)' }}>
            <div>
              <div style={{ fontSize: 'var(--fs-fine)', color: 'var(--text-muted)' }}>
                Item {i + 1} · {b.category}
              </div>
              <h2 className="compare-group__title">{b.title}</h2>
            </div>
            <div style={{ display: 'flex', gap: 'var(--s3)', alignItems: 'center' }}>
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

          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th style={{ width: '32%' }}>Field</th>
                  <th style={{ width: '34%' }}>Reported</th>
                  <th style={{ width: '34%' }}>Your correction</th>
                </tr>
              </thead>
              <tbody>
                {b.changes.map((c) => (
                  <tr key={c.field}>
                    <td>
                      <span className="compare-label">{c.label}</span>
                    </td>
                    <td>
                      <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }} className="tabular">
                        {c.from}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--ok-text)' }} className="tabular">
                        {c.to}
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div className="block" style={{ marginTop: 'var(--s5)' }}>
        <div style={{ marginBottom: 'var(--s4)' }}>
          <label className="check">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <span>
              I confirm that the details I have entered are correct to the best of my knowledge.
            </span>
          </label>
        </div>

        {state.submitError && (
          <Message tone="danger" title="Submission failed">
            {state.submitError}
          </Message>
        )}

        <div>
          <button
            type="button"
            className="btn"
            disabled={!confirmed || !basket.length || state.submitting}
            onClick={actions.submit}
          >
            {state.submitting ? 'Submitting…' : 'Submit dispute'}
          </button>
        </div>
      </div>
    </Page>
  );
}

export function Confirmation() {
  const { state, actions } = useDispute();
  const c = state.cases.find((x) => x.id === state.lastCaseId);
  if (!c) return null;

  const crumbs = [
    { label: 'Home', to: 'home' },
    { label: 'Dispute Section', to: 'dispute' },
    { label: 'Submitted' },
  ];

  return (
    <Page crumbs={crumbs}>
      <div className="block block--rule">
        <div style={{ color: 'var(--ok-text)', display: 'flex', alignItems: 'center', gap: 'var(--s2)', marginBottom: 'var(--s2)' }}>
          <IconCheck />
          <span style={{ fontWeight: 700, fontSize: 'var(--fs-small)' }}>
            Dispute submitted successfully
          </span>
        </div>

        <h1 className="page-head__title" style={{ marginTop: 'var(--s2)' }}>
          Dispute <span className="accent-crimson">submitted</span>
        </h1>

        <div style={{ margin: 'var(--s4) 0' }}>
          <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}>
            Your Dispute ID
          </div>
          <div
            className="tabular"
            style={{
              fontSize: '2.25rem',
              fontWeight: 700,
              color: 'var(--efx-charcoal)',
              letterSpacing: '.02em',
              lineHeight: 1.2,
              marginTop: 'var(--s1)',
            }}
          >
            {c.id}
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body)', marginBottom: 'var(--s5)' }}>
          We have received your dispute and will send each item to the lender concerned. Keep this ID to refer to your dispute.
        </p>

        <div style={{ marginBottom: 'var(--s5)', borderTop: '1px solid var(--line)', paddingTop: 'var(--s4)' }}>
          <h2 style={{ fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--efx-charcoal)', marginBottom: 'var(--s2)' }}>
            What happens next
          </h2>
          <ol className="bullet-list" style={{ paddingLeft: 'var(--s4)' }}>
            <li>We review your dispute request details.</li>
            <li>The lender is asked to confirm or correct each item.</li>
            <li>You can track progress and view the outcome under Track Your Disputes.</li>
          </ol>
        </div>

        <div className="table-wrap" style={{ width: '100%', marginBottom: 'var(--s5)' }}>
          <table className="table-read">
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Category</th>
                <th>Item</th>
              </tr>
            </thead>
            <tbody>
              {c.children.map((ch) => (
                <tr key={ch.id}>
                  <td className="tabular">{ch.id}</td>
                  <td>{ch.category}</td>
                  <td><strong>{ch.title}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', gap: 'var(--s3)', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn"
            onClick={() => actions.go('status')}
          >
            Track Your Dispute
          </button>
          <button
            type="button"
            className="btn btn--outline"
            onClick={() => actions.go('home')}
          >
            Back to home
          </button>
        </div>
      </div>
    </Page>
  );
}

function StageTrack({ stage }) {
  return (
    <div className="stage-track" aria-label="Dispute progress">
      {CONSUMER_STAGES.map((label, i) => {
        const isDone = i < stage || stage === 3;
        const isCur = i === stage && stage !== 3;
        let barClass = 'stage-track__bar--next';
        if (isDone) barClass = 'stage-track__bar--done';
        else if (isCur) barClass = 'stage-track__bar--cur';

        let stepClass = '';
        if (isDone) stepClass = 'stage-track__step--done';
        else if (isCur) stepClass = 'stage-track__step--cur';

        return (
          <div key={label} className={`stage-track__step ${stepClass}`.trim()}>
            <div className={`stage-track__bar ${barClass}`} aria-hidden="true" />
            <span className="stage-track__label">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function DisputeStatus() {
  const { state, actions } = useDispute();

  const crumbs = [
    { label: 'Home', to: 'home' },
    { label: 'Track your disputes' },
  ];

  return (
    <Page crumbs={crumbs}>
      <BackLink to="dispute" />
      <PageHeader
        title="Your *disputes*"
        lead="Track the progress of your submitted dispute requests."
      />
      <StatusCounts />

      {state.cases.map((k) => {
        const open = isCaseOpen(k);
        return (
          <div key={k.id} className="case-block">
            <div className="case-block__head">
              <div>
                <div style={{ fontSize: 'var(--fs-fine)', color: 'var(--text-muted)' }}>
                  Dispute ID · Raised {k.date}
                </div>
                <div
                  className="tabular"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--efx-charcoal)',
                    letterSpacing: '.02em',
                  }}
                >
                  {k.id}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--s3)', alignItems: 'center', flexWrap: 'wrap' }}>
                <Tag tone={open ? 'warn' : 'ok'}>{open ? 'Open' : 'Resolved'}</Tag>
                {open && (
                  <button
                    type="button"
                    className="proto-only-link"
                    onClick={() => actions.advanceCase(k.id)}
                    title="Advance dispute progress (prototype only)"
                  >
                    Simulate lender update (demo)
                  </button>
                )}
              </div>
            </div>

            {k.children.map((ch) => (
              <div key={ch.id} className="child-item">
                <div className="child-item__head">
                  <div>
                    <span className="tabular" style={{ fontSize: 'var(--fs-fine)', color: 'var(--text-muted)' }}>
                      {ch.id}
                    </span>
                    <span style={{ color: 'var(--line-strong)', margin: '0 var(--s1)' }}>·</span>
                    <span style={{ fontSize: 'var(--fs-fine)', color: 'var(--text-muted)' }}>
                      {ch.category}
                    </span>
                    <div style={{ marginTop: '2px' }}>
                      <strong>{ch.title}</strong>
                    </div>
                  </div>
                  <span style={{ fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--efx-teal)' }}>
                    {CONSUMER_STAGES[ch.stage] || ch.stage}
                  </span>
                </div>
                <StageTrack stage={ch.stage} />
              </div>
            ))}
          </div>
        );
      })}
    </Page>
  );
}
