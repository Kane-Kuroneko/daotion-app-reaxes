import { reaxel_cashier } from './reaxel--cashier';
import { reaxel_i18n } from '@@reaxels';
export const Cashier = reaxper(() => {
	const { getTradeID , fetchCashier } = reaxel_cashier();
	
	const { changeLang , language } = reaxel_i18n();
	
	const tradeID = getTradeID();
	
	if(!tradeID){
		return <div className={less.cashierContainer}>
			<CashierSkeleton/>
		</div>
	}

	fetchCashier(tradeID);
	
	return(
		<div className={less.cashierContainer}>
			<div className={less.transform}>
				<button
					className={less.transformBtn}
					onClick={() => changeLang('zh-CN')}>
					中文
				</button>
				<button
					className={less.transformBtn}
					onClick={() => changeLang('pt-BR')}>
					葡萄牙语
				</button>
			</div>
			<div className={less.header}>
			</div>
			
			<div className={less.amount}>
				<span className={less.time}>
					<I18n>
						交易剩余时间
					</I18n>
					<span> 14:59</span>
				</span>
				<span className={less.number}>
					<span className={less.unit}>R$</span>
					1,200.00
				</span>
			</div>
			
			<div className={less.transactionDetail}>
				<div className={less.orderId}>
					<span className={less.orderIdTitle}>
						<I18n>
							订单号
						</I18n>
						<span>：</span>
					</span>
					<span className={less.idText}>
						S110202210201582938395192283136
					</span>
				</div>
				<DefaultInfo/>
				{/*<PaymentSuccess/>*/}
				{/*<PaymentError/>*/}
				{/*<PaymentCanceled/>*/}
			</div>
		</div>
	)
})

export const DefaultInfo = reaxper(() =>{
	const { ctc } = reaxel_cashier();
	const { Toast } = antm;
	return (
		<div className = { less.defaultInfoContainer }>
			<span className = { less.textInfo }>
				<I18n>
					请打开您的支付应用程序并扫描下方二维码进行支付或复制下方的 Pix 码并粘贴到您的支付应用程序中以完成购买。
				</I18n>
			</span>
			<img
				className = { less.qrCode }
				src = { cashier_QRcode }
			/>
			<button
				className = { less.btn }
				onClick = { () => {
					ctc('我是你爹').then(() => {
						antm.Toast.show({
							icon:"success",
							content : i18n("已复制") ,
						});
					}).catch((e) => {
						antm.Toast.show({
							icon:"fail",
							content : i18n("复制失败，请手动选中复制") ,
						});
					});
				} }
			>
				<div
					style = { {
						flex : 1 ,
					} }
				></div>
				<span style = { { flex : 10 } }>
					<I18n>
						复制Pix代码
					</I18n>
				</span>
				<SVGCopyBtn />
			</button>
		</div>
	);
})

export const Copyed = reaxper(() => {
	return(
		<div className={less.copyed}>
			<SVGIconCopySuccess/>
			<span className={less.copyedText}>
				<I18n>
					已复制
				</I18n>
			</span>
		</div>
	)
})

export const PaymentSuccess = reaxper(() => {
	return(
		<div className={less.resultContainer}>
			<SVGIconSuccess/>
			<span className={less.resultText}>
				<I18n>
					付款成功完成
				</I18n>
			</span>
		</div>
	)
})

export const PaymentError = reaxper(() =>{
	return(
		<div className={less.resultContainer}>
			<SVGIconError/>
			<span className={less.resultText}>
				<I18n>
					错误信息代码
				</I18n>
			</span>
		</div>
	)
})

export const PaymentCanceled = reaxper(() =>{
	return(
		<div className={less.resultContainer}>
			<SVGIconCancel/>
			<span className={less.resultText}>
				<I18n>
					支付超时，订单已取消
				</I18n>
			</span>
		</div>
	)
})


export const CashierSkeleton = reaxper(() =>{
	
	const {Skeleton} = antm
	
	return<div style={{
		display: "flex",
		flexDirection: "column",
		alignItems:"center",
		width: '100%'
	}}>
		<Skeleton style={{width: '137rem', height: '24rem', marginBottom: '6rem', marginTop: '24rem'}} animated/>
		<Skeleton style={{width: '242rem', height: '35rem', marginBottom: '32rem'}} animated/>
		<Skeleton style={{width: '100%', height: '20rem', marginBottom: '12rem'}} animated/>
		<div style={{
			display: "flex",
			width: '100%'
		}}>
			<Skeleton.Paragraph style={{width: '100%'}} animated/>
		</div>
		<Skeleton style={{width: '240rem', height: '240rem', marginTop: '12rem'}} animated/>
		<Skeleton style={{width: '343rem', height: '48rem', marginTop: '24rem', borderRadius: '12rem'}} animated/>
	</div>
})

import less from './index.module.less'
import cashier_QRcode from '@@public/statics/cashier-QRcode.png'
import {
	SVGCopyBtn ,
	SVGDepayLogo ,
	SVGIconCancel ,
	SVGIconCopySuccess ,
	SVGIconError ,
	SVGIconSuccess ,
} from "@@SVGcomponents";
