// Website instruction page, login/sign-up and D2C home.
import { useState } from 'react';
import { useDispute } from '../state/DisputeContext.jsx';
import {
  SiteHeader,
  PortalHeader,
  Breadcrumbs,
  Footer,
  Wordmark,
  Gauge,
  Tag,
  Page,
} from '../components/common.jsx';
import { CONSUMER } from '../data/sampleData.js';

const REPORT_BULB_ICON = 'https://assets.equifax.com/marketing/US/images/icon-library/f/file_report_bulb_duo.svg';

export function WebsiteInstructions() {
  const { actions } = useDispute();

  return (
    <div className="app">
      <SiteHeader active="grievance" />
      <Breadcrumbs
        items={[
          { label: 'Support', to: 'web' },
          { label: 'Raise an Online Dispute' },
        ]}
      />
      <main className="app__content">
        <div className="container page">
          <div className="page-head">
            <h1 className="web-hero__title">
              Raise an Online <span className="accent-crimson">Dispute</span>
            </h1>
            <span className="page-head__rule" aria-hidden="true" />
            <p className="page-head__lead">
              Spotted something wrong in your credit report? Correct the exact detail online and we'll take it from there.
            </p>
          </div>

          <div className="web-grid">
            <div className="web-left">
              <h2 className="block__title" style={{ marginBottom: 'var(--s3)' }}>
                How to raise a dispute
              </h2>
              <ol className="web-steps">
                <li className="web-steps__item">
                  <span className="web-steps__num" aria-hidden="true">1</span>
                  <div className="web-steps__body">
                    <strong>Log in or sign up</strong> on the Equifax D2C Portal.
                  </div>
                </li>
                <li className="web-steps__item">
                  <span className="web-steps__num" aria-hidden="true">2</span>
                  <div className="web-steps__body">
                    <strong>Get your credit report.</strong> Your free report for the year is available from your dashboard, or use one you generated recently.
                  </div>
                </li>
                <li className="web-steps__item">
                  <span className="web-steps__num" aria-hidden="true">3</span>
                  <div className="web-steps__body">
                    <strong>Open the Dispute Section</strong> from your home page, or use "Raise a dispute" on your report.
                  </div>
                </li>
                <li className="web-steps__item">
                  <span className="web-steps__num" aria-hidden="true">4</span>
                  <div className="web-steps__body">
                    <strong>Choose what to correct:</strong> account details, personal information or an enquiry. You can add more than one item.
                  </div>
                </li>
                <li className="web-steps__item">
                  <span className="web-steps__num" aria-hidden="true">5</span>
                  <div className="web-steps__body">
                    <strong>Enter the correct details</strong> next to what is currently reported, then submit.
                  </div>
                </li>
                <li className="web-steps__item">
                  <span className="web-steps__num" aria-hidden="true">6</span>
                  <div className="web-steps__body">
                    <strong>Keep your Dispute ID</strong> and track progress under Track Your Disputes.
                  </div>
                </li>
              </ol>

              <div className="web-actions">
                <button
                  type="button"
                  className="btn"
                  onClick={() => actions.go('login')}
                >
                  Go to D2C Portal
                </button>
                <button
                  type="button"
                  className="btn--link"
                  onClick={() => actions.go('status')}
                >
                  Track your dispute
                </button>
              </div>
            </div>

            <div className="web-right">
              <div className="block block--rule">
                <h3 className="block__title">Before you start</h3>
                <ul className="bullet-list">
                  <li>Your registered mobile number</li>
                  <li>Your Permanent Account Number (PAN)</li>
                  <li>A recent credit report, or eligibility for your free annual report</li>
                </ul>
                <div style={{ textAlign: 'center', marginTop: 'var(--s4)' }}>
                  <img
                    src={REPORT_BULB_ICON}
                    alt=""
                    width="64"
                    height="64"
                    style={{ display: 'inline-block' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="help-block" style={{ marginTop: 'var(--s7)' }}>
            <h3 className="help-block__title">Need help with your dispute?</h3>
            <p>
              Email: <a href="mailto:ecisupport@equifax.com">ecisupport@equifax.com</a> | Phone: <strong>1800 209 3247</strong> (Mon–Fri 9:00 AM – 6:00 PM IST)
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-fine)', marginTop: 'var(--s1)' }}>
              Equifax Credit Information Services Private Limited, Unit No. 901/902, 9th Floor, Platina, G Block, Bandra Kurla Complex, Bandra (East), Mumbai 400051.
            </p>
          </div>
        </div>
      </main>
      <Footer variant="full" />
    </div>
  );
}

export function Login() {
  const { actions } = useDispute();
  const [tab, setTab] = useState('login');
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="login-shell">
      <PortalHeader minimal />
      <main className="login-shell__main">
        <div className="login-card">
          <div className="login-card__brand">
            <Wordmark tone="crimson" />
          </div>
          <h1 className="login-card__title">Log in to your account</h1>
          <p className="login-card__sub">Please enter your mobile number to log in.</p>

          <div className="tabs-text" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'login'}
              className={`tabs-text__tab ${tab === 'login' ? 'tabs-text__tab--active' : ''}`}
              onClick={() => setTab('login')}
            >
              Log in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'signup'}
              className={`tabs-text__tab ${tab === 'signup' ? 'tabs-text__tab--active' : ''}`}
              onClick={() => setTab('signup')}
            >
              Sign up
            </button>
          </div>

          {tab === 'login' ? (
            <div>
              <div className="field">
                <label className="field__label">
                  Mobile number<span className="field__required">*</span>
                </label>
                <input
                  className="field__input"
                  type="tel"
                  placeholder="10-digit mobile number"
                />
              </div>

              {otpSent && (
                <>
                  <p className="field__help" style={{ marginBottom: 'var(--s3)' }}>
                    We've sent a 6-digit code to your mobile number.
                  </p>
                  <div className="field">
                    <label className="field__label">
                      One-time password<span className="field__required">*</span>
                    </label>
                    <input
                      className="field__input"
                      type="text"
                      inputMode="numeric"
                      placeholder="6-digit OTP"
                    />
                  </div>
                </>
              )}

              {otpSent ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)', marginTop: 'var(--s4)' }}>
                  <button
                    type="button"
                    className="btn btn--full"
                    onClick={() => actions.go('home')}
                  >
                    Verify and log in
                  </button>
                  <button
                    type="button"
                    className="btn--link"
                    style={{ textAlign: 'center', fontSize: 'var(--fs-small)' }}
                    onClick={() => setOtpSent(true)}
                  >
                    Resend code
                  </button>
                </div>
              ) : (
                <div style={{ marginTop: 'var(--s4)' }}>
                  <button
                    type="button"
                    className="btn btn--full"
                    onClick={() => setOtpSent(true)}
                  >
                    Send OTP
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="field">
                <label className="field__label">
                  Full name (as on PAN)<span className="field__required">*</span>
                </label>
                <input className="field__input" type="text" />
              </div>
              <div className="field">
                <label className="field__label">
                  Mobile number<span className="field__required">*</span>
                </label>
                <input className="field__input" type="tel" placeholder="10-digit mobile number" />
              </div>
              <div className="field">
                <label className="field__label">
                  Email address<span className="field__required">*</span>
                </label>
                <input className="field__input" type="email" />
              </div>
              <div className="field">
                <label className="field__label">
                  Permanent Account Number (PAN)<span className="field__required">*</span>
                </label>
                <input className="field__input" type="text" placeholder="e.g. ABCDE1234F" />
                <div className="field__help">As on your PAN card</div>
              </div>
              <div style={{ marginTop: 'var(--s5)' }}>
                <button
                  type="button"
                  className="btn btn--full"
                  onClick={() => actions.go('home')}
                >
                  Create account
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer variant="compact" />
    </div>
  );
}

