import { XScrollReveal } from '@@Xcomponents';
import { Reaxper } from 'reaxes';
import mediumZoom from 'medium-zoom';

import { I18n } from '@@reaxels/i18n';
import { request_send_email } from '@@requests';

import video from '@@public/imgs/heroVideo.mp4';
import roadmap from '@@public/imgs/roadmap.png';
import flow1 from '@@public/imgs/paperImg1.png';
import flow2 from '@@public/imgs/paperImg5.png';

import ProgressBar from '@@pages/Homepage/components/progressBar';

import Header from './components/header';
import Footer from './components/footer';

import less from './index.module.less';

function shareToTwitter(url, title = '', w = 600, h = 400) {
  return window.open(
    `https://twitter.com/share?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    `_blank`,
    `width=600, height=450, toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, top=100,left=350`
  );
}

// shareToTwitter('https://www.daotion.io', 'got my first SBT!');

const Homepage: React.FC = Reaxper(() => {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const scrollRef3 = useRef(null);
  const scrollRef4 = useRef(null);

  const [showHeaderBackground, setHeaderBackground] = useState(false); // header背景展示状态
  const [showMenu, setShowMenu] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [email, setEmail] = useState('');
  const [inputStatus, setInputStatus] = useState('');
  const [isMobile, setMobile] = useState(false);

  const handleCloseMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  const handleEnterApp = useCallback(() => {
    window.open(`${window.location.origin}/soon`);
  }, []);

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

  const handleViewDemo = useCallback(() => {
    window.open('https://demo.daotion.io/');
  }, []);

  useLayoutEffect(() => {
    function onResize() {
      setMobile(window.innerWidth <= 799);
    }
    onResize();

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // 当滚动距离大于100px时显示header
  useEffect(() => {
    function shouldHideHeader() {
      const val = document.documentElement.scrollTop;
      const innerW = window.innerWidth;

      // 针对小屏幕做适配
      if (val >= 100 || (innerW <= 1440 && val >= 64)) {
        setHeaderBackground(true);
      } else {
        setHeaderBackground(false);
      }
    }

    function play() {
      setPlayVideo(true);
    }

    window.setTimeout(play, 2000);

    document.addEventListener('scroll', shouldHideHeader);
    document.addEventListener('load', shouldHideHeader);

    return () => {
      document.removeEventListener('scroll', shouldHideHeader);
      document.removeEventListener('load', shouldHideHeader);
    };
  }, []);

  useEffect(() => {
    // @ts-ignore
    mediumZoom(document.querySelector('#medium-zoom-flow1'), {
      background: '#000',
      margin: 64,
    });
    // @ts-ignore
    mediumZoom(document.querySelector('#medium-zoom-flow2'), {
      background: '#000',
      margin: 64,
    });
  }, []);

  return (
    <section className={less.page}>
      <Header
        handleCloseMenu={handleCloseMenu}
        isMobile={isMobile}
        showBg={showHeaderBackground}
        handleToggleMenu={handleToggleMenu}
        showMenu={showMenu}
      />
      <main className={less.main}>
        {!isMobile && (
          <div className={less.videoMask}>
            {playVideo && <video id="myVideo" src={video} preload="preload" muted loop autoPlay />}
          </div>
        )}

        <div className={less.sectionOne}>
          <XScrollReveal
            config={{
              delay: 300,
            }}
          >
            <div className={less.sectionOneTitle}>
              <I18n>Stakeholder Relationship Management (SRM) Protocol</I18n>
            </div>
          </XScrollReveal>
          <XScrollReveal
            config={{
              delay: 500,
            }}
          >
            <div className={less.sectionOneSlogan}>
              <div>
                <I18n>For Stakeholders,</I18n>
              </div>
              <div>
                <I18n>By Stakeholders</I18n>
              </div>
            </div>
          </XScrollReveal>

          <XScrollReveal
            config={{
              delay: 1000,
            }}
          >
            <div className={less.sectionOneMission}>
              <I18n>Daotion helps DAOs to track members’ events for growing</I18n>
            </div>
            <div className={less.sectionOneMission2}>
              <I18n>community with data-driven via SoulBound Tokens.</I18n>
            </div>
          </XScrollReveal>
          <XScrollReveal
            config={{
              delay: 1500,
            }}
          >
            <div className={less.sectionOneBtnWrap}>
              <div className={less.sectionOneEnter} onClick={handleEnterApp}>
                <div className={less.sectionOneEnterWrap} />
                <span>
                  <I18n>Enter App</I18n>
                </span>
              </div>

              <div className={less.sectionOneDemo} onClick={handleViewDemo}>
                <I18n>Try Demo</I18n>
              </div>
            </div>
          </XScrollReveal>
        </div>
        <section className={less.sectionTwo}>
          <div className={less.sectionTwoTop}>
            <XScrollReveal
              config={{
                delay: 300,
              }}
              style={{
                width: '100%',
              }}
            >
              <div className={less.sectionTwoTopTitle}>
                <I18n>What is Daotion</I18n>
              </div>
            </XScrollReveal>
            <XScrollReveal
              config={{
                delay: 600,
              }}
            >
              <div className={less.sectionTwoTopText}>
                <span>
                  Daotion is the community-run{' '}
                  <span className={less.sectionThreeTopHighlight}>
                    <I18n>stakeholder relationship management (SRM) protocol</I18n>
                  </span>
                  , which supplies SRM system for DAOs and Stakeholders in community member’s global collaborative
                  governance, keeping growth and activity of the organization, crypto-native data resource to improving
                  efficiency. Our core values make community consensus maximun for DAOs by Stakeholders, help to
                  building a stronger community with members.
                </span>
              </div>
            </XScrollReveal>
          </div>
          <div className={less.sectionTwoBottomWrapper}>
            <XScrollReveal
              config={{
                delay: 900,
              }}
            >
              <div className={less.sectionTwoBottom}>
                <div className={less.sectionTwoBottomText}>
                  <div>
                    <I18n>Salesforce taked the lead in CRM of the last two decades</I18n>
                  </div>
                  <div>
                    <I18n>Daotion taking the lead in SRM of the next two decades</I18n>
                  </div>
                </div>
                <div className={less.sectionTwoBottomImg} />
              </div>
            </XScrollReveal>
          </div>
        </section>
        <section className={less.sectionThreeFourWrapper}>
          <div className={less.sectionThree}>
            <XScrollReveal
              config={{
                delay: 300,
              }}
              style={{
                width: '100%',
              }}
            >
              <div className={less.sectionThreeTitle}>
                <I18n>What is SRM</I18n>
              </div>
            </XScrollReveal>
            <XScrollReveal
              config={{
                delay: 600,
              }}
            >
              <div className={less.sectionThreeTop}>
                <span className={less.sectionThreeTopHighlight}>
                  <I18n>Stakeholder relationship management (SRM)</I18n>{' '}
                </span>
                <I18n>
                  is a management protocol for the interaction relationship process between DAO and potential and
                  existing members. Through the historical accumulation and analysis of member data, SRM can dynamically
                  manage the relationship between DAO and members, maximize the business growth of DAO and improve the
                  retention of members, and maintain a high degree of consensus in the community.
                </I18n>
              </div>
            </XScrollReveal>

            <XScrollReveal
              config={{
                delay: 900,
              }}
              style={{
                width: '100%',
              }}
            >
              <div className={less.sectionThreeBottom} ref={scrollRef1}>
                <div className={`${less.sectionThreeBottomCard} ${less.sectionThreeBottomFirst}`}>
                  <div className={less.sectionThreeBottomCardTitle}>SBT Pad</div>
                  <div className={less.sectionThreeBottomCardMid}>[Event Tracking]</div>
                  <div className={less.sectionThreeBottomCardSubtitle}>
                    <I18n>
                      Structuring data points for tracking soul's key behavior by SBTs' initial, issuing and management.
                    </I18n>
                  </div>
                  <div className={`${less.sectionThreeBottomFirstImg} ${less.sectionThreeBottomCardImg}`} />
                </div>
                <div className={`${less.sectionThreeBottomCard} ${less.sectionThreeBottomSecond}`}>
                  <div className={less.sectionThreeBottomCardTitle}>SBT Fusion</div>
                  <div className={less.sectionThreeBottomCardMid}>[Attribution Insight]</div>
                  <div className={less.sectionThreeBottomCardSubtitle}>
                    <I18n>
                      Using A/B Testing methods to filter the best metrics by deploying strategies for maximum ROI.
                    </I18n>
                  </div>
                  <div className={`${less.sectionThreeBottomSecondImg} ${less.sectionThreeBottomCardImg}`} />
                </div>
                <div className={`${less.sectionThreeBottomCard} ${less.sectionThreeBottomThird}`}>
                  <div className={less.sectionThreeBottomCardTitle}>SBT DataHub</div>
                  <div className={less.sectionThreeBottomCardMid}>[Data Driven]</div>
                  <div className={less.sectionThreeBottomCardSubtitle}>
                    <I18n>
                      Getting the most valuable attribution data for accelerate growth and interaction by data analysis.
                    </I18n>
                  </div>
                  <div className={`${less.sectionThreeBottomThirdImg} ${less.sectionThreeBottomCardImg}`} />
                </div>
              </div>
              {isMobile && <ProgressBar scrollEl={scrollRef1?.current} />}
            </XScrollReveal>
          </div>

          <section className={less.sectionFourWrapper}>
            <div className={less.sectionFour}>
              <XScrollReveal
                config={{
                  delay: 300,
                }}
              >
                <div className={less.sectionFourTitle}>
                  <I18n>What does SRM do?</I18n>
                </div>
              </XScrollReveal>
              <XScrollReveal
                config={{
                  delay: 600,
                }}
              >
                <div className={less.sectionFourMain} ref={scrollRef2}>
                  <div className={less.sectionFourMainCard}>
                    <div className={`${less.sectionFourMainCardImg} ${less.sectionFourMainCardImgOne}`} />
                    <div className={less.sectionFourMainCardTitle}>
                      <I18n>Interaction</I18n>
                    </div>
                    <div className={less.sectionFourMainCardSubtitle}>
                      <I18n>
                        Becoming a relational affair center for the DAO, from which community members can request,
                        process, and return affairs.
                      </I18n>
                    </div>
                  </div>
                  <div className={less.sectionFourMainCard}>
                    <div className={`${less.sectionFourMainCardImg} ${less.sectionFourMainCardImgThree}`} />
                    <div className={less.sectionFourMainCardTitle}>
                      <I18n>Data Point</I18n>
                    </div>
                    <div className={less.sectionFourMainCardSubtitle}>
                      <I18n>
                        The reputation data points of DAO members are recorded based on the issuance of SBTs, including
                        role identity, on-chain/off-chain data collection in an orderly manner.
                      </I18n>
                    </div>
                  </div>
                  <div className={less.sectionFourMainCard}>
                    <div className={`${less.sectionFourMainCardImg} ${less.sectionFourMainCardImgTwo}`} />
                    <div className={less.sectionFourMainCardTitle}>
                      <I18n>Status Chain</I18n>
                    </div>
                    <div className={less.sectionFourMainCardSubtitle}>
                      <I18n>
                        Through the synthesis of SBTs to realize the interaction process between DAO and members to find
                        the interaction growth level of the longest chain.
                      </I18n>
                    </div>
                  </div>
                  <div className={less.sectionFourMainCard}>
                    <div className={`${less.sectionFourMainCardImg} ${less.sectionFourMainCardImgFour}`} />
                    <div className={less.sectionFourMainCardTitle}>
                      <I18n>Auto Governance</I18n>
                    </div>
                    <div className={less.sectionFourMainCardSubtitle}>
                      <I18n>
                        By simplifying repetitive tasks and processing transactions automatically, DAOs can focus on
                        developing their own unique relationship governance strategies.
                      </I18n>
                    </div>
                  </div>
                </div>
                {isMobile && <ProgressBar scrollEl={scrollRef2?.current} />}
              </XScrollReveal>
            </div>
          </section>
        </section>

        <section className={less.sectionFive}>
          <XScrollReveal
            config={{
              delay: 300,
            }}
          >
            <div className={less.sectionFiveTitle}>
              <I18n>Why SRM matters?</I18n>
            </div>
          </XScrollReveal>
          <XScrollReveal
            config={{
              delay: 600,
            }}
          >
            <div className={less.sectionFiveMain} ref={scrollRef3}>
              <section className={`${less.sectionFiveMainCard} ${less.sectionFiveMainPart1}`}>
                <div className={`${less.sectionFiveMainCardImg} ${less.sectionFiveMainCardImgOne}`} />
                <div className={less.sectionFiveMainCardRight}>
                  <div className={less.sectionFiveMainCardTitle}>
                    <I18n>Growth</I18n>
                  </div>
                  <span className={less.sectionFiveMainCardDesc}>
                    <I18n>
                      You'll find more potential members, reach more transactions, retain more members to grow your
                      business.
                    </I18n>
                  </span>
                </div>
              </section>
              <section className={`${less.sectionFiveMainCard} ${less.sectionFiveMainPart2}`}>
                <div className={`${less.sectionFiveMainCardImg} ${less.sectionFiveMainCardImgTwo}`} />
                <div className={less.sectionFiveMainCardRight}>
                  <div className={less.sectionFiveMainCardTitle}>
                    <I18n>DeData</I18n>
                  </div>
                  <span className={less.sectionFiveMainCardDesc}>
                    <I18n>
                      Driving the growth hackers of DAOs with decentralized data interactive analytical mining to make
                      the decisions of organization more scientific and transparent.
                    </I18n>
                  </span>
                </div>
              </section>
              <section className={`${less.sectionFiveMainCard} ${less.sectionFiveMainPart3}`}>
                <div className={`${less.sectionFiveMainCardImg} ${less.sectionFiveMainCardImgThree}`} />
                <div className={less.sectionFiveMainCardRight}>
                  <div className={less.sectionFiveMainCardTitle}>
                    <I18n>Native</I18n>
                  </div>
                  <span className={less.sectionFiveMainCardDesc}>
                    <I18n>
                      Using the features of smart contracts in blockchain to reform the automated workflows is a native
                      relationship management tool for DAOs.
                    </I18n>
                  </span>
                </div>
              </section>
              <section className={`${less.sectionFiveMainCard} ${less.sectionFiveMainPart4}`}>
                <div className={`${less.sectionFiveMainCardImg} ${less.sectionFiveMainCardImgFour}`} />
                <div className={less.sectionFiveMainCardRight}>
                  <div className={less.sectionFiveMainCardTitle}>
                    <I18n>Individual</I18n>
                  </div>
                  <span className={less.sectionFiveMainCardDesc}>
                    <I18n>
                      Storing the information of all customer interaction process on the blockchain, the data is
                      personal, relevant and up to date.
                    </I18n>
                  </span>
                </div>
              </section>
            </div>
            {isMobile && <ProgressBar scrollEl={scrollRef3?.current} />}
          </XScrollReveal>
        </section>
        <section className={less.sectionSixWrapper}>
          <div className={less.sectionSix}>
            <XScrollReveal
              config={{
                delay: 300,
              }}
            >
              <div className={less.sectionSixTitle}>
                <I18n>How Daotion can help you building a great DAO</I18n>
              </div>
            </XScrollReveal>
            <XScrollReveal
              config={{
                delay: 600,
              }}
              style={{
                width: '100%',
              }}
            >
              <div className={less.sectionSixImgWrapper}>
                <img id="medium-zoom-flow1" src={flow1} className={less.sectionSixImg} alt="flow" />
                <img id="medium-zoom-flow2" src={flow2} className={less.sectionSixImg} alt="flow" />
              </div>
            </XScrollReveal>
          </div>
        </section>
        <section className={less.sectionSevenWrapper}>
          <div className={less.sectionSeven}>
            <XScrollReveal
              config={{
                delay: 300,
              }}
              style={{
                width: '100%',
              }}
            >
              <div className={less.sectionSevenTitle}>
                <I18n>Roadmap</I18n>
              </div>
            </XScrollReveal>
            <XScrollReveal
              config={{
                delay: 600,
              }}
              style={{
                width: '100%',
              }}
            >
              <div ref={scrollRef4} className={less.sectionSevenImgWrapper}>
                <img id="roadmap" src={roadmap} className={less.sectionSevenImg} alt="roadmap" />
                <div />
              </div>
              {isMobile && <ProgressBar scrollEl={scrollRef4?.current} />}
            </XScrollReveal>
          </div>
        </section>
        <section className={less.sectionEightWrapper}>
          <div className={less.sectionEight}>
            <div className={less.sectionEightLeft}>
              <I18n>Join us now!</I18n>
            </div>
            <div className={less.sectionEightRight}>
              <div className={less.sectionEightRightTitle}>
                <I18n>Get involved</I18n>
              </div>
              <div className={less.sectionEightRightSubtitle}>
                <I18n>We are building a decentralized community.</I18n>
              </div>

              <div className={less.sectionEightRightIcons}>
                <a
                  href="https://twitter.com/DaotionSRM"
                  target="_blank"
                  className={less.sectionEightRightItem}
                  rel="noreferrer"
                >
                  <span className={less.sectionEightRightItemTwitter} />
                  Twitter
                </a>
                <a
                  href="https://discord.gg/yRgpapfYrR"
                  target="_blank"
                  className={less.sectionEightRightItem}
                  rel="noreferrer"
                >
                  <span className={less.sectionEightRightItemDiscord} />
                  Discord
                </a>
                <a href="/soon" target="_blank" className={less.sectionEightRightItem}>
                  <span className={less.sectionEightRightItemGithub} />
                  Github
                </a>
              </div>

              <div className={less.sectionEightRightSubscribe}>
                <div className={less.sectionEightRightSubscribeTip}>
                  {inputStatus && (
                    <div
                      className={
                        inputStatus === 'Success'
                          ? less.sectionEightRightSubscribeTipSuccess
                          : less.sectionEightRightSubscribeTipError
                      }
                    >
                      {inputStatus}
                    </div>
                  )}
                </div>
                <div className={less.sectionEightRightSubscribeInput}>
                  <input
                    id="email"
                    autoComplete="off"
                    placeholder="Your Email"
                    onChange={handleChangeEmail}
                    onKeyUp={handleKeyup}
                  />
                  <span onClick={handleSendEmail}>Subscribe</span>
                </div>
                <a href="mailto:hello@daotion.io" className={less.sectionEightRightSubscribeContact}>
                  <I18n>Contact</I18n> : hello@daotion.io
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </section>
  );
});

export default Homepage;
