import { I18n } from '@@reaxels/i18n';
import { request_send_email } from '@@requests';
import { Reaxper } from 'reaxes';

import Header from '@@pages/Homepage/components/header';

import less from './index.module.less';

const getMode = () => {
  return window.innerWidth <= 799;
};

const ComingSoon = Reaxper(() => {
  const [email, setEmail] = useState('');
  const [isMobile, setMobile] = useState(getMode());
  const [showMenu, setShowMenu] = useState(false);
  const [inputStatus, setInputStatus] = useState('');

  const handleToggleMenu = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  const handleSendEmail = useCallback(() => {
    const pattern = '^([0-9a-zA-Z]([-\\.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$';
    if (!email || !email.length || !email.match(pattern)) {
      setInputStatus('Please enter a valid email address');
      return;
    }

    request_send_email({
      email,
    })
      .then(() => {
        setInputStatus('Success');
      })
      .catch((e) => {
        console.error(e);
        setInputStatus('Unknown error');
      });
  }, [email]);

  const handleChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
  }, []);

  const handleKeyup = useCallback(
    (e) => {
      if (e.code === 'Enter') {
        handleSendEmail();
      }
    },
    [handleSendEmail]
  );

  const handleClickLogo = useCallback(() => {
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
      {isMobile ? (
        <Header
          handleCloseMenu={handleCloseMenu}
          isMobile={isMobile}
          showBg={false}
          showMenu={showMenu}
          handleToggleMenu={handleToggleMenu}
        />
      ) : (
        <header className={less.pageHeader} onClick={handleClickLogo}>
          <div className={less.pageHeaderLogo} />
          <div className={less.pageHeaderTitle} />
        </header>
      )}

      <main className={less.pageMain}>
        <div className={less.pageMainTitle}>Coming Soon</div>
        <div className={less.pageMainDesc}>Subscribe our newsletter to get update when it’ll be live.</div>
        <div className={less.pageMainInput}>
          {inputStatus && (
            <div className={inputStatus === 'Success' ? less.pageMainInputTipSuccess : less.pageMainInputTipError}>
              {inputStatus}
            </div>
          )}
          <input
            type="text"
            id="email"
            autoFocus
            autoComplete="off"
            placeholder="Your Email"
            onChange={handleChangeEmail}
            onKeyUp={handleKeyup}
          />
          <span onClick={handleSendEmail}>Subscribe</span>
        </div>
        {!isMobile && (
          <div className={less.pageMainIcons}>
            <a href="https://twitter.com/DaotionSRM" target="_blank" className={less.pageMainItem} rel="noreferrer">
              <span className={less.pageMainItemTwitter} />
              Twitter
            </a>
            <a href="https://discord.gg/yRgpapfYrR" target="_blank" className={less.pageMainItem} rel="noreferrer">
              <span className={less.pageMainItemDiscord} />
              Discord
            </a>
            <a href="/soon" target="_blank" className={less.pageMainItem}>
              <span className={less.pageMainItemGithub} />
              Github
            </a>
          </div>
        )}
      </main>
      <footer className={less.pageFooter}>
        {!isMobile && (
          <span className={less.pageFooterMenu}>
            <>
              <a href="/paper" target="_blank">
                <I18n>Paper</I18n>
              </a>
              <a href="/soon" target="_blank">
                <I18n>Builder</I18n>
              </a>
              <a href="/soon" target="_blank">
                <I18n>Docs</I18n>
              </a>
            </>
          </span>
        )}
        {isMobile && (
          <nav className={`${less.pageMedia} ${showMenu ? less.pageMediaOn : ''}`}>
            <a href="https://twitter.com/DaotionSRM" target="_blank" className={less.pageMediaItem} rel="noreferrer">
              <span className={less.pageMediaItemTwitter} />
            </a>
            <a href="https://discord.gg/yRgpapfYrR" target="_blank" className={less.pageMediaItem} rel="noreferrer">
              <span className={less.pageMediaItemDiscord} />
            </a>
            <a href="/soon" target="_blank" className={less.pageMediaItem}>
              <span className={less.pageMediaItemGithub} />
            </a>
          </nav>
        )}
        <a href="mailto:hello@daotion.io" className={less.pageFooterContact}>
          Contact : hello@daotion.io
        </a>
      </footer>
    </div>
  );
});

export default ComingSoon;
