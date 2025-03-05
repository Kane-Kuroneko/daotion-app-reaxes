export const CollectionOrder = reaxper(() => {
	const path = toolkits.useRouter().params['*'];
	const {
		resetSearch ,
		state$search ,
		setFields ,
		fetchCollectionOrderList ,
	} = reaxel_collection_order(path);
	
	fetchCollectionOrderList(path);
	
	useEffect(() => {
		resetSearch();
	} , [path]);
	
	return <>
		<OrderInfoSearch />
		<OrderInfoTable />
		<OrderProcess/>
	</>
});


export const OrderInfoSearch = reaxper(() => {
	const path = toolkits.useRouter().params['*'];
	
	const {
		resetSearch ,
		state$search ,
		collection_order_list,
		setFields ,
		get_enum_order_list_map ,
	} = reaxel_collection_order(path);
	
	const enum_order_status = get_enum_order_list_map(path);
	
	const { Input , Form , Select , Button , Col} = antd;
	const { RangePicker } = DatePicker;
	return (
		<ConfigProvider
		>
			<div className = { less.searchContainer }>
				<Form
					layout = "inline"
					style={{
						width: '100%'
					}}
				>
					<Col flex={1}>
						<Form.Item
							label = { '搜索订单' }
						>
							<Input
								value = { state$search.input_search_orderID }
								onChange = { (e) => {
									setFields({ input_search_orderID : e.target.value });
								} }
								placeholder = { '订单ID' }
							/>
						</Form.Item>
					</Col>
					{ __EXPERIMENTAL__ && <Form.Item
						label = { '订单创建时间' }
					>
						{/*@ts-ignore*/ }
						<RangePicker 
							showTime
							onChange = { ([ start , end ]) => {
								setFields({
									range_picker_order_created_date : [
										utils.dayjs(start).tz('America/Sao_Paulo') ,
										utils.dayjs(end).tz('America/Sao_Paulo') ,
									] ,
								});
							} }
							value = { function(){
								if( !state$search.range_picker_order_created_date.length ) return [] as any;
								const [ start , end ] = state$search.range_picker_order_created_date;
								return [ start.tz('America/Sao_Paulo') , start.tz('America/Sao_Paulo') ];
							}() }
						/>
					</Form.Item> }
					{ __EXPERIMENTAL__ && <Form.Item
						label = { '订单更新时间' }
					>
						{/*@ts-ignore*/ }
						<RangePicker value = { [ null , null ] } />
					</Form.Item> }
					<Col flex={1}>
						<Form.Item
							label = { '订单状态' }
						>
							<Select
								placeholder = { '选择状态' }
								onChange = { (value, option) => {
									setFields({select_order_status : value})
								} }
								style = { { minWidth : "120px" } }
								value = { state$search.select_order_status }
							>
								{ enum_order_status.map(({ label , status }) => {
									return <Select.Option
										key = { status }
										value = { status }
									>
										{ label }
									</Select.Option>;
								}) }
							</Select>
						</Form.Item>
					</Col>
					
					<Col>
						<Form.Item style={{
							marginRight: 0
						}}>
							<Button onClick = { () => resetSearch() }>
								重置
							</Button>
						</Form.Item>
					</Col>
				</Form>
			</div>
		</ConfigProvider>
	);
});

