import { useRef, useState, useLayoutEffect, createElement } from 'react';
import { splitLines } from '@animations/utils/splitLines';
import { splitString } from '@animations/utils/splitString';

export const SplitLine = ({
  as = 'span',
  children,
}) => {
  const ref = useRef(null);

  const [wrappedLines, setWrappedLines] = useState(null);

  useLayoutEffect(() => {
    if (ref.current) {
      setWrappedLines(splitLines(ref.current));
    }
  }, [children]);

  if (typeof children !== 'string') {
    return createElement(as, null, children);
  }

  return createElement(
    as,
    { ref },
    wrappedLines || splitString(children, 'WORD')
  );
};
