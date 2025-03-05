import {PopupPosition} from '@@Xcomponents/XPopup/types';

import { reaxel_i18n } from '@@reaxels';
import { XPopup } from '@@Xcomponents';

import less from './index.module.less';

interface ISelectPopup {
  title: string;
  list?:
    | {
        title: string;
      }[]
    | string[];
  position?: PopupPosition;
  children?: React.ReactNode;
  onChange?: (value: string) => void;
}

export default reaxper(({ title, list, position = 'bottom center' as const, children, onChange }: ISelectPopup) => {
  const { changeLang } = reaxel_i18n();

  const popupRef = useRef(null);

  const handleClick = useCallback(
    (type: string, title: string) => {
      onChange(title);
      changeLang(type === 'en' ? 'en' : 'zh-CN');
      popupRef?.current && popupRef?.current?.close();
    },
    [changeLang, onChange]
  );

  return (
    <div>
      <XPopup
        ref={popupRef}
        trigger={<div className={less.title}>{title}</div>}
        arrow={false}
        closeOnEscape={true}
        position={position}
        offsetY={20}
        on={['click']}
      >
        {children ? (
          children
        ) : (
          <div className={less.main}>
            {list.map((each, idx) => {
              return (
                <div className={less.item} key={idx}>
                  {each?.url ? (
                    <a href={each.url} className={less.itemTitle}>
                      {each.title || each}
                    </a>
                  ) : (
                    <span
                      onClick={() => {
                        handleClick(each.type, each.title);
                      }}
                      className={less.itemTitle}
                    >
                      {each.title || each}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </XPopup>
    </div>
  );
});
