import { Reaxper } from 'reaxes';

import { I18n } from '@@reaxels/i18n';

import less from './index.module.less';

const Footer: React.FC = Reaxper(() => {
  const handleClickLogo = useCallback(() => {
    window.location.pathname = '/';
  }, []);

  return (
    <footer className={less.main}>
      <div className={less.mainWrapper}>
        <div className={less.mainTop}>
          <div className={less.mainTopLogo} onClick={handleClickLogo}>
            <div className={less.mainTopLogoPic} />
            <div className={less.mainTopLogoTitle} />
          </div>
        </div>

        <div className={less.mainMiddle}>
          <div className={less.mainMiddleSlogan}>For Stakeholders, By Stakeholders</div>
          <div className={less.mainMiddleMenu}>
            <a href="#email">
              <I18n>Contact</I18n>
            </a>
            <a href="/soon" target="_blank">
              <I18n>Feature</I18n>
            </a>
            <a href="/soon" target="_blank">
              <I18n>Builder</I18n>
            </a>
          </div>
        </div>

        <div className={less.mainBottom}>
          <div className={less.mainBottomLeft}>Daotion © 2022 All rights reserved</div>
          <div className={less.mainBottomRight}>
            <a>
              <I18n>Terms & Privacy Policy</I18n>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default React.memo(Footer);
