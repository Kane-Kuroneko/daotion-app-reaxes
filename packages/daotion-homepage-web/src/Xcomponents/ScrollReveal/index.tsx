import { FC, CSSProperties } from 'react';
import scrollReveal from 'scrollreveal';

import './index.less';

interface ScrollRevealProps {
  style?: CSSProperties;
  config?: any;
}

const REVEAL_CLASS = 'load-hidden';

export const XScrollReveal: FC<ScrollRevealProps> = ({ children, style = {}, config }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isStyleAddedRef = useRef(false);

  function onload() {
    scrollReveal().reveal(sectionRef.current, {
      delay: 500,
      duration: 1250,
      distance: '60px',
      origin: 'bottom',
      easing: 'cubic-bezier(.16, 0, .28, 1)',
      mobile: window.innerWidth <= 799,
      beforeReveal: () => {
        if (isStyleAddedRef.current) {
          return;
        }
        isStyleAddedRef.current = true;
        const style = document.createElement('style');
        style.innerHTML = `.${REVEAL_CLASS} {visibility: visible !important;}`;
        document.getElementsByTagName('head')[0].appendChild(style);
      },
      ...config,
    });
  }

  useEffect(() => {
    window.addEventListener('load', onload);

    return () => {
      window.removeEventListener('load', onload);
    };
  }, [onload]);

  return (
    <section ref={sectionRef} style={style} className="load-hidden">
      {children}
    </section>
  );
};
