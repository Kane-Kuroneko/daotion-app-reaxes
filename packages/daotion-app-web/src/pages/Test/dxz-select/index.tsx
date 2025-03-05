const { Option } = Select;

const children : React.ReactNode[] = [];
for ( let i = 10 ; i < 36 ; i++ ) {
	children.push( <Option key = { i.toString( 36 ) + i }>{ i.toString( 36 ) + i }</Option> );
}

const handleChange = ( value : string[] ) => {
	console.log( `selected ${ value }` );
};
export const TagsSelect = ( props
	// :SelectProps&{
	// type : "primary"} 
) => {
	return <Select
		className = { less.tagsPrimary }
		dropdownClassName = { less.dropDownMenu }
		mode = "tags"
		allowClear
		style = { { width : '100%' } }
		// showArrow
		removeIcon = { <SVGTagsClear /> }
		placeholder = { i18n( "Please select" ) }
		optionLabelProp="label"
		{ ...props }
	>
		{props.children}
	</Select>;
	
};
export const XSelect = ( props:SelectProps&{
	type : "primary"
} ) => {
	return <Select
		className = { less[ props.type ] }
		dropdownClassName = { less.dropDownMenu }
		mode = "multiple"
		allowClear
		style = { { width : '100%' } }
		showArrow
		removeIcon = { <SVGClear /> }
		placeholder = { i18n( "Please select" ) }
		optionLabelProp="label"
		{ ...props }
	>
		{props.children}
	</Select>;
	
};
export const SingleSelect = ( props ) => {
	return <Select
		className = { less[ props.type ] }
		dropdownClassName = { less.dropDownMenu }
		dropdownStyle = { {
			border : "2px solid #e6e8ec" ,
			borderRadius : "12px" ,
			padding : "8px" ,
		} }
		placeholder = { i18n( "All Type" ) }
		optionLabelProp="label"
		{ ...props }
	>
		<Select.Option value = "type1">type1</Select.Option>
		<Select.Option value = "type2">type2</Select.Option>
	</Select>
	
};
export const DxzSelect = reaxper( () => {
	return <>
		<div className = { less.box }>
			<XSelect
				type = "primary"
			/>
			<SingleSelect
			type='primary'
			/>
			<TagsSelect/>
		</div>
	</>;
} );
import less from './index.module.less';
import { Select , SelectProps } from 'antd';
import { SVGClear } from '@@SVGcomponents/space-setting-svg';




export const SVGTagsClear=reaxper(()=>{
	return<>
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M6.7072 5.29289C6.31668 4.90237 5.68351 4.90237 5.29299 5.29289C4.90246 5.68342 4.90246 6.31658 5.29299 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.293 18.7071C17.6835 19.0976 18.3167 19.0976 18.7072 18.7071C19.0977 18.3166 19.0977 17.6834 18.7072 17.2929L13.4143 12L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5857L6.7072 5.29289Z" fill="#FCFCFC"/>
		</svg>
	</>
})
