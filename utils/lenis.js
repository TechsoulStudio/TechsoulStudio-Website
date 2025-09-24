import Lenis from '@studio-freight/lenis';

export const initLenis = () => {
  const lenis = new Lenis({
    lerp: 0.08,
    smooth: true,
    direction: 'vertical',
    gestureDirection: 'vertical',
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenis;
};
