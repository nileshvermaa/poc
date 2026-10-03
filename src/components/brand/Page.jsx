import React from 'react';
import PortalHeader from './PortalHeader.jsx';
import Breadcrumbs from './Breadcrumbs.jsx';
import Footer from './Footer.jsx';

export function Page({ crumbs, minimalHeader = false, children, className = '' }) {
  return (
    <div className="app">
      <PortalHeader minimal={minimalHeader} />
      {crumbs && crumbs.length > 0 && <Breadcrumbs items={crumbs} />}
      <main className="app__content">
        <div className={`container page ${className}`.trim()}>
          {children}
        </div>
      </main>
      <Footer variant="compact" />
    </div>
  );
}

export default Page;
