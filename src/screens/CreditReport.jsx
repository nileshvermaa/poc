import React from 'react';
import { useDispute } from '../state/DisputeContext.jsx';
import { Page, Gauge, Tag } from '../components/common.jsx';
import { CONSUMER, TRADELINES, ENQUIRIES } from '../data/sampleData.js';
import { display, fmtDate } from '../lib/disputeLogic.js';

function getStatusTag(status) {
  if (status === 'Current') {
    return <Tag tone="ok">Current</Tag>;
  }
  if (status === 'Closed') {
    return <Tag tone="muted">Closed</Tag>;
  }
  return <Tag tone="danger">{status}</Tag>;
}

export default function CreditReport() {
  const { actions } = useDispute();

  const crumbs = [
    { label: 'Home', to: 'home' },
    { label: 'My Credit Report' },
  ];

  return (
    <Page crumbs={crumbs}>
      <div className="report-head">
        <div>
          <h1 className="page-head__title">
            Your Credit <span className="accent-crimson">Report</span>
          </h1>
          <span className="page-head__rule" aria-hidden="true" />
          <p className="page-head__lead">
            Generated {CONSUMER.reportDate} · Free report
          </p>
        </div>
        <button
          type="button"
          className="btn btn--outline"
          onClick={() => actions.go('dispute')}
        >
          Raise a dispute
        </button>
      </div>

      {/* Summary strip */}
      <div className="report-summary">
        <div className="report-summary__gauge">
          <Gauge score={CONSUMER.score} date={CONSUMER.reportDate} />
        </div>
        <div className="report-summary__stats">
          <div className="report-stat">
            <span className="report-stat__label">Total accounts</span>
            <span className="report-stat__value">{TRADELINES.length}</span>
          </div>
          <div className="report-stat">
            <span className="report-stat__label">Enquiries (last 36 months)</span>
            <span className="report-stat__value">{ENQUIRIES.length}</span>
          </div>
          <div className="report-stat">
            <span className="report-stat__label">Report date</span>
            <span className="report-stat__value">{CONSUMER.reportDate}</span>
          </div>
        </div>
      </div>

      {/* Personal information section */}
      <section className="report-section" aria-labelledby="pi-heading">
        <div className="report-section__head">
          <h2 id="pi-heading" className="report-section__title">Personal information</h2>
          <button
            type="button"
            className="btn--link"
            onClick={() => actions.go('pi')}
          >
            Dispute this section
          </button>
        </div>

        <div className="personal-info-grid">
          <div className="personal-info-item">
            <div className="personal-info-item__label">Full Name</div>
            <div className="personal-info-item__value">Aarav Mehta</div>
          </div>
          <div className="personal-info-item">
            <div className="personal-info-item__label">Date of birth</div>
            <div className="personal-info-item__value">14 Jun 1990</div>
          </div>
          <div className="personal-info-item">
            <div className="personal-info-item__label">Permanent Account Number (PAN)</div>
            <div className="personal-info-item__value">ABCPM1234K</div>
          </div>
          <div className="personal-info-item">
            <div className="personal-info-item__label">Current address</div>
            <div className="personal-info-item__value">
              Flat 302, Lakeview Residency, Powai, Mumbai 400076
            </div>
          </div>
        </div>
      </section>

      {/* Accounts section */}
      <section className="report-section" aria-labelledby="accounts-heading">
        <div className="report-section__head">
          <h2 id="accounts-heading" className="report-section__title">Accounts</h2>
          <button
            type="button"
            className="btn--link"
            onClick={() => actions.openTradeline(TRADELINES[0]?.id, 'incorrect')}
          >
            Dispute an account
          </button>
        </div>
        <div className="table-wrap">
          <table className="table-read">
            <thead>
              <tr>
                <th>Lender</th>
                <th>Account</th>
                <th>Type</th>
                <th>Status</th>
                <th className="amount">Balance</th>
                <th><span className="sr-only">Action</span></th>
              </tr>
            </thead>
            <tbody>
              {TRADELINES.map((t) => (
                <tr key={t.id}>
                  <td>
                    <strong>{t.institution}</strong>
                    <div style={{ fontSize: 'var(--fs-fine)', color: 'var(--text-muted)' }}>
                      {t.group === 'open' ? 'Open account' : 'Closed account'}
                    </div>
                  </td>
                  <td className="tabular">{t.accountNumber}</td>
                  <td>{t.accountType}</td>
                  <td>{getStatusTag(t.accountStatus)}</td>
                  <td className="amount tabular">{display(t.balance, 'text', 'amt')}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="btn--link"
                      onClick={() => actions.openTradeline(t.id, 'incorrect')}
                    >
                      Dispute this account
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="scroll-hint">Scroll sideways to view all columns</div>
      </section>

      {/* Enquiries section */}
      <section className="report-section" aria-labelledby="enquiries-heading">
        <div className="report-section__head">
          <h2 id="enquiries-heading" className="report-section__title">Enquiries</h2>
          <button
            type="button"
            className="btn--link"
            onClick={() => actions.go('enq')}
          >
            Dispute an enquiry
          </button>
        </div>
        <div className="table-wrap">
          <table className="table-read">
            <thead>
              <tr>
                <th>Lender</th>
                <th>Date</th>
                <th>Purpose</th>
                <th className="amount">Amount</th>
              </tr>
            </thead>
            <tbody>
              {ENQUIRIES.map((e) => (
                <tr key={e.id}>
                  <td><strong>{e.inst}</strong></td>
                  <td className="tabular">{fmtDate(e.date)}</td>
                  <td>{e.purpose}</td>
                  <td className="amount tabular">{display(e.amount, 'text', 'amt')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="scroll-hint">Scroll sideways to view all columns</div>
      </section>

      {/* Bottom Dispute Banner */}
      <div className="block block--rule" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--s4)', flexWrap: 'wrap', marginBottom: 'var(--s5)' }}>
        <div>
          <h3 className="block__title" style={{ marginBottom: 'var(--s1)' }}>
            Spotted something incorrect in your report?
          </h3>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>
            Raise a dispute online and we will send your correction to the lender.
          </p>
        </div>
        <button
          type="button"
          className="btn"
          onClick={() => actions.go('dispute')}
        >
          Raise a Dispute
        </button>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-fine)', textAlign: 'center' }}>
        This report is a statement of information reported by credit institutions.
      </p>
    </Page>
  );
}
