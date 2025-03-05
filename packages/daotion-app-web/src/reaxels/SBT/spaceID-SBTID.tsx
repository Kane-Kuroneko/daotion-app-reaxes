/**
 * 为其他reaxel提供spaceID和SBTID的状态管理服务
 */
export const reaxel__SpaceIDSBTIDServ = function(){
	const initialState = {
		SBTID : null as number ,
		spaceID : null as number ,
	};
	const { store , setState } = orzMobx(initialState);
	
	return () => {
		
		return {
			get currentIDSBTspace(){
				return store;
			} ,
			get setIDSBTspace(){
				return setState;
			} ,
			clearIDSBTspace(){
				setState(initialState);
			} ,
		};
	};
}();
