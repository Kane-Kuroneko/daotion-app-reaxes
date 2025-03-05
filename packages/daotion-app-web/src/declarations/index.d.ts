
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.bmp';


declare interface NodeModule {
	hot?: {
		accept: Function;
	};
}

declare interface NodeRequire {
	context: Function;
}

/*批量将一个包含键名的数组KEY指定为一个值都为F的对象类型*/
declare type Batch<KEY extends (string | number | symbol)[], F> = {
	[p in ArrayElement<KEY>]: F;
};

type WalletState = import('@web3-onboard/core').WalletState;
type ConnectedChain = import('@web3-onboard/core').ConnectedChain;

type Chain = import('@web3-onboard/common').Chain;
declare type Account = ArrayElement<WalletState['accounts']>;

/*从Promise里获取then的值*/
declare type PromiseValue<P> = P extends Promise<infer V> ? V : never;
