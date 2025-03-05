
export const PluginSBTPadList = reaxper(() => {
	const { params } = toolkits.useRouter();
	const spaceID = parseInt(params.spaceID);
	
	const {
		fetchSBTList ,
		SBT_Pad_Store ,
		scrollParentRef ,
		setFields,
		emptyData
	} = reaxel_SBT_list();
	const { fetchUserRoleInSpace , role } = reaxel__role_in_space(spaceID);
	crayon.blue('role' , role);
	fetchSBTList({ spaceID });
	
	useEffect(() => {
		return () => emptyData();
	} , []);
	
	return <>
		<div className = { less.allSBTsContainer }>
			{/*分为顶部的若干个SBT索引框和下面展示的SBT card list*/ }
			<div className = { less.SBTsDisplayTopBox }>
				<span className = { less.SBTsTitle }>SBTs</span>
				<div className = { less.SBTsIndexingWithBtn }>
					<SBTSearchArea />
					{ role !== 1 && <SBTCreateNewBtn /> }
				</div>
			</div>
			
			<div className = { less.SBTsDisplayCardList }>
				
				<InfiniteScroll
					style = { {
						display : "flex" ,
						flexFlow : "row wrap" ,
						justifyContent : "flex-start" ,
					} }
					pageStart = { 0 }
					hasMore = { SBT_Pad_Store.hasMore }
					loadMore = { () => {
						fetchSBTList({ spaceID , count : 20 } , true);
					} }
					getScrollParent = { () => scrollParentRef.current }
					useWindow = { false }
					threshold = { 300 }
				>
					{ SBT_Pad_Store.SBT_list.map((item) => {
						return <SBTDisplayCard
							key = { item.SBTID }
							SBT_info = {item}
						/>;
					}) }
				</InfiniteScroll>
			</div>
		</div>
		{ role !== 1 && <CreateSBTModal /> }
	</>;
});

export const SBTSearchArea = reaxper(() => {
	const { SBT_Pad_Store , setFields , fetchSBTList , enum__SBT_type , } = reaxel_SBT_list();
	const { chains } = reaxel_wallet();
	const { Input , Select } = antd , { Option } = Select;
	return <>
		<Input
			value = { SBT_Pad_Store.input_search }
			onChange = { ( e ) => {
				setFields( {
					input_search : e.target.value ,
					
				} );
			} }
			suffix = { <SVGSearch /> }
			placeholder = { i18n( 'Search SBTs' ) }
			className = { less.SBTsSearchInput }
		/>
		
		<Select
			value = { SBT_Pad_Store.select_chain }
			onChange = { ( value ) => {
				setFields( {
					select_chain : value ,
				} );
			} }
			suffixIcon = { <SVGSelectSuffix /> }
			className = { less.SBTSelectType }
			dropdownClassName = { less.dropDownMenu }
			dropdownStyle = { {
				border : "2px solid #e6e8ec" ,
				borderRadius : "12px" ,
				padding : "8px" ,
			} }
			placeholder = { i18n( "All Chain" ) }
			// optionLabelProp = "label"
		>
			{ chains.map( ( chain ) => {
				return <Option
					key = { chain.id }
				>{ chain.label }</Option>;
			} ) }
		</Select>
		<Select
			value = { SBT_Pad_Store.select_type }
			onChange = { ( value ) => {
				setFields( { select_type : value === "_null_" ? null : value } );
			} }
			suffixIcon = { <SVGSelectSuffix /> }
			className = { less.SBTSelectType }
			dropdownClassName = { less.dropDownMenu }
			dropdownStyle = { {
				border : "2px solid #e6e8ec" ,
				borderRadius : "12px" ,
				padding : "8px" ,
			} }
			placeholder = { i18n( "All Types" ) }
		>
			<Select.Option
				value = { "_null_" }
			>All types</Select.Option>
			{ enum__SBT_type.map( ( tag: string ) => {
				return <Select.Option
					value = { tag }
					key = { tag }
				>{ tag }</Select.Option>;
			} ) }
		</Select>
	</>;
});

export const SBTDisplayCard = reaxper((props : {
	SBT_info: API__SBT_list.SBTListItem;
}) => {
	const spaceID = parseInt(toolkits.useRouter().params.spaceID);
	const { chains } = reaxel_wallet();
	const { navigate , params } = toolkits.useRouter();
	const { role } = reaxel__role_in_space(spaceID);
	const chain = chains.find(({ id }) => props.SBT_info.chainID);
	return <>
		<div
			onClick={() => {
				navigate( `/space${params.spaceID}/SBT${props.SBT_info.SBTID}` );
			}}
			className = { less.SBTDisplayCard }
		>
			{/*<div className = { less.SBTShowSection }></div>*/ }
			<Img
				src = { props.SBT_info.iconUrl }
				className = { less.SBTShowSection }
			/>
			<div className = { less.SBTInfoSection }>
				<p className = { less.SBTCardName }>{ props.SBT_info.name }</p>
				<span>{ props.SBT_info.type }</span>
				<div className = { less.divider }></div>
				<div className = { less.cardFooter }>
					<Img src = { `${ chain.icon }` } />
					<span>{ chain.label }</span>
				</div>
			</div>
			{ role !== 1 && <div className = { less.mask }>
				<div className = { less.settingBtn }>
					<XButton
						onClick = { (e) => {
							e.stopPropagation();
							navigate(`/space${ props.SBT_info.spaceID }/SBT${ props.SBT_info.SBTID }/settings`);
						} }
						icon = { <SVGSettings /> }
						type = "primary"
					>
						Settings
					</XButton>
				</div>
			</div> }
		</div>
	</>;
});

export const SBTCreateNewBtn = reaxper(() => {
	
	const { setFields } = reaxel_SBT_list();
	return <>
		<XButton
			type = "primary"
			style = { {
				height : "40px" ,
				borderRadius : '8px' ,
				fontSize : "13px",
			} }
			onClick = { () => {
				setFields({ create_Modal_visible : true });
			} }
		>
			Create new SBT
		</XButton>
	</>;
});


import {
	reaxel__role_in_space ,
	reaxel_SBT_list ,
	reaxel_wallet ,
	
} from "@@reaxels";
import {
	API__SBT_info ,
	API__SBT_list,
} from '@@requests';
import { CreateSBTModal } from './Create-SBT-Modal';
import { Img } from '@@Xcomponents';
import { XButton } from '@@pages/Test/dxz-button';
import InfiniteScroll from 'react-infinite-scroller';
import {SVGSettingTabs} from '@@SVGcomponents/space-info-svg';
import {
	SVGSearch ,
	SVGSelectSuffix ,
	SVGSettings
} from '@@SVGcomponents/all-SBT-SVG';
import spaceTags from '@@public/space-tags.json';
import less from './index.module.less';