export function Home() {
  const { state, actions } = useDispute();
  const firstName = CONSUMER.name.split(' ')[0];

  return (
    <Page crumbs={[{ label: 'Home' }]}>
      <div className="page-head">
        <h1 className="page-head__title">
          Hello, <span className="accent-crimson">{firstName}</span>
        </h1>
        <span className="page-head__rule" aria-hidden="true" />
        <p className="page-head__lead">
          {state.reportPulled
            ? 'Your report was generated today. Open it to review your accounts or raise a dispute.'
            : 'Welcome to your Equifax member dashboard.'}
        </p>
      </div>

      <div className="grid-8-4">
        <div className="block block--rule">
          <div className="block__head">
            <h2 className="block__title">My Credit Report</h2>
          </div>
          <Gauge score={CONSUMER.score} />
          <div style={{ textAlign: 'center', marginTop: 'var(--s4)' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--s4)', fontSize: 'var(--fs-small)' }}>
              You are eligible for one free report this year. It opens here and cannot be edited.
            </p>
            <button
              type="button"
              className="btn"
              onClick={actions.viewReport}
            >
              {state.reportPulled ? 'View My Report' : 'Get My Free Report'}
            </button>
          </div>
        </div>

        <div className="stack stack--s4">
          <div className="home-link-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s2)', marginBottom: 'var(--s2)' }}>
              <h3 style={{ margin: 0, fontSize: 'var(--fs-h3)' }}>Dispute Section</h3>
              <Tag tone="new">New</Tag>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-small)', marginBottom: 'var(--s4)' }}>
              Found something incorrect in your report? Raise a dispute and track it here.
            </p>
            <button
              type="button"
              className="btn btn--outline btn--sm"
              onClick={() => actions.go('dispute')}
            >
              Open Dispute Section
            </button>
          </div>

          <div className="home-link-card home-link-card--muted">
            <h3 style={{ margin: 0, fontSize: 'var(--fs-h3)', marginBottom: 'var(--s2)', color: 'var(--text-muted)' }}>
              Score monitoring
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-small)', margin: 0 }}>
              Keep an eye on changes to your score. Available with subscription.
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}
