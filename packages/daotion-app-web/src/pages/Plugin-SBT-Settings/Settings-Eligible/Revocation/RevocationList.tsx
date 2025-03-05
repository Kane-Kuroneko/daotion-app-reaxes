import { XButton } from "@@pages/Test/mozi-xbutton";

export const RevocationList = reaxper(() => {
	const [ , { spaceID , SBTID } ] = utils.makePair(toolkits.useRouter().params , ({ spaceID , SBTID }) => {
		return {
			spaceID : parseInt(spaceID) ,
			SBTID : parseInt(SBTID) ,
		};
	});
	
	const {
		store_SBT_revocation,
		setEditing ,
		setFields,
		editing,
		contractRevokeSBT,
		contractRecoverSBT,
		showModal,
		
	} = reaxel__SBT_revocation();
	
	const { InputNumber , Table , Button , Alert ,Modal, Space} = antd;
	return <>
		<SearchBar />
		<DetailTable />
		<Alert
			type = "info"
			message = "最多展示500条数据，请通过搜索来筛选目标数据。"
			showIcon
		/>
		<Modal
			open = { !!store_SBT_revocation.editing }
			title = { {
				"revocating" : i18n("Revocation") ,
				"recovering" : i18n("Recover") ,
			}[store_SBT_revocation.editing?.type] }
			onOk = { () => {
				showModal(true);
				// if(editing.type === "revocating"){
				// 	contractRevokeSBT(editing.address,editing.offset);
				// }else if(editing.type === "recovering"){
				// 	contractRecoverSBT(editing.address , editing.offset);
				// }
			} }
			onCancel = { () => {
				
				setFields({ editing : null });
			} }
			
			okText = { i18n("confirm") }
		>
			<InputNumber
				value = { editing?.offset }
				onChange = { (value) => {
					setEditing({
						offset : value ,
					});
				} }
			/>
		</Modal>
		<Modal
			title = { {
				"revocating" : i18n("Revocation") ,
				"recovering" : i18n("Recover") ,
			}[store_SBT_revocation.editing?.type] }
			footer = { null }
			open = { store_SBT_revocation.isShowModal }
			style = { {
				boxSizing : 'border-box' ,
				padding : '32px' ,
				
			} }
		>
			<p>
				{ store_SBT_revocation.editing?.type === 'revocating' ? 'Revoke the number of SBTs owned by the current address' : 'Recover the number of SBTs that were revoked' }
			</p>
			<Space
				direction = "vertical"
				style = { { width : '100%' } }
			>
				<XButton
					type = { 'primary' }
					style = { {
						width : '100%' ,
						height : '48px' ,
					} }
					loading = { store_SBT_revocation.pending }
					onClick = { () => {
						if( store_SBT_revocation.editing?.type === "revocating" ) {
							contractRevokeSBT(editing.address , editing.offset);
						} else if( store_SBT_revocation.editing?.type === "recovering" ) {
							contractRecoverSBT(editing.address , editing.offset);
						}
					} }
				>
					Confirm
				</XButton>
				<XButton
					type = { 'secondary' }
					style = { {
						width : '100%' ,
						height : '48px' ,
					} }
					onClick = { () => {
						if( store_SBT_revocation.pending ) return;
						showModal(false);
						
					} }
				>
					Cancel
				</XButton>
			</Space>
		</Modal>
	</>;
});


export const DetailTable = reaxper((props) => {
	const {
		store_SBT_revocation,
		setFields,
		revocation_list,
	} = reaxel__SBT_revocation();
	const [ , { spaceID , SBTID } ] = utils.makePair(toolkits.useRouter().params , ({ spaceID , SBTID }) => {
		return {
			spaceID : parseInt(spaceID) ,
			SBTID : parseInt(SBTID) ,
		};
	});
	
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
		// {
		// 	title : 'Offset' ,
		// 	render : (text , record , index) => {
		// 		const { Button } = antd;
		// 		const done = () => {
		// 			if( record.modifiedOffset + record.remainder < 0 ) {
		// 				offset_row_value(record.address , - record.remainder);
		// 			}
		// 			switch_row_editable(false , record.address);
		// 		};
		// 		if( record.editing ) {
		// 			return <div>
		// 				<div className = { less.amountSection }>
		// 					<InputNumber
		// 						onPressEnter = { done }
		// 						onChange = { (value) => {
		// 							offset_row_value(record.address , value);
		// 						} }
		// 						value = { record.modifiedOffset }
		// 						controls = { { upIcon : <SVGSBTCountUp /> , downIcon : <SVGSBTCountDown /> } }
		// 					/>
		// 					<TableActionBtn
		// 						onClick = { done }
		// 						text = { i18n("Done") }
		// 						type = "primary"
		// 					/>
		// 				</div>
		// 			</div>;
		// 		} else {
		// 			return (
		// 				<span>{ record.modifiedOffset }</span>
		// 			);
		// 		}
		// 	} ,
		// } ,
		{
			title : 'ACTION' ,
			render : (text , record , index) => {
				const { Button } = antd;
				return (
					<div className = { less.actionSection }>
						<TableActionBtn
							onClick = { () => {
								setFields({
									editing : {
										type : "revocating" ,
										offset : 0 ,
										address : record.address ,
									} ,
								});
							} }
							text = { i18n("revoke") }
							type = "link"
						/>
						<TableActionBtn
							text = { i18n("recover") }
							type = "link"
							onClick = { () => {
								setFields({
									editing : {
										type : "recovering" ,
										offset : 0 ,
										address : record.address ,
									} ,
								});
							} }
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
					dataSource = { revocation_list }
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


import { reaxel__SBT_revocation } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Revocation/reaxel--SBT-revocation';
import { SearchBar } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Revocation/SearchBar.component';
import {
	SVGSBTCountDown ,
	SVGSBTCountUp ,
} from "@@SVGcomponents";
import less from '@@pages/Plugin-SBT-Settings/index.module.less';
