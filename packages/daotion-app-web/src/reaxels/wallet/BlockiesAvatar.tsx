/**
 * @description
 * 渲染blockies头像的reaxel:
 * 每个渲染目标挂载时往canvasRefs里push,卸载时remove掉 ,
 * 监听address变化 ,批量重渲染.
 * 挂载时多传入一个math.random是为了使deps对比失效来强制渲染.
 * 挂载时多传入的ref是告诉reaction不要批量渲染,我挂载了只渲染我一个就行.
 */
export const reaxel_blockies = function(){
	const reax_wallet = reaxel_wallet();
	
	const canvasRefs:React.RefObject<HTMLCanvasElement>[] = [];
	
	const closured = Reaxes._DEPRECATED_closuredMemo((address:string,ref?:React.RefObject<HTMLCanvasElement>) => {
		if(address && !reax_wallet.account?.ens){
			if(ref) return renderIcon( {
				seed : reax_wallet.account.address.toLowerCase() ,
				scale : 2.5 ,
			} , ref.current );
			
			for(const {current:canvasElement} of canvasRefs){
				
				if(canvasElement){
					renderIcon( {
						seed : reax_wallet.account.address.toLowerCase() ,
						scale : 2.5 ,
					} , canvasElement );
				}
			}
		}
	},() => []);
	/*account.address变化时会自动执行closured*/
	Reaxes.observedMemo(() => {
		closured(() => [reax_wallet.account?.address])(reax_wallet.account?.address);
	},() => [reax_wallet.account?.address]);
	return () => {
		
		return {
			BlockiesAvatar() {
				const canvasRef = useRef<HTMLCanvasElement>();
				useEffect(() => {
					canvasRefs.push(canvasRef);
					/*挂载时检测到deps没有变化是不会渲染的,所以多传入random来强制渲染一次*/
					closured(() => [reax_wallet.account?.address,Math.random()])(reax_wallet.account?.address,canvasRef);
					return () => _.remove(canvasRefs,canvasRef),null;
				},[]);
				return <canvas width={20} height={20} ref = { canvasRef } style={{borderRadius : "50%",marginLeft : "8px" ,}}></canvas>;
			},
		}
	}
}();

import {renderIcon} from '@download/blockies';
import {reaxel_wallet} from '@@reaxels/wallet/wallet';
