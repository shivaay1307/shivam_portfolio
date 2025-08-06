import React from 'react';
import { splitChars } from '@animations/utils/splitChars';

export const splitString = (string, by = 'WORD') => {
  if (typeof string !== 'string') {
    return string;
  }

  const words = string.split(/\s+/);
  const wrappedWords = words.map((word, index) => {
    if (word === '') return ' ';

    let wrappedChars = null;

    if (by === 'CHAR') {
      wrappedChars = splitChars(word);
    }

    return (
      <React.Fragment key={index}>
        {index !== 0 ? ' ' : null}
        <span
          className={by === 'CHAR' ? 'char' : 'word'}
          style={{
            position: 'relative',
            display: 'inline',
            whiteSpace: 'break-spaces',
          }}
        >
          {by === 'CHAR' ? wrappedChars : word}
        </span>
      </React.Fragment>
    );
  });

  return wrappedWords;
};
