import { crayon } from "@@utils";

export const EditWhitelist = reaxper(() => {
	const [ , { spaceID , SBTID } ] = utils.makePair(toolkits.useRouter().params , ({ spaceID , SBTID }) => {
		return {
			spaceID : parseInt(spaceID) ,
			SBTID : parseInt(SBTID) ,
		};
	});
	
	const {
		whitelist ,
		store__SBT_settings_whitelist ,
		setFields ,
		switch_row_editable ,
		reset_changes ,
	} = reaxel__SBT_settings_whitelist();
	
	const { Tabs , Table , Segmented , Button , Alert , Steps } = antd;
	const { TabPane } = Tabs;
	const { Step } = Steps;
	return <>
		<SearchBar />
		<DetailTable />
		<Alert
			type = "info"
			message = "最多展示500条数据，请通过搜索来筛选目标数据。"
			showIcon
		/>
		{/*<OpertaionBtnGroup />*/}
		<SaveChangesGroup/>
	</>;
});


export const DetailTable = reaxper((props) => {
	const {
		TableEmpty,
		setFields,
		store__SBT_settings_whitelist,
		whitelist,
		switch_row_editable,
		offset_row_value,
		reset_row,
	} = reaxel__SBT_settings_whitelist();
	const [, { spaceID, SBTID }] = utils.makePair(toolkits.useRouter().params, ({ spaceID, SBTID }) => {
		return {
			spaceID: parseInt(spaceID),
			SBTID: parseInt(SBTID),
		};
	});
	
	const { Table , InputNumber , ConfigProvider  } = antd;
	
	const columns = [
		{
			title : 'ADDRESS' ,
			dataIndex : 'address' ,
		} ,
		{
			title : 'AMOUNT' ,
			width: 200,
			dataIndex : 'amount' ,
		} ,
		{
			title : 'REMAINDER' ,
			dataIndex : 'remainder' ,
		} ,
		{
			title : 'Offset' ,
			render : (text , record , index) => {
				const { Button } = antd;
				const done = () => {
					if( record.modifiedOffset + record.remainder < 0 ) {
						offset_row_value(record.address , - record.remainder);
					}
					switch_row_editable(false , record.address);
				};
				crayon.yellow('editing:' , record.editing);
				if( record.editing ) {
					return <div>
						<div className = { less.amountSection }>
							<InputNumber
								onPressEnter = { done }
								onChange = { (value) => {
									offset_row_value(record.address , value);
								} }
								value = { record.modifiedOffset }
								controls = { { upIcon : <SVGSBTCountUp /> , downIcon : <SVGSBTCountDown /> } }
							/>
							<TableActionBtn
								onClick = { done }
								text = {i18n("Done")}
								type="primary"
							/>
						</div>
					</div>;
				} else {
					return (
						<span>{ record.modifiedOffset}</span>
					);
				}
			} ,
		} ,
		{
			title : 'ACTION' ,
			dataIndex : 'action' ,
			render : (text , record , index) => {
				const { Button } = antd;
				return (
					<div className = { less.actionSection }>
						<TableActionBtn
							onClick = { () => {
								switch_row_editable(true , record.address)
							} }
							text = {i18n("Edit")}
							type="link"
						/>
						{store__SBT_settings_whitelist.modifyingWhitelist.some(({address}) => toolkits.addressEqual(address , record.address) ) && <TableActionBtn
							text = {i18n("Remove")}
							type="link"
							onClick = { () => {
								setFields({
									modifyingWhitelist : store__SBT_settings_whitelist.modifyingWhitelist.filter((element) => element.address !== record.address) ,
								});
							} }
						/>}
						{ record.modifiedOffset !== 0 && <div className={less.resetSection}>
							<TableActionBtn
								text = {i18n("Reset")}
								type="primary"
								onClick = { () => reset_row(record.address) }
							/>
						</div> }
					</div>
				);
			} ,
		} ,
	];
	
	return <>
		<div className = { less.table }>
			<ConfigProvider
				renderEmpty={() => TableEmpty}
			>
				<Table
					scroll={{
						y: 800
					}}
					rowClassName = { (record , index) => {
						if (record.editing) {
							return less.editingGray;
						}
						
						if( record.modifiedOffset + record.remainder === 0 ) {
							return less.redCover;
						} else if( record.modifiedOffset !== 0 ) {
							return less.blueCover;
						}
					} }
					rowKey = "address"
					columns = { columns }
					dataSource = { whitelist }
					pagination = { {
						current : store__SBT_settings_whitelist.currentPage ,
						pageSize : store__SBT_settings_whitelist.pageSize ,
						total : whitelist.length ,
						onChange : (page , pageSize) => {
							setFields({
								currentPage : page ,
								pageSize ,
							});
						} ,
					} }
				/>
			</ConfigProvider>
		</div>
	</>;
});


const TableActionBtn = (props:{
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


import {SaveChangesGroup} from '@@pages//Plugin-SBT-Settings/Settings-Eligible/Whitelist/SaveChanges.component';
import { reaxel__SBT_settings_whitelist } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Whitelist/reaxel--SBT-settings-whitelist';
import { reaxel_scrollParentRef } from '@@reaxels';
import { SearchBar } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Whitelist/SearchBar.component';
import { XButton } from '@@Xcomponents';
import { Notification } from '@@pages/Test/Notification';
import {
	SVGSBTCheck ,
	SVGSBTClose ,
	SVGSBTCountDown ,
	SVGSBTCountUp ,
	SVGSBTUploading ,
	SVGSBTWarning ,
} from "@@SVGcomponents";
import {createPortal} from 'react-dom';
import less from '@@pages/Plugin-SBT-Settings/index.module.less';
