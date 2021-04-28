const getFontSize = (vw: number, minPixels: number) => {
  let w = window.visualViewport.width;
  let pixelwidth = minPixels + (w * vw) / 100;
  return `${pixelwidth}px`;
};
export { getFontSize };
