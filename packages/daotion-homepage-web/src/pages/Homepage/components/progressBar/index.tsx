import { Reaxper } from 'reaxes';

import less from './index.module.less';

interface IProgressBarProps {
  scrollEl: HTMLElement;
}

const ProgressBar: React.FC<IProgressBarProps> = Reaxper(({ scrollEl }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!scrollEl) return;

    function scrollHorizontal() {
      const val = ((scrollEl.scrollLeft + scrollEl.offsetWidth - 48) / scrollEl.scrollWidth) * 100;
      setPercent(val);
    }

    scrollHorizontal();

    scrollEl.addEventListener('scroll', scrollHorizontal);
    window.addEventListener('load', scrollHorizontal);
    return () => {
      scrollEl.removeEventListener('scroll', scrollHorizontal);
      window.removeEventListener('load', scrollHorizontal);
    };
  }, [scrollEl, percent]);

  const memoWidth = useMemo(() => {
    return {
      width: `${percent}%`,
    };
  }, [percent]);

  return (
    <div className={less.main}>
      <span style={memoWidth} className={less.mainBar} />
    </div>
  );
});

export default ProgressBar;
