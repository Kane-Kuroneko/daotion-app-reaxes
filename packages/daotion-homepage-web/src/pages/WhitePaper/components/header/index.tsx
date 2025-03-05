import { Reaxper } from 'reaxes';

import { I18n, reaxel_i18n } from '@@reaxels/i18n';

import SelectPopup from '@@pages/Homepage/components/selectPopup';

import Menu, { ListItem } from '@@pages/WhitePaper/components/menu';

import { list } from '@@pages/WhitePaper';

import less from './index.module.less';

export const LANGUAGE_LIST = [
  { title: 'English', type: 'en' },
  { title: '简体中文', type: 'zh-CN' },
];

const Header = Reaxper(({ isMobile, showBg, showMenu, handleToggleMenu, handleCloseMenu }) => {
  const { language } = reaxel_i18n();

  const menuRef = useRef(null);

  const [current, setCurrent] = useState(list[0]); // 当前选中的menu
  const [lang, setLang] = useState('English');

  const handleSelect = useCallback((item: ListItem) => {
    setCurrent(item);
  }, []);

  const handleClickLogo = useCallback(() => {
    window.location.href = 'https://www.daotion.io';
  }, []);

  const handleChangeLang = useCallback((type) => {
    setLang(type);
  }, []);

  useEffect(() => {
    if (!language) return;

    LANGUAGE_LIST.forEach((each) => {
      if (each.type === language) {
        setLang(each.title);
      }
    });
  }, [lang, language]);

  // 打开menu时禁止滚动
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showMenu]);

  const memoBgStyle = useMemo(() => {
    return {
      backgroundColor: showBg ? 'rgba(0, 0, 0, 0.7)' : 'transparent',
      backdropFilter: showBg ? 'saturate(1.8) blur(20px)' : 'none',
    };
  }, [showBg]);

  return (
    <header ref={menuRef} className={`${less.main} ${showMenu ? less.mainOn : ''}`} style={memoBgStyle}>
      <div className={less.mainLeft} onClick={handleClickLogo}>
        <div className={isMobile ? less.mainLeftLogo2 : less.mainLeftLogo} />
      </div>
      {!isMobile && (
        <div className={less.mainRight}>
          <SelectPopup title={lang} list={LANGUAGE_LIST} onChange={handleChangeLang} />
          <div className={less.mainRightBack} onClick={handleClickLogo}>
            <I18n>Back to home</I18n>
          </div>
        </div>
      )}

      {isMobile && (
        <div className={less.mainRightSelectMobile}>
          <SelectPopup title={lang} list={LANGUAGE_LIST} onChange={handleChangeLang} />
        </div>
      )}
      <div className={less.mainMenuWrap}>
        <div className={`${less.mainMenu} ${showMenu ? less.mainMenuOn : ''}`} onClick={handleToggleMenu}>
          <span />
        </div>
      </div>

      {isMobile && showMenu && (
        <Menu
          isMobile={isMobile}
          list={list}
          current={current}
          handleSelect={handleSelect}
          handleCloseMenu={handleCloseMenu}
        />
      )}
      {isMobile && showMenu && (
        <div>
          <div className={less.mainRightBack} onClick={handleClickLogo}>
            <I18n>Back to home</I18n>
          </div>
        </div>
      )}
    </header>
  );
});

export default Header;