export const OrderInfoTable = reaxper(() => {
	const path = toolkits.useRouter().params['*'];
	const { get_enum_order_list_map , collection_order_list,pending, changeModalShow } = reaxel_collection_order(path);
	const enum_order_status = get_enum_order_list_map(path);
	const columns : ColumnsType<DataType> = [
		{
			title : '订单号' ,
			dataIndex : 'orderID' ,
			fixed : 'left' ,
			render : (_ , { orderID }) => {
				return (
					<a onClick={() => {changeModalShow(true)}}>{ orderID }</a>
				);
			} ,
		} ,
		{
			title : '订单金额' ,
			dataIndex : 'money' ,
		} ,
		{
			title : '订单状态' ,
			dataIndex : 'state' ,
			render : (text) => {
				const colorMap = {
					
					1 : "blue" ,
					2 : "gainsboro" ,
					3 : "red" ,
					4 : "green" ,
				};
				
				return <>
					<Tag color = { colorMap[text] }>
						{ enum_order_status.find(({status}) => {
							return status === text;
						}).label }
					</Tag>
				</>;
			} ,
		} ,
		{
			title : '商户/ID' ,
			dataIndex : 'mchName' ,
		} ,
		...((path === 'collection-order' || path ==='payment-order') ? [{
			title : '手续费' ,
			dataIndex : 'tax' ,
		} ] : []),
		...(path === 'deposit-order' ? [
			{
				title : '充值USDT数量' ,
				dataIndex : 'usdt' ,
			} ,
			{
				title : '付款地址' ,
				dataIndex : 'sourceAddress' ,
				width : 300,
				
			} ,
			{
				title : 'RainPay收款地址' ,
				dataIndex : 'targetAddress' ,
				width : 300,
				
			} ,
		] : []),
		{
			title : '订单创建时间' ,
			dataIndex : 'createTimestamp' ,
			render(value){
				return <Timezone
					format
					unix
				>{value}</Timezone>
			} ,
		} ,
		{
			title : '订单更新时间' ,
			dataIndex : 'updateTimestamp' ,
			render(value){
				if(!value){
					return 'N/A';
				}
				return <Timezone
					format
					unix
				>{value}</Timezone>;
			} ,
		} ,
	];
	const { Table , Tag } = antd;
	return (
		<div className = { less.tableContainer }>
			<div className = { less.tableHeader }>
				数据明细
			</div>
			<Table
				rowKey = "orderID"
				loading = { pending }
				columns = { columns }
				dataSource = { collection_order_list }
				size = "small"
				pagination = { {
					pageSize : 10 ,
				} }
				scroll = { {
					x : 1000 ,
				} }
			/>
		</div>
	);
	interface DataType {
		// key : number;
		orderID : string;
		money : number;
		state : number;
		userName : string;
		tax : number;
		createTimestamp : number;
		updateTimestamp : number;
	}
});

export const OrderProcess = reaxper(() => {
	const path = toolkits.useRouter().params['*'];
	const { Steps, Modal } = antd;
	
	const { Step } = Steps;
	
	const reax_Collection_Order = reaxel_collection_order(path);
	
	return (
		<Modal
			className={less.processingModal}
			visible={reax_Collection_Order.processModalShow}
			closable={false}
			footer={false}>
			<div className = { less.orderProcessTitle }>
				<span>
					订单进度
				</span>
				<div
					className={less.closeBtn}
					onClick={() => {
						reax_Collection_Order.changeModalShow(false)
					}}
				>
					<SVGOrderCloseBtn/>
				</div>
			</div>
			<Steps
				progressDot = { true }
				current = { 1 }
				direction = "vertical"
			>
				<Step
					title = { '待支付' }
					description = { '2022-10-17 22:59' }
				/>
				<Step
					title = { '已支付' }
					description = { '2022-10-18 15:27' }
				/>
				{/*<Step*/}
				{/*	title = { '支付失败' }*/}
				{/*	description = { '2022-10-18 15:27' }*/}
				{/*/>*/}
			</Steps>
		</Modal>
	);
});


import {
	timezone ,
	Timezone ,
	reaxel_timezone,
} from '@@reaxels';
import { reaxel_collection_order } from './reaxel--collection-order';
import { DatePicker } from '@@Xcomponents';
import { time_localize_Brazil } from '#toolkits/overseas-payment';
import {ConfigProvider} from 'antd';
import { ColumnsType } from "antd/es/table";
import {
	SVGOrderCloseBtn,
} from '@@SVGcomponents';
import less from "./index.module.less";
