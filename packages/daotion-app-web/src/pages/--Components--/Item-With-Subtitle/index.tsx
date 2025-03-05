export const ItemWithSubTitle = ( props : React.PropsWithChildren<{
	title : string;
}> ) => {
	return <>
		<span className = { less.subTitle }>{ props.title }</span>
		{ props.children }
	</>;
};


import less from './index.module.less';
