import { Reaxper } from 'reaxes';
import mediumZoom from 'medium-zoom';

import { I18n } from '@@reaxels/i18n';

import Footer from '@@pages/Homepage/components/footer';

import paperImg1 from '@@public/imgs/paperImg1.png';
import paperImg2 from '@@public/imgs/paperImg2.png';
import paperImg3 from '@@public/imgs/paperImg3.png';
import paperImg4 from '@@public/imgs/paperImg4.png';
import paperImg5 from '@@public/imgs/paperImg5.png';
import paperImg6 from '@@public/imgs/paperImg6.png';

import Menu, { ListItem } from '@@pages/WhitePaper/components/menu';

import Anchor from '@@pages/WhitePaper/components/anchor';

import Header from './components/header';

import less from './index.module.less';

export const list = [
  {
    id: 'abstract',
    title: 'Abstract',
  },
  {
    id: 'introduction',
    title: '1. Introduction',
  },
  {
    id: 'stakeholder-relationship-management(SRM)-protocol',
    title: '2. Stakeholder relationship management (SRM) protocol',
  },
  {
    id: 'SBT-pad',
    title: '3. SBT Pad: initial generation, issuance, and management of SBTs',
  },
  {
    id: 'SBT-fusion',
    title: '4. SBT Fusion: synthesis metrics, strategy, and analysis of SBTs',
  },
  {
    id: 'SBT-datahub',
    title: '5. SBT DataHub: data processing center toolkit',
  },
  {
    id: 'protocol-development',
    title: '6. Protocol development',
  },
  {
    id: 'summary',
    title: '7. Summary',
  },
  {
    id: 'reference',
    title: 'Reference',
  },
];

