import { Space__all_spaces } from '@@reaxels/Spaces/types';
import {
	reaxel_joined_Space_list ,
	reaxel_user_join_or_leave_space ,
} from '@@reaxels';
import chainIconMap from '@@public/chain-icon-map.json';
import { message } from 'antd';
import { Img } from '@@Xcomponents';

export const Space_List_Item = reaxper( class extends Reaxlass<{
	info : ArrayElement<Space__all_spaces.response['infos']>
}> {
	
	reax_joined_spaces_list = reaxel_joined_Space_list();
	
	reax_user_join_or_leave_space = reaxel_user_join_or_leave_space();
	
	JSX = {
		
		Join_or_leave : reaxper( () => {
			const [ mouseEntered , setMouseEntered ] = useState( false );
			const { spaceID } = this.props.info;
			const role = this.reax_joined_spaces_list.joined_space_list.find( ( item ) => item.spaceID === spaceID )?.role;
			return this.reax_joined_spaces_list.joined_space_list.some( ( item ) => item.spaceID === this.props.info.spaceID ) ? <div
				className = { less.spaceListItemBtnJoined }
				onMouseEnter = { () => {
					if ( role === 3 ) {
						return;
					}
					setMouseEntered( true );
				} }
				onMouseLeave = { () => setMouseEntered( false ) }
				onClick = { ( e ) => {
					e.stopPropagation();
					if ( role === 3 ) {
						return;
					}
					this.reax_user_join_or_leave_space.leave_space( spaceID ).
					then( () => {
						if ( __EXPERIMENTAL__ ) {
							message.success( `user leaved Space id:${ spaceID }` );
						}
					} );
				} }
			>
				<I18n>{ mouseEntered ? "leave" : (
					role === 3 ? "Owner" : "Joined"
				) }</I18n>
			</div> : <div
				onClick = { ( e ) => {
					e.stopPropagation();
					this.reax_user_join_or_leave_space.join_space( spaceID ).
					then( () => {
						if ( __EXPERIMENTAL__ ) {
							message.success( `joined Space successfuly id:${ spaceID }` );
						}
					} );
				} }
				className = { less.spaceListItemBtnLeaved }
			>
				<I18n>
					Join
				</I18n>
			</div>;
		} ) ,
	};
	
	render() {
		const { Join_or_leave } = this.JSX;
		const { info } = this.props;
		const { navigate } = toolkits.useRouter();
		return <>
			<div className = { less.spaceListCard }
					onClick = { () => {
					navigate( `/space${ info.spaceID }/info` );
				} }>
				<div className={less.spaceItemIconBox}>
					<Img
						className = { less.spaceItemIcon }
						src = { info.iconUrl }
						fallback = { <div
							style = { {
								height : "76px" ,
								borderRadius : "50%" ,
								backgroundColor : "black" ,
								display : "flex" ,
								justifyContent : "center" ,
								alignItems : "center" ,
								width : "76px",
							} }
						>
							<span className = { less.theFirstLetter }>
								{ info.name.slice( 0 , 1 ).
								toUpperCase() }
							</span>
						</div> }
					/>
				</div>
				<span className = { less.spaceItemName }>{ info.name }</span>
				<div className = { less.spaceListItemTagContainer }>
					{ info.tags.map( text => <Space_Item_Tag
						key = { text }
						text = { text }
					/> ) }
				</div>
				<Join_or_leave />
			</div>
		</>;
	}
} );


/**
 * @example
 * <Space_Item_Name_Icon src="url('data:image/svg...')"/>
 * <Space_Item_Name_Icon src="url('https://xxx.png')"/>
 *
 */

export const Space_Item_Name_Chain_Icon = ( props : { src : string } ) => {
	
	return <>
		<span
			style = { {
				display : "inline-flex" ,
				width : "16px" ,
				height : "16px" ,
				backgroundImage : props.src ,
				borderRadius : "50%" ,
				backgroundColor : "#f4f5f6" ,
				marginLeft : "4px" ,
			} }
		/>
	</>;
};


export const Space_Item_Tag = ( props : { text : string } ) => {
	
	return <span className={less.spaceItemTag}>{ props.text }</span>;
};

import less from './style.module.less';
