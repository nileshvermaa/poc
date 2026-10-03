import React, { useState } from 'react';

const LOGO_CRIMSON = 'https://assets.equifax.com/global/images/logos/equifax_150_28.svg';
const LOGO_WHITE = 'https://d2c.equifax.co.in/gcs/assets/img/efxlogo-white.svg';

export function Wordmark({ tone = 'crimson' }) {
  const [failed, setFailed] = useState(false);
  const src = tone === 'white' ? LOGO_WHITE : LOGO_CRIMSON;

  if (failed) {
    return (
      <span className={`wordmark-text wordmark-text--${tone}`} aria-label="Equifax">
        EQUIFAX
      </span>
    );
  }

  return (
    <img
      src={src}
      alt="Equifax"
      width="107"
      height="20"
      className="wordmark-img"
      onError={() => setFailed(true)}
    />
  );
}

export default Wordmark;