const WhitePaper: React.FC = Reaxper(() => {
  const mainRef = useRef<HTMLDivElement>(null);

  const [isMobile, setMobile] = useState(false);
  const [showHeaderBackground, setHeaderBackground] = useState(false); // header背景展示状态
  const [showMenu, setShowMenu] = useState(false);
  const [current, setCurrent] = useState<ListItem>(list[0]); // 当前选中的menu
  const [currentHash, setCurrentHash] = useState<ListItem>(); // 当前url中的hash

  const handleToggleMenu = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  const changeHash = useCallback((id) => {
    window.location.hash = id;
  }, []);

  const handleCloseMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  const handleSelect = useCallback((item: ListItem) => {
    setCurrent(item);
  }, []);

  const handleSelectByHash = useCallback((item: ListItem) => {
    setCurrentHash(item);
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

  // 处理页面url带hash时，自动选中对应的menu
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const id = hash.replace('#', '');
      const item = list.find((each) => each.id === id);
      handleSelectByHash(item);
    }
    // eslint-disable-next-line
  }, [handleSelectByHash, isMobile, window.location.hash, current]);

  // 当滚动距离大于100px时显示header
  useEffect(() => {
    function shouldHideHeader() {
      const val = document.documentElement.scrollTop;

      if (val >= (isMobile ? 64 : 100)) {
        setHeaderBackground(true);
      } else {
        setHeaderBackground(false);
      }
    }

    document.addEventListener('scroll', shouldHideHeader);
    document.addEventListener('load', shouldHideHeader);

    return () => {
      document.removeEventListener('scroll', shouldHideHeader);
      document.removeEventListener('load', shouldHideHeader);
    };
  }, [isMobile]);

  useEffect(() => {
    const arr = ['#paperImg1', '#paperImg2', '#paperImg3', '#paperImg4', '#paperImg5', '#paperImg6'];
    arr.forEach((each) => {
      // @ts-ignore
      mediumZoom(document.querySelector(each), {
        background: '#000',
        margin: 54,
      });
    });
  }, []);

  // todo 等语言完善后这个需要移除
  useEffect(() => {
    localStorage.clear();

    window.addEventListener('beforeunload', () => {
      localStorage.clear();
    });

    return () => {
      localStorage.clear();
    };
  }, []);

  return (
    <div className={less.page}>
      <Header
        handleCloseMenu={handleCloseMenu}
        isMobile={isMobile}
        showBg={showHeaderBackground}
        handleToggleMenu={handleToggleMenu}
        showMenu={showMenu}
      />
      <main ref={mainRef} className={less.pageMain}>
        {!isMobile && (
          <Menu
            list={list}
            current={current}
            handleSelect={handleSelect}
            target={mainRef}
            handleCloseMenu={handleCloseMenu}
          />
        )}
        <section className={less.pageMainArticle}>
          <h1>
            <I18n>Daotion: an SRM protocol provider for DAO</I18n>
          </h1>
          <Anchor id="abstract" current={currentHash} changeHash={changeHash}>
            <h3 id="abstract">
              <I18n>Abstract</I18n>
            </h3>
          </Anchor>
          <p>
            <I18n>
              A definite protocol encodes the social trust relationship of Web3 by extracting the non-transferable,
              non-financial token attributes of SoulBound Tokens (SBTs), rather than the highly financial token
              attributes such as ERC20 and ERC721. The token is the great innovation of the blockchain, but if it exists
              solely as a financial asset attribute, it will lose other advantages of the token. Here we propose a
              protocol using SBTs synthesis to solve trust coding, which encapsulates the reputation data point of each
              organization participant through the generation of SBTs, the data points either come from the fungible and
              non-fungible tokens or the on-chain contract interaction data of external accounts and the trusted data of
              the off-chain centralized society. The data availability of each data point is determined through smart
              contracts and Hash Algorithm. Second, just like the proof-of-work chain of Bitcoin, a data point chain
              with an inheritance relationship is formed through the synthesis of SBTs to dynamically maintain the
              interactive relationship between social organizations and individuals. The increase of synthesis will
              continuously build a reliable ladder to a decentralized society. Finally, the attribution analysis of
              those SBTs data point chains is not only a variety of morphological evidence of the witnessed data series
              but also a reliable organizational development and governance path of DAOs. The optimal strategy through
              attribution analysis is the development and governance strategy with the highest degree of consensus,
              which is the collection of Web3 souls that decentralized social organizations should look for.
            </I18n>
          </p>
          <Anchor current={currentHash} id="introduction" changeHash={changeHash}>
            <h3 id="introduction" className={less.pageMainAnchor}>
              <I18n>1. Introduction</I18n>
            </h3>
          </Anchor>
          <p>
            <I18n>
              In the 1980s, Gartner Group proposed to develop the theory and practice of customer relationship
              management and was responsible for collecting all the information that customers contacted with the
              company. In 1999, the concept of customer relationship management (CRM) was further proposed, thus the
              concept of CRM appeared in the public's vision formally. Founded in 1999, Salesforce has begun to build
              its cloud CRM platform, which has become a benchmark in this field in the past two decades. From the early
              hard disk software to today's web software platform based on cloud computing, and the coming era of
              decentralized governance protocols, the core purpose of CRM lies in how to better manage the interaction
              process of organizations and individuals. Due to the paradigm shift of production relations in Web3, CRM
              needs to be redefined from a decentralized perspective today, we prefer to use stakeholder relationship
              management (SRM). Under the traditional corporate system, the goal is to maximize the interests of
              shareholders. Although user-centered in the development of the Internet has been started to advocate, the
              logic of the underlying value distribution remains unchanged at the core to maximize the interests of
              shareholders. Decentralized autonomous organizations (DAOs) aim at maximizing the interests of
              stakeholders. Supported by blockchain technology, including interaction, relationship, data, and value,
              the production relationship and value distribution take the smart contract as the technical carrier, which
              is stored in the blockchain trusted network and co-build the foundation of the SRM protocol.
            </I18n>
          </p>
          <p>
            <I18n>
              As everybody knows, the core of Ethereum is the Ethereum virtual machine (EVM), which provides an
              executable standard container for the state transition function of the Ethereum network. The decentralized
              social relationship state transition requires a set of standards similar to EVM. We argue that the
              cornerstone of this standard is Soulbound Tokens (SBTs) jointly proposed by E. Glen Weyl, Puja Ohlhaver,
              and Vitalik Buterin. Ethereum smart contract is like an encrypted "box", which constantly receives
              messages and transactions from external accounts and changes the state of the entire network. We compare
              the SRM protocol to the Ethereum smart contract, constantly creating and synthesizing SBTs, while changing
              the relationship status between the organization and individuals. The SRM protocol can contribute to the
              construction of a decentralized society. DeSoc organizations can not only realize the identity,
              credentials, and attachments of SBTs representatives through the SRM protocol, but more importantly, they
              can manage the birth and growth of these souls in a decentralized manner, and find value growth points in
              line with their organizational characteristics from the data through the analysis of the decentralized
              data generated by the process.
            </I18n>
          </p>
          <Anchor current={currentHash} id="stakeholder-relationship-management(SRM)-protocol" changeHash={changeHash}>
            <h3 className={less.pageMainAnchor} id="stakeholder-relationship-management(SRM)-protocol">
              <I18n>2. Stakeholder relationship management (SRM) protocol</I18n>
            </h3>
          </Anchor>
          <p>
            <I18n>
              Stakeholder relationship management (SRM) is a management protocol for the interaction relationship
              process between DAO and potential and existing members. Through the historical accumulation and analysis
              of member data, SRM can dynamically manage the relationship between DAO and members, maximize the business
              growth of DAO and improve the retention of members, and maintain a high degree of consensus in the
              community.
            </I18n>
          </p>
          <img id="paperImg1" src={paperImg1} alt="paperImg1" />
          <p>
            <I18n>
              Firstly, the basic construction of SRM protocol requires a large amount of input data, including:
            </I18n>
          </p>
          <li>
            <I18n>Information on the purchase, holding, and sale of fungible/non-fungible tokens</I18n>
          </li>
          <li>
            <I18n>Messages and transactions of a function method call from external accounts to contract accounts</I18n>
          </li>
          <li>
            <I18n>Reputation and behavior credentials issued on/off the chain</I18n>
          </li>
          <li>
            <I18n>Information on/off the chain that can represent the user's identity</I18n>
          </li>
          <li>
            <I18n>The trusted data that can contribute SBTs generate</I18n>
          </li>
          <p>
            <I18n>
              The generation process of SBTs is a data cleaning process from unstructured data to structured data, which
              is not only for the basic classification and screening of SBTs but also for the use of data in more
              complex scenarios, such as AI machine learning. We claim that the input of data is very important. SBT
              represents the reputation data point of a user, which looks more like an organization that labels a member
              at different stages, such as when you have admitted the college, the authority will give you a student ID,
              and when you successfully graduate, a diploma is issued accordingly.
            </I18n>
          </p>
          <p>
            <I18n>
              Secondly, different from CRM, SRM demands the establishment and maintenance of the relationship between
              the community and stakeholder members in the form of Web3.0 native DAO. CRM focuses to help traditional
              companies maximize the interests of shareholders from the tripartite game of shareholders, employees, and
              customers, while SRM is to help DAO maximize the interests of stakeholders from the trinity of
              "shareholders", "employees" and "customers". The transformation of this relationship is from one-way
              output centered on the company's market objectives to two-way interaction centered on the DAO governance
              rules.
            </I18n>
          </p>
          <img id="paperImg2" src={paperImg2} alt="paperImg1" />
          <p>
            <I18n>
              The essence of CRM serving traditional company organizations is to conduct centralized hierarchical
              management more efficiently. Senior managers can conduct top-down management through permission settings.
              In particular, sales CRM can help sales supervisors track the sales performance of each sales team and
              each salesperson, and salesperson can also record and analyze the whole process of their customer
              management. Either from the perspective of shareholders, executives, and ordinary employees of the
              company, they all manage the customer status in one direction. The customers do not know what kind of
              status they are in the CRM of the company that serves them, which lies a great deal of information
              asymmetry. It is like when we go shopping, we always worry that the business will make customers pay more
              through information asymmetry. Because the SRM protocol serving DAOs operates on the blockchain network,
              the information is symmetric for all participants, and at least the organization and individuals can reach
              an agreement on the trust level. Now, the SRM protocol is for DAOs to better implement the bottom-up
              management mode. The changes in data points and data states are determined by the signatures of both
              organizations and individuals. All these signature matters and signature records are open, transparent,
              and traceable. With the transformation of paradigm, the logic of the underlying game changes from zero sum
              to positive sum, and the data state changes from one-way unilateral to two-way.
            </I18n>
          </p>
          <p>
            <I18n>
              Finally, it is not enough to imitate the CRM model and it cannot produce positive effects on decentralized
              governance. The design of the SRM protocol should conform to the characteristics of a decentralized
              network and can effectively meet the needs of DAOs in decentralized governance and community growth.
              Therefore, the author proposes a solution named SBT Fusion.
            </I18n>
          </p>
          <img id="paperImg3" src={paperImg3} alt="paperImg3" />
          <p>
            <I18n>
              When we talk about DID, one problem that needs to be considered is that behind an identity is the sum of a
              person's social experience and relationships, such as education, work experience, family, social
              activities, and interpersonal relationships. The application of DID in SRM protocol may be slightly
              limited. We do not seek to build a perfect DID protocol, however, it can effectively meet the needs of
              DAOs in development and governance to achieve one of the many roads to a decentralized society. The SRM
              protocol builds a decentralized identity system of encrypted native communities for DAOs through SBTs,
              instead of representing identity through financial attribute assets such as Token and NFT, or social
              account identity systems provided by Web2 centralized services. SBT Pad, SBT Fusion, SBT Datahub, and
              other modules will be provided to collect, generate and synthesize reputation data points, as well as
              analyze and utilize the data, to form a signed data status chain between the community and members.
            </I18n>
          </p>
          <p>
            <I18n>
              The SRM protocol is based on taking stakeholders as the center, driven by interactive connection, and
              dynamically connects potential community members with existing community members through the collection of
              data points and clues on and off the chain. The interactive information in the whole state chain will be
              recorded in the blockchain network, and then through the aggregation, precipitation, analysis, and
              utilization of data, the community will become more agile, assisting the community governance
              decision-making and business innovation, building the unique data assets of DAOs, and finally promoting
              DAOs to move towards decentralized and intelligent.
            </I18n>
          </p>
          <Anchor id="SBT-pad" current={currentHash} changeHash={changeHash}>
            <h3 id="SBT-pad">
              <I18n>3. SBT Pad: initial generation, issuance, and management of SBTs</I18n>
            </h3>
          </Anchor>
          <p>
            <I18n>
              How to accurately define SBT is the key to the design of the initial generation of SBTs. An SBT is a data
              point or a state point. The source of data can be a data condition or a series of data conditions. Also,
              these data sources are verifiable and can represent all the same information represented by the physical
              voucher.
            </I18n>
          </p>
          <p>
            <I18n>
              The SBT Pad function module provides some basic SBTs template samples, but the issuer can still customize
              some key fields of SBTs and publish them on the chain by the factory contract. The purpose of the template
              is to help issuers to adopt SBTs types that meet their community characteristics more quickly. A set of
              specific protocols are designed for identification type SBTs and quantitative type SBTs, which are
              compatible with ERC721 and ERC1155 standards, to facilitate quick access by third-party wallets and other
              applications.
            </I18n>
          </p>
          <li>
            <I18n>Issuer</I18n>
          </li>
          <p>
            <I18n>
              DAOs make principal declarations on the chain by creating Space main contracts. Space creates SBTs and
              issues SBTs to the holders according to certain data conditions. The issuer can be the DeFi protocol, NFT
              project, infrastructure application, and various DAOs communities.
            </I18n>
          </p>
          <li>
            <I18n>Holder</I18n>
          </li>
          <p>
            <I18n>
              A role or credential that a soul can perform by owning one or more SBTs and being verified from a wallet.
              The SBTs information associated with the holder will be divided into wallet holding status and chain log
              status to meet the needs for rapid verification and in-depth analysis.
            </I18n>
          </p>
          <li>
            <I18n>Verifier</I18n>
          </li>
          <p>
            <I18n>
              The verifier can complete the execution and processing of the data by verifying the contract address,
              quantity, status, and log information of the SBTs bound by the holder. It is a direct and efficient
              verification method to verify whether the holder has a certain type of SBT and query the quantity. The
              validity of the verification data is supported by the blockchain smart contract.
            </I18n>
          </p>
          <li>
            <I18n>Type</I18n>
          </li>
          <p>
            <I18n>
              SBTs can be divided into two categories: identification type and quantitative type. Making a detailed
              distinction according to the different roles and interaction behaviors of the holders. The identification
              type SBTs are mainly used for the identity system, positive and negative reputation certificates, and
              verifiable authority management system of various members of the community. The quantitative type SBTs are
              mainly used for the attribution analysis of marketing data, the proof of community members' contributions,
              and the serialization and cleaning of data.
            </I18n>
          </p>
          <li>
            <I18n>Attribute</I18n>
          </li>
          <p>
            <I18n>
              SBTs can have system standardized attributes such as locking, time limit, priority, and country. It can
              also customize the attributes of issuers and holders on the chain, flexibly expand SBTs ecological
              applications, and represent SBTs metadata, including descriptive off-chain data such as images, token
              descriptions, themes, and specific contents.
            </I18n>
          </p>
          <li>
            <I18n>Revocation</I18n>
          </li>
          <p>
            <I18n>
              The issuer can choose whether to revoke or recover the SBTs held by the soul by controlling the number and
              will make a statement when receiving.
            </I18n>
          </p>
          <li>
            <I18n>Burn</I18n>
          </li>
          <p>
            <I18n>
              If the holder burns SBTs held by controlling the quantity, it will make a statement at the time of
              collection, and signing for collection means consent.
            </I18n>
          </p>
          <li>
            <I18n>Data conditions</I18n>
          </li>
          <p>
            <I18n>
              SBTs are issued through smart contracts in the form of signatures by both the issuer and the holder. The
              issuer signs on the chain by setting the data condition rules of the holder and importing the address list
              of the holder. The holder signs the corresponding SBTs on the chain through the form of receiving. The
              receiving qualification can be set with a white list and a black list.
            </I18n>
          </p>
          <img id="paperImg4" src={paperImg4} alt="paperImg4" />
          <p>
            <I18n>
              SBT pad will provide support for the upgrading of community recovery, zero knowledge certification,
              third-party authorized operation, and other functions when they arrive. Considering that such experimental
              functions are still in the state of imperfect infrastructure and insufficient ecological construction, we
              will gradually develop the demo of such functions for community testing, and maintain a high degree of
              attention. When the time is ripe, we will complete the function online.
            </I18n>
          </p>
          <Anchor id="SBT-fusion" current={currentHash} changeHash={changeHash}>
            <h3 id="SBT-fusion">
              <I18n>4. SBT Fusion: synthesis metrics, strategy, and analysis of SBTs</I18n>
            </h3>
          </Anchor>
          <p>
            <I18n>
              As proof of recording a series of behavior data, SBTs have little utility if they cannot generate
              long-term use value for the issuer and the holder. If SBTs can dynamically and regularly manage the
              relationship between the issuer and the holder, this management process will provide great help in the
              development and governance of DAOs. Next, we will further explain how this relationship state management
              process will have a positive impact to help DAOs achieve data-driven growth and resist sybil attacks.
            </I18n>
          </p>
          <p>
            <I18n>
              The SBT Fusion function module is designed by the issuer to achieve the differentiation of metrics and
              strategies by formulating different metrics and adopting different strategies among different metrics
              groups. One or more optima can be slowly found through A/B Testing. The most practical results brought by
              the optimal metrics and strategies can include, for example, some promotion channels with a high
              conversion rate of new members, community behaviors that can most effectively enhance the activity of old
              members, and unique souls with a high community reputation.
            </I18n>
          </p>
          <img id="paperImg5" src={paperImg5} alt="paperImg5" />
          <li>
            <I18n>Growth strategy</I18n>
          </li>
          <p>
            <I18n>
              Growth is an issue that no organization or even human business can avoid, and it maintains a more and more
              radical trend. From Web2's subsidized customer growth strategy to Web3's X2Earn/Airdrop financialization
              trend, the organizational growth of Web3 will require more accurate soul drop to ensure that a unique soul
              can be accurately summoned at the intersection.
            </I18n>
          </p>
          <p>
            <I18n>
              The growth strategy shown in the case in the figure describes the use of SBT to record an offline social
              media interaction data point, make horizontal comparison and attribution of this data point, and
              continuously track the community members from different media channels, to screen out the channels with
              low customer acquisition cost and high retention, and increase investment to establish core channels.
            </I18n>
          </p>
          <p>
            <I18n>
              The purpose of establishing the growth strategy is to find new channels for optimal ROI, including on and
              off the chain, external and internal. SBT records data points and becomes buried points. It continuously
              structures and serializes all kinds of data. With the increase and in-depth participation of users, it
              will gradually realize automatic recording and automatic analysis, and finally become an efficient growth
              engine and belongs to DAO.
            </I18n>
          </p>
          <li>
            <I18n>Development strategy</I18n>
          </li>
          <p>
            <I18n>
              The sustainable development of DAO is based on the growth of retained users, that is, the number of new
              users is greater than the number of lost users. After experiencing a period of explosive growth, many DeFi
              protocols, PFP projects, and GameFi communities have not achieved a stable net growth curve, which has
              resulted in a double-death spiral decline of assets and tokens. Poor economic models are certainly one of
              the factors, and insufficient guidance retention is also one of the factors.
            </I18n>
          </p>
          <p>
            <I18n>
              The development strategy shown in the case in the figure is to guide community members to migrate from the
              existing SBT to the deeper SBT by creating the participation level of community members and forming the
              core community member group. When crossing different levels of SBT, we can continuously integrate
              different factors of SBT, which are highly related to community business, and we can conduct attribution
              analysis on retention and business.
            </I18n>
          </p>
          <p>
            <I18n>
              The purpose of establishing the development strategy is to maximize the retention of members and build a
              community closed loop. There are various types of DAOs with great differences in development directions.
              It is necessary to use the development strategies in combination with the business characteristics of the
              community. SBT Fusion is a powerful configurable module that can create a retained growth curve of the
              community through interactive synthesis and non-interactive synthesis.
            </I18n>
          </p>
          <li>
            <I18n>Governance strategy</I18n>
          </li>
          <p>
            <I18n>
              Decentralized governance is the cornerstone of building a decentralized social consensus layer, and
              community governance is also the cornerstone of building community consensus. The problem of excessive
              financialization and potential sybil attacks caused by governance tokens is depleting the innovation power
              of the community. For example, when small companies grow into large companies, the early exploration and
              research on products and technologies gradually become the technical means of how to better complete KPI.
            </I18n>
          </p>
          <p>
            <I18n>
              The governance strategy shown in the case in the figure hopes that DAOs can find a unique soul, further
              contribute to the governance of the community, and form a shared rights market. The unique soul SBTs
              synthesized by SBTs such as contribution participation and reputation accumulation, on the one hand,
              establishing a source of trust for the soul, on the other hand, building important roles and dynamic
              governance through trust coding, and form decentralized governance-related scores.
            </I18n>
          </p>
          <p>
            <I18n>
              The purpose of setting up the governance strategy is to build a multi-governance system through SBTs to
              ensure decentralization, ensure that the community can be trusted, and transform individual participants
              from "not doing evil" to "cannot doing evil". Then the community members will be driven by the financial
              returns and values, and build a bottom-up DAO with rich property and governance by stimulating the economy
              and consensus building.
            </I18n>
          </p>
          <li>
            <I18n>More strategies</I18n>
          </li>
          <p>
            <I18n>
              Strategy templates for leads collection, work proof, community building, community ambassador, authority
              management and governance efficiency, etc. We will work with DAOs to create more excellent strategies to
              help the development and governance of DAOs.
            </I18n>
          </p>
          <Anchor id="SBT-datahub" current={currentHash} changeHash={changeHash}>
            <h3 id="SBT-datahub">
              <I18n>5. SBT DataHub: data processing center toolkit</I18n>
            </h3>
          </Anchor>
          <p>
            <I18n>
              SBT DataHub is a powerful tool of SRM protocol. It can provide data support for the issuance, management,
              and analysis of SBTs. It can help DAOs establish insight into community development and governance and
              form correct decisions. It can collect and mine the value of community development and governance data,
              realize data-driven business growth and decentralization, analyze enough user path map information through
              the perspective of cross-channel attribution data, measure every touchpoint and continuously optimize
              resource allocation and ROI.
            </I18n>
          </p>
          <p>
            <I18n>Data pull:</I18n>
          </p>
          <li>
            <I18n>Smart contract status data</I18n>
          </li>
          <li>
            <I18n>Smart contract transaction data</I18n>
          </li>
          <li>
            <I18n>Smart contract log data</I18n>
          </li>
          <li>
            <I18n>IPFS / metadata</I18n>
          </li>
          <li>
            <I18n>Off-chain data</I18n>
          </li>
          <p>
            <I18n>Data push:</I18n>
          </p>
          <li>
            <I18n>SBTs issuance data conditions</I18n>
          </li>
          <li>
            <I18n>SBTs synthesis metrics conditions</I18n>
          </li>
          <li>
            <I18n>SBTs attribution analysis report</I18n>
          </li>
          <li>
            <I18n>SBTs data dashboard</I18n>
          </li>
          <li>
            <I18n>SBTs OpenAPI</I18n>
          </li>
          <img id="paperImg6" src={paperImg6} alt="paperImg6" />
          <p>
            <I18n>
              SBT DataHub integrates data assets on/off the chain, delivers them to SBT Pad / Fusion to build a
              structured data system, and conducts attribution analysis on the process to enable community development
              and governance, to realize refined community operation. Form data keyframes in the form of SBTs, gather
              multi-source data, complete the preliminary cleaning of data and send it to Pad /Fusion for further use.
              It can independently create and maintain different types of industrial SBTs in combination with the needs
              of community business scenarios, and easily build a complete and dynamic data point system. After the
              formation of SBTs, DAOs can not only outline the group portrait characteristics of the subdivided group,
              but also accurately locate the core portrait of the single member, finally realize accurate interaction
              and refined operation, and improve the value discovery of the community members throughout the life cycle.
            </I18n>
          </p>
          <Anchor id="protocol-development" current={currentHash} changeHash={changeHash}>
            <h3 id="protocol-development">
              <I18n>6. Protocol development</I18n>
            </h3>
          </Anchor>
          <li>
            <I18n>Improvement of issuance</I18n>
          </li>
          <p>
            <I18n>
              Although the definition of issuer in the current protocol is relatively limited to the role of community
              administrator in DAOs, this is a person from the early core team in the decentralized community, and the
              power is relatively concentrated. We will improve the degree of decentralization of this module in the
              next version upgrade. Although we think that centralized startup is not a bad thing, because it can
              improve the efficiency of the startup stage, we will introduce a multi-sign mechanism, member issuance,
              group voting, and other functions to improve decentralized governance.
            </I18n>
          </p>
          <li>
            <I18n>DAO To DAO</I18n>
          </li>
          <p>
            <I18n>
              The stakeholders of DAOs also include other DAOs. The interactive relationship between organizations also
              needs SBTs for fine operation and governance. It can even be understood that this is a kind of
              interoperability between contracts. The data relationship formed in the process will need to be analyzed
              and used to improve the interaction efficiency between organizations. For example, the community may need
              to uniformly coordinate the Safe vault administrators and operate multiple vault contracts, and the SBTs
              in this process can be used as authority credentials for unified management.
            </I18n>
          </p>
          <li>
            <I18n>Intelligent governance</I18n>
          </li>
          <p>
            <I18n>
              After SBTs are applied on a large scale, they will form a large number of structured data sets, providing
              high-quality data sources for subsequent machine learning and deep learning. Decentralized governance will
              continuously increase the proportion of AI intervention, match the best strategies for DAOs and
              stakeholders, and improve the degree of automated governance. The abstracted soul address of the account
              can automatically interact with the matching SBTs issuer for the soul according to the set soul attribute,
              which will also improve the intelligent level of the SBTs-related ecology.
            </I18n>
          </p>
          <li>
            <I18n>Tokenomics</I18n>
          </li>
          <p>
            <I18n>
              The core of Daotion token economics is to maximize the resource allocation efficiency of the SRM protocol,
              coordinate the supply and demand relationship of SBTs, and at the same time gather the consensus of
              Daotion’s stakeholders. The overall economic model will be based on the SRM business, including but not
              limited to the distribution and coordination of interests of the issuer, holder, verifier, and other core
              participants. We will continue to introduce the detailed design of token economics in the future. The plan
              that can be disclosed at present is to design free NFT to give issuers the supply related to the issuance,
              design SBTs to give holders the use related to holding and configure the balance between supply and demand
              of SBTs through the token supply consumption model to achieve positive feedback of the economic model.
            </I18n>
          </p>
          <Anchor id="summary" current={currentHash} changeHash={changeHash}>
            <h3 id="summary">
              <I18n>7. Summary</I18n>
            </h3>
          </Anchor>
          <p>
            <I18n>
              SRM protocol is the next generation of interactive CRM, which can centralize the interactive connection
              management of the relationship between the community and stakeholders and can better bring DAOs and
              stakeholders together. Only when DAOs and their stakeholders are deeply bound together to form a stable
              social relationship can they work together to move towards a decentralized society. The foundation of the
              social consensus layer is constantly strengthened to better support the data consensus layer and the
              computing extension layer to serve billions of people. Daotion hopes to build a SRM protocol to add bricks
              and tiles to the social consensus layer.
            </I18n>
          </p>
          <p>
            <I18n>For stakeholders, by stakeholders.</I18n>
          </p>

          <Anchor id="reference" current={currentHash} changeHash={changeHash}>
            <h3 id="reference">
              <I18n>Reference:</I18n>
            </h3>
          </Anchor>
          <p>[1] Satoshi Nakamoto, "Bitcoin: A Peer-to-Peer Electronic Cash System", 2008.</p>
          <p>[2] Vitalik Buterin, "A Next-Generation Smart Contract and Decentralized Application Platform", 2014.</p>
          <p>[3] E. Glen Weyl, Puja Ohlhaver, Vitalik Buterin, "Decentralized Society: Finding Web3's Soul", 2022.</p>
          <p>
            [4] Manu Sporny, Dave Longley, David Chadwick, "Verifiable Credentials Data Model v2.0 W3C Recommendation",
            2022.
          </p>
          <p>[5] Hila Qu, "Growth Hacker", 2017.</p>
          <p>[6] Chris Dixon, "Blockchain Can Wrest the Internet From Corporations' Grasp", 2019.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
});

export default WhitePaper;
