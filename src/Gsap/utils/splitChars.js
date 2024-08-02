import React from 'react';

export const splitChars = (text) => {
  return text.split('').map((char) => (
    <div
      className="char"
      style={{
        position: 'relative',
        display: 'inline-block',
        whiteSpace: 'break-spaces',
      }}
    >
      {char}
    </div>
  ));
};
