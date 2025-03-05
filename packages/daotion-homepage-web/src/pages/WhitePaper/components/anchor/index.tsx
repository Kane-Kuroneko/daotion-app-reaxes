import { Reaxper } from 'reaxes';

import less from './index.module.less';

const Anchor = Reaxper(({ children, current, id, changeHash }) => {
  const handleChangeHash = useCallback(() => {
    changeHash(id);
  }, [changeHash, id]);

  return (
    <div className={current?.id === id ? less.anchorTarget : less.anchor} onClick={handleChangeHash}>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a href={`#${id}`} id={id} className={less.anchorHidden} />
      {children}
    </div>
  );
});

export default Anchor;
