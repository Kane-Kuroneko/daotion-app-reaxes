export const TableSBTBlacklist = reaxper(() => {
	const [ , { spaceID , SBTID } ] = utils.makePair(toolkits.useRouter().params , ({ spaceID , SBTID }) => {
		return {
			spaceID : parseInt(spaceID) ,
			SBTID : parseInt(SBTID) ,
		};
	});
	
	const {} = reaxel__blacklist();
	
	const { InputNumber , Table , Button , Alert ,Modal} = antd;
	return <>
		<SearchBar />
		<DetailTable />
	</>;
});


export const DetailTable = reaxper((props) => {
	
	const [ , { spaceID , SBTID } ] = utils.makePair(toolkits.useRouter().params , ({ spaceID , SBTID }) => {
		return {
			spaceID : parseInt(spaceID) ,
			SBTID : parseInt(SBTID) ,
		};
	});
	
	const { blacklist , setFields , switchAddressBlacklist } = reaxel__blacklist();
	
	const { Table , InputNumber , ConfigProvider } = antd;
	
	const columns = [
		{
			title : 'ADDRESS' ,
			dataIndex : 'address' ,
		} ,
		{
			title : 'Quantity being held' ,
			width : 200 ,
			dataIndex : 'holdNum' ,
		} ,
		{
			title : 'Revocation Number' ,
			dataIndex : 'revocationNum' ,
		} ,
		{
			title : 'ACTION' ,
			render : (text , record , index) => {
				const { Button } = antd;
				return (
					<div className = { less.actionSection }>
						<TableActionBtn
							onClick = { () => {
								if(record.inBlacklist){
									switchAddressBlacklist(record.address , false);
								}
							} }
							text = { i18n("recover") }
							type = "link"
						/>
					</div>
				);
			} ,
		} ,
	];
	
	return <>
		<div className = { less.table }>
			<ConfigProvider
				// renderEmpty = { () => TableEmpty }
			>
				<Table
					scroll = { {
						y : 800,
					} }
					rowClassName = { (record , index) => {
						if( record.modifiedOffset + record.remainder === 0 ) {
							return less.redCover;
						} else if( record.modifiedOffset !== 0 ) {
							return less.blueCover;
						}
					} }
					rowKey = "address"
					columns = { columns }
					dataSource = { blacklist }
				/>
			</ConfigProvider>
		</div>
	</>;
});



const TableActionBtn = (props : {
	type : "link" | "primary";
	onClick : React.MouseEventHandler<HTMLSpanElement>;
	text : string;
}) => {
	return <span
		className = { {
			"link" : less.tableActionBtn ,
			"primary" : less.tableActionBtnTwo ,
		}[props.type] }
		onClick = { props.onClick }
	>
		{ props.text }
	</span>;
};

import { reaxel__blacklist } from './reaxel--blacklist';
import { SearchBar } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Blacklist/SearchBar.component';
import {
	SVGSBTCountDown ,
	SVGSBTCountUp ,
} from "@@SVGcomponents";
import less from '@@pages/Plugin-SBT-Settings/index.module.less';
