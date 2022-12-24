export const measureWidthText = (textRef: any, text: string) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (textRef?.current) {
    const cs = getComputedStyle(textRef?.current);

    const weight = cs?.getPropertyValue('font-weight');
    const fontSize = cs?.getPropertyValue('font-size');
    const fontFamily = cs?.getPropertyValue('font-family');

    if (!context) return 0;

    context.font = `${weight} ${fontSize} ${fontFamily}`;
    return context.measureText(text)?.width ?? 0;
  }

  return 0;
};
