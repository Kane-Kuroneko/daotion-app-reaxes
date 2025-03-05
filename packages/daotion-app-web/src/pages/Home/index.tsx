export const All_Spaces_List_Container = reaxper(() => {
	const { scrollParentRef } = reaxel_scrollParentRef();
	
	const { store , deduped_fetch_all_space_list , setFields,reset_fetch_state, } = reaxel_space_list();
	
	const { Empty , Input , Select , Space } = antd , { Option } = Select;
	
	deduped_fetch_all_space_list();
	
	useEffect(() => () => reset_fetch_state(),[]);
	
	return (
		<>
			<div
				style = { {
					flexGrow : '1' ,
					display : 'flex' ,
					flexFlow : 'column nowrap' ,
					userSelect : 'none' ,
					minWidth : '810px' ,
					alignItems : 'center' ,
				} }
			>
				<div
					style = { {
						borderRadius : '16px' ,
						display : 'flex' ,
						flexFlow : 'column nowrap' ,
						padding : '32px' ,
						flex : '1 1 auto' ,
						minWidth : '1216px' ,
					} }
				>
					<div
						style = { {
							display : 'flex' ,
							justifyContent : 'space-between' ,
							alignItems : 'center' ,
							width : '1200px' ,
						} }
					>
						<div
							style = { {
								color : '#1a1d1f' ,
								fontSize : '20px' ,
								fontWeight : 'bold' ,
								display : 'flex' ,
							} }
						>
							Spaces
						</div>
						<div className = { less.iptSelectBox }>
							<Space>
								<Input
									suffix = { <SearchOutlined /> }
									style = { {
										width : '256px' ,
										height : '40px' ,
										display : 'flex' ,
										borderRadius : '8px' ,
										border : '2px solid #e6e8ec' ,
										marginRight : '16px' ,
									} }
									value = { store.Input__search_text }
									placeholder = { i18n('Search') }
									onInput = { (e) => {
										setFields({ Input__search_text : e.target.value });
									} }
								/>
								<Select
									value = { store.Select__search_tag }
									placeholder = { i18n('Type') }
									suffixIcon = { <SelectArrowIconSvgComponent /> }
									onSelect = { (text) => {
										if( text === 'null' ) text = null;
										setFields({Select__search_tag:text});
									} }
								>
									<Select.Option key = { null }>all types</Select.Option>
									{ spaceTags.map((tag) => (
										<Select.Option key = { tag }>{ tag }</Select.Option>
									)) }
								</Select>
							</Space>
						</div>
					</div>
					
					<div
						style = { {
							display : 'flex' ,
							marginTop : '24px' ,
							justifyContent : 'flex-start' ,
							paddingRight : '-16px' ,
							flexFlow : 'row wrap' ,
							maxHeight : 'fit-content' ,
							width : '1216px' ,
						} }
					>
						<InfiniteSpacesList />
					</div>
				</div>
			</div>
		</>
	);
});

const InfiniteSpacesList = reaxper(() => {
	const { store , deduped_fetch_all_space_list } = reaxel_space_list();
	const { scrollParentRef } = reaxel_scrollParentRef();
	const { Empty } = antd;
	if( store.infos.length === 0 ) {
		return (
			<>
				<Empty
					image = { Empty.PRESENTED_IMAGE_SIMPLE }
					style = { { display : 'block' } }
				/>
			</>
		);
	}
	return (
		<InfiniteScroll
			style = { {
				display : 'flex' ,
				flexFlow : 'row wrap' ,
				justifyContent : 'flex-start' ,
			} }
			pageStart = { 0 }
			hasMore = { store.hasMore }
			loadMore = { () => {
				deduped_fetch_all_space_list(true);
			} }
			getScrollParent = { () => scrollParentRef.current }
			useWindow = { false }
			threshold = { 500 }
		>
			{ store.infos.map((item) => (
				<Space_List_Item
					key = { item.id }
					info = { item }
				/>
			)) }
		</InfiniteScroll>
	);
});

import {
	reaxel_scrollParentRef ,
	reaxel_space_list ,
} from '@@reaxels';
import { Space_List_Item } from '@@pages/--Components--';
import { SearchOutlined } from '@ant-design/icons';
import spaceTags from '@@public/space-tags.json';
import InfiniteScroll from 'react-infinite-scroller';
import { SelectArrowIconSvgComponent } from '@@SVGcomponents';
import less from './index.module.less';
