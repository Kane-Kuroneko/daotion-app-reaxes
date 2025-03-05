import { Reaxper } from 'reaxes';

import { I18n } from '@@reaxels/i18n';

import { getElementPagePosition, throttle } from '@@utils';

import less from './index.module.less';

export type ListItem = {
  id: string;
  title: string;
};

interface IMenu {
  list: ListItem[];
  current: ListItem;
  handleSelect: (item: ListItem) => void;
  handleCloseMenu: () => void;
  target?: React.RefObject<any>;
  isMobile?: boolean;
}

const Menu: React.FC<IMenu> = Reaxper(({ list, current, handleSelect, target, isMobile, handleCloseMenu }) => {
  const mainRef = useRef(null);

  // 处理滚动时的目录高亮
  useEffect(() => {
    function initAnchor() {
      const domArray = [];

      // 遍历list，将当前可视范围内的menu添加到domArray中
      list.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          // 页面滚动到底部直接设置为最后一项;
          if (
            Math.ceil(document.documentElement.clientHeight + window.scrollY) === document.documentElement.scrollHeight
          ) {
            handleSelect(list[list.length - 1]);
            return;
          }

          const { top } = el.getBoundingClientRect();
          if (top >= 0) {
            domArray.push({
              label: item,
              top: Math.abs(el?.getBoundingClientRect().top) - top,
            });
          }
        }
      });

      if (domArray.length) {
        domArray.sort((a, b) => Math.abs(a.top) - Math.abs(b.top));
        const { label } = domArray[0];
        const index = list.findIndex((item) => item.id === label.id);
        const el = document.getElementById(label.id);
        const top = getElementPagePosition(el).y;
        // if (top >= 300)
        handleSelect(list[index]);
      }
    }

    window.addEventListener('scroll', throttle(initAnchor, 200, {}));
    window.addEventListener('touchmove', initAnchor);
    window.addEventListener('load', initAnchor);
    return () => {
      window.removeEventListener('scroll', throttle(initAnchor, 200, {}));
      window.removeEventListener('touchmove', initAnchor);
      window.removeEventListener('load', initAnchor);
    };
  }, [handleSelect, isMobile, list]);

  return (
    <div className={less.wrapper} ref={mainRef}>
      <div className={less.main}>
        <div className={less.mainCategory}>
          <I18n>Content</I18n>
        </div>
        <div className={less.mainBody}>
          <div className={less.mainBodyItems}>
            {list.map((item, index) => (
              <span
                className={`${less.mainBodyItemsEach} ${current?.id === item?.id ? less.mainBodyItemsEachOn : ''}`}
                key={index}
                onClick={() => {
                  window.location.hash = item.id;
                  const el = document.getElementById(item.id);
                  window.scrollTo({ top: getElementPagePosition(el).y - 5 });
                  handleSelect(item);
                  handleCloseMenu();
                }}
              >
                <I18n>{item.title}</I18n>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Menu;
