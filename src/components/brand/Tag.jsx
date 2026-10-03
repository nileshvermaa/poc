import React from 'react';

export function Tag({ tone = 'muted', children, className = '' }) {
  return (
    <span className={`tag tag--${tone} ${className}`.trim()}>
      {children}
    </span>
  );
}

export default Tag;
