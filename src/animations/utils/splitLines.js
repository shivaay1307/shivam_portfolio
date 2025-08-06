
export const splitLines = (element) => {
  const lineHeightString = getComputedStyle(element).getPropertyValue('line-height');
  const lineHeight = Math.round(Number(lineHeightString.split('px')[0]));
  const wordElements = element.querySelectorAll('.word');
  const wrapperY = element.getBoundingClientRect().y;
  const lines = [];
  const wrappedLines= [];

  for (const wordElement of wordElements) {
    const y = wordElement.getBoundingClientRect().y;
    const relativeY = y - wrapperY;
    const lineNo = Math.round(relativeY / lineHeight);

    lines[lineNo] = `${lines[lineNo] ? lines[lineNo] + ' ' : ''}${
      wordElement.textContent
    }`;
  }

  for (const line of lines) {
    wrappedLines.push(
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          whiteSpace: 'break-spaces',
        }}
      >
        {line}
      </div>
    );
  }

  return wrappedLines;
};
