/**
 * hooks:通过react-router获取spaceID和SBTID
 * @returns {{spaceID:number,SBTID:number}}
 */
export const useSpaceSBTID = () => {
	const [ , spaceSBTID ] = utils.makePair(toolkits.useRouter().params , ({ spaceID , SBTID }) => {
		return {
			spaceID : parseInt(spaceID) ,
			SBTID : parseInt(SBTID) ,
		};
	});
	return spaceSBTID;
}
