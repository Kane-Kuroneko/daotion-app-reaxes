import { Reaxper } from 'reaxes';

import { I18n } from '@@reaxels/i18n';

import Header from '@@pages/Homepage/components/header';
import Footer from '@@pages/Homepage/components/footer';

import less from './index.module.less';

const getMode = () => {
  return window.innerWidth <= 799;
};

const NotFound = Reaxper(() => {
  const [isMobile, setMobile] = useState(getMode());
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  const handleContact = useCallback(() => {
    window.location.pathname = '/';
  }, []);

  const handleGoHome = useCallback(() => {
    window.location.pathname = '/';
  }, []);

  const handleCloseMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  useEffect(() => {
    function detectMobile() {
      setMobile(getMode());
    }

    window.addEventListener('resize', detectMobile);
    window.addEventListener('DOMContentLoaded', detectMobile);

    return () => {
      window.removeEventListener('resize', detectMobile);
      window.removeEventListener('DOMContentLoaded', detectMobile);
    };
  }, []);

  return (
    <div className={less.page}>
      <Header
        handleCloseMenu={handleCloseMenu}
        isMobile={isMobile}
        showBg={false}
        showMenu={showMenu}
        handleToggleMenu={handleToggleMenu}
      />
      <main className={less.pageMain}>
        <div className={less.pageMainTitle}>404</div>
        <div className={less.pageMainDesc}>
          <I18n>We can't find the page that you're looking for</I18n>
        </div>
        <div className={less.pageMainBtns}>
          <div className={less.pageMainBtnsHome}>
            <div className={less.pageMainBtnsHomeWrap} onClick={handleGoHome} />
            <span>
              <I18n>Take me home</I18n>
            </span>
          </div>
          <div className={less.pageMainBtnsContact} onClick={handleContact}>
            <I18n>Contact us</I18n>
          </div>
        </div>
      </main>
      <div className={less.pageFooter}>{!isMobile && <Footer />}</div>
    </div>
  );
});

export default NotFound;
