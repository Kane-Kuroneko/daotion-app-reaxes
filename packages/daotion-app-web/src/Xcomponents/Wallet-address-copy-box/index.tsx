import clipboard from 'copy-to-clipboard';
import { message } from 'antd';
import less from '@@pages/Space-Info/index.module.less';
/*复制地址组件*/
export const WalletAddressCopyBox = ( props : { walletAddr : string, prefixLength? : number } ) => {
	const {
		walletAddr ,
		prefixLength = 6,
	} = props;
	if(!walletAddr) return null;
	const tail = "……" + walletAddr.slice( walletAddr.length - 4 );
	const result = walletAddr.slice( 0 , prefixLength ) + tail;
	
	return <div
		onClick = { () => {
			clipboard( walletAddr );
			message.success( 'copied successfully' );
		} }
		className={less.walletAddressCopyBox}>
		<span>
			{ result }
		</span>
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 3.33333H9.33333C9.70152 3.33333 10 3.63181 10 4V4.66667H11.3333V4C11.3333 2.89543 10.4379 2 9.33333 2H4C2.89543 2 2 2.89543 2 4V9.33333C2 10.4379 2.89543 11.3333 4 11.3333H4.66667V10H4C3.63181 10 3.33333 9.70152 3.33333 9.33333V4C3.33333 3.63181 3.63181 3.33333 4 3.33333Z" fill="#141416"/>
			<path fillRule="evenodd" clipRule="evenodd" d="M12.0001 5.99984H6.66675C6.29856 5.99984 6.00008 6.29831 6.00008 6.6665V11.9998C6.00008 12.368 6.29856 12.6665 6.66675 12.6665H12.0001C12.3683 12.6665 12.6667 12.368 12.6667 11.9998V6.6665C12.6667 6.29831 12.3683 5.99984 12.0001 5.99984ZM6.66675 4.6665C5.56218 4.6665 4.66675 5.56193 4.66675 6.6665V11.9998C4.66675 13.1044 5.56218 13.9998 6.66675 13.9998H12.0001C13.1047 13.9998 14.0001 13.1044 14.0001 11.9998V6.6665C14.0001 5.56193 13.1047 4.6665 12.0001 4.6665H6.66675Z" fill="#141416"/>
		</svg>
	</div>;
};
