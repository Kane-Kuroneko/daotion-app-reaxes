
export const UserAvatar = reaxper( (props) => {
	const reax_wallet = reaxel_wallet();
	const reax_blockies = reaxel_blockies();
	
	if ( reax_wallet.account?.ens?.avatar?.url ) {
		return <span
			style = { {
				marginLeft : "8px" ,
				backgroundSize : "100%" ,
				backgroundRepeat : "no-repeat" ,
				backgroundPosition : "center" ,
				backgroundImage : `url("${ reax_wallet.account.ens.avatar.url }")` ,
				backgroundColor : "#eeeeee" ,
				display : "flex" ,
				width : props.width || 40 ,
				height : props.height || 40 ,
				borderRadius : "50%" ,
			} }
		/>;
	}
	const { BlockiesAvatar } = reax_blockies;
	return <BlockiesAvatar />;
} );


import {
	reaxel_blockies ,
	reaxel_wallet ,
} from '@@reaxels';
