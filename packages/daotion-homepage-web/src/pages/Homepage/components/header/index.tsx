import { Reaxper } from 'reaxes';

import { XButton } from '@@Xcomponents';
import SelectPopup from '@@pages/Homepage/components/selectPopup';

import { LANGUAGE_LIST } from '@@pages/Homepage/const';
import { I18n, reaxel_i18n } from '@@reaxels/i18n';

import less from './index.module.less';

const Header = Reaxper(({ isMobile, showBg, showMenu, handleToggleMenu, handleCloseMenu }) => {
  const { language } = reaxel_i18n();

  const menuRef = useRef(null);

  const [lang, setLang] = useState('English');
  const [showCommunity, setShowCommunity] = useState(false);

  const handleEnterApp = useCallback(() => {
    window.open(`${window.location.origin}/soon`);
  }, []);

  const handleViewDemo = useCallback(() => {
    window.open('https://demo.daotion.io/');
  }, []);

  const handleClickLogo = useCallback(() => {
    window.location.pathname = '/';
  }, []);

  const handleChangeLang = useCallback((type) => {
    setLang(type);
  }, []);

  const handleToggleCommunity = useCallback(() => {
    setShowCommunity((prev) => !prev);
  }, []);

  const handleScrollToMail = useCallback(() => {
    handleCloseMenu && handleCloseMenu();
    if (document.documentElement.scrollHeight === document.documentElement.scrollTop) {
      return;
    }
    window.scrollTo({ top: 9999, behavior: 'smooth' });
  }, [handleCloseMenu]);

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

  const memoIconStyle = useMemo(() => {
    return {
      display: 'inlineBlock',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
    };
  }, []);

  const memoBgStyle = useMemo(() => {
    return {
      backgroundColor: showBg ? 'rgba(0, 0, 0, 0.7)' : 'transparent',
      backdropFilter: showBg ? 'saturate(1.8) blur(20px)' : 'none',
      WebkitBackdropFilter: showBg ? 'saturate(1.8) blur(20px)' : 'none',
    };
  }, [showBg]);

  return (
    <header ref={menuRef} className={`${less.main} ${showMenu ? less.mainOn : ''}`} style={memoBgStyle}>
      <div className={`${less.mainLeft} ${showMenu && isMobile ? less.mainLeftOn : ''}`}>
        <a href="/paper" target="_blank" rel="noreferrer" onClick={handleCloseMenu}>
          <I18n>Paper</I18n>
        </a>
        {isMobile && (
          <div
            className={`${less.mainLeftCommunity} ${showCommunity ? less.mainLeftCommunityOn : ''}`}
            onClick={handleToggleCommunity}
          >
            <span className={less.mainLeftCommunityTitle}>
              <I18n>Community</I18n>
            </span>
            {showCommunity && (
              <div className={less.mainLeftCommunityItems}>
                <div className={less.item}>
                  <div className={less.itemIconTwitter} style={memoIconStyle} />
                  <a
                    target="_blank"
                    href="https://twitter.com/DaotionSRM"
                    className={less.itemTitle}
                    rel="noreferrer"
                    onClick={handleCloseMenu}
                  >
                    Twitter
                  </a>
                </div>

                <div className={less.item}>
                  <div className={less.itemIconDiscord} style={memoIconStyle} />
                  <a
                    target="_blank"
                    href="https://discord.gg/yRgpapfYrR"
                    className={less.itemTitle}
                    rel="noreferrer"
                    onClick={handleCloseMenu}
                  >
                    Discord
                  </a>
                </div>

                <div className={less.item}>
                  <div className={less.itemIconGithub} style={memoIconStyle} />
                  <a target="_blank" href="/soon" className={less.itemTitle} rel="noreferrer" onClick={handleCloseMenu}>
                    Github
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
        {!isMobile && (
          <SelectPopup title={i18n('Community')}>
            <div className={less.popup}>
              <div className={less.item}>
                <div className={less.itemIconTwitter} style={memoIconStyle} />
                <a target="_blank" href="https://twitter.com/DaotionSRM" className={less.itemTitle} rel="noreferrer">
                  Twitter
                </a>
              </div>

              <div className={less.item}>
                <div className={less.itemIconDiscord} style={memoIconStyle} />
                <a target="_blank" href="https://discord.gg/yRgpapfYrR" className={less.itemTitle} rel="noreferrer">
                  Discord
                </a>
              </div>

              <div className={less.item}>
                <div className={less.itemIconGithub} style={memoIconStyle} />
                <a target="_blank" href="/soon" className={less.itemTitle} rel="noreferrer">
                  Github
                </a>
              </div>
            </div>
          </SelectPopup>
        )}
        <a href="/soon" target="_blank" rel="noreferrer" onClick={handleCloseMenu}>
          <I18n>Builder</I18n>
        </a>
        <a href="/soon" target="_blank" rel="noreferrer" onClick={handleCloseMenu}>
          <I18n>Docs</I18n>
        </a>
        <span onClick={handleScrollToMail}>
          <I18n>Contact</I18n>
        </span>
      </div>
      <div className={less.mainMiddle} onClick={handleClickLogo}>
        <div className={`${less.mainMiddleLogo} ${!isMobile && showBg ? less.mainMiddleLogoAnimate : ''}`} />
        <div className={`${less.mainMiddleTitle} ${!isMobile && showBg ? less.mainMiddleTitleAnimate : ''}`} />
      </div>
      <div className={less.mainRight}>
        {/*<SelectPopup title={lang} list={LANGUAGE_LIST} onChange={handleChangeLang} />*/}
        <div className={less.mainRightDemoBtn} onClick={handleViewDemo}>
          <I18n>Try Demo</I18n>
        </div>
        <XButton onClick={handleEnterApp}>
          <I18n>Enter App</I18n>
        </XButton>
      </div>
      <div className={less.mainMenuWrap} onClick={handleToggleMenu}>
        <div className={`${less.mainMenu} ${showMenu ? less.mainMenuOn : ''}`}>
          <span />
        </div>
      </div>
    </header>
  );
});

export default Header;
