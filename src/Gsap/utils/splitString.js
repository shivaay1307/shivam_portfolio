import React from 'react';
import { splitChars } from './splitChars';

export const splitString = (string, by = 'WORD') => {
  const words = string.split(/\s+/);
  const wrappedWords = words.map((word, index) => {
    if (word === '') return ' ';

    let wrappedChars = null;

    if (by === 'CHAR') {
      wrappedChars = splitChars(word);
    }

    return (
      <>
        {index !== 0 ? ' ' : null}
        <div
          className="word"
          style={{
            position: 'relative',
            display: 'inline-block',
            whiteSpace: 'break-spaces',
          }}
        >
          {by === 'CHAR' ? wrappedChars : word}
        </div>
      </>
    );
  });

  return wrappedWords;
};
