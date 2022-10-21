/*global provider*/
declare const _ : typeof import('lodash/lodash');
declare const React : typeof import('react');
declare const useState : typeof React.useState;
declare const useEffect : typeof React.useEffect;
declare const useRef : typeof React.useRef;
declare const useLayoutEffect : typeof React.useLayoutEffect;
declare const useMemo : typeof React.useMemo;
declare const useCallback : typeof React.useCallback;
declare const orzMobx : typeof import('#reaxes').orzMobx;
declare const Reaxper : typeof import('#reaxes').Reaxper;
declare const Reaxlass : typeof import('#reaxes').Reaxlass;
declare const Reaxes : typeof import('#reaxes').Reaxes;





/*DOM*/
declare interface EventTarget {
	value?: string;
}
/*CSS*/
declare module '*.module.less' {
	const classes : {
		readonly [ key: string ]: string;
	};
	
	export default classes;
}
declare module '*.theme.less' {
	const theme : string;
	export default theme;
}
