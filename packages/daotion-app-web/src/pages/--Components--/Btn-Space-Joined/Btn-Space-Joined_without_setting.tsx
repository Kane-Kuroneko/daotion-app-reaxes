import {
	reaxel_joined_Space_list ,
	reaxel_user_join_or_leave_space,
} from '@@reaxels';

import less from '@@root/src/styles/reaxels.module.less';
/*返回join or leave button*/
export const BtnSpaceJoined_without_setting = reaxper( ( props : JoinedBtnProps ) => {
	const { Button } = antd;
	const { joined_space_list } = reaxel_joined_Space_list();
	
	if ( joined_space_list.find( ( item ) => item.spaceID == props.spaceID ) ) {
		return <Button
			className = { less.joinedBtn }
			style = { props.style }
			onClick = { ( e ) => {
				e.stopPropagation();
				reaxel_user_join_or_leave_space().
				leave_space( props.spaceID ).
				then( () => {
					if ( __EXPERIMENTAL__ ) {
						antd.message.success( `user leaved Space id:${ props.spaceID }` );
					}
				} );
			} }
		>
			<span />
		</Button>;
	} else {
		return <Button
			style = { props.style }
			onClick = { ( e ) => {
				e.stopPropagation();
				reaxel_user_join_or_leave_space().
				join_space( props.spaceID ).
				then( () => {
					if ( __EXPERIMENTAL__ ) {
						antd.message.success( `joined Space successfuly id:${ props.spaceID }` );
					}
				} );
			} }
		>Join</Button>;
	}
} );

type JoinedBtnProps = {
	spaceID : number;
	style : React.CSSProperties;
};
