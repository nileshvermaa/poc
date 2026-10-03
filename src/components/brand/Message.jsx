import React from 'react';

export function Message({ tone = 'info', title, children, className = '' }) {
  const role = tone === 'danger' ? 'alert' : 'status';

  return (
    <div className={`message message--${tone} ${className}`.trim()} role={role}>
      {title && <div style={{ fontWeight: 700, marginBottom: 'var(--s1)' }}>{title}</div>}
      <div>{children}</div>
    </div>
  );
}

export default Message;
