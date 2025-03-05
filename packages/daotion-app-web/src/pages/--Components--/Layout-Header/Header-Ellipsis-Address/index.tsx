export const EllipsisAddress = reaxper( () => {
	const reax_wallet = reaxel_wallet();
	if ( !reax_wallet.wallet ) return null;
	const address = reax_wallet.account.address;
	return <span
		style = { {
			width : "100%" ,
			overflow : "hidden" ,
			whiteSpace : "nowrap" ,
			display : "flex" ,
			lineHeight:"20px",
		} }
	>
		<span
			style = { {
				display : "flex" ,
				textOverflow : "ellipsis" ,
				overflow : "hidden" ,
			} }
		>{ address.slice( 0 , 6 ) }</span>
		<span>...{ address.slice( -4 ) }</span>
	</span>;
} );


import { reaxel_wallet  } from '@@reaxels';
