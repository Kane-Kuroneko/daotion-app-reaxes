export const MerchantMgntDetail = reaxper(() => {
	
	const { mchNo } = utils.decodeQueryString();
	const { closFetchMchDetail , cleanMchDetailDeps , pending , state , reset } = reaxel_mch_mgnt_detail();
	
	closFetchMchDetail(() => [mchNo])(mchNo);
	
	useEffect(() => {
		return () => {
			cleanMchDetailDeps();
			reset();
		}
	} , []);
	
	
	const { Divider , Result } = antd;
	if(!mchNo){
		return <Result status = { 404 } />;
	}
	if(pending){
		return <span>loading...</span>;
	}
	
	return (
		<div className = { less.mchDetailContainer }>
			<h3 className = { less.mchInfo }>商户信息</h3>
			<div className = { less.infoContainer }>
				<div>
					商户名称：
					<span className = { less.text }>付小小</span>
				</div>
				<div>
					Telegram：
					<span className = { less.text }>1810000000</span>
				</div>
				<div>
					创建时间：
					<span className = { less.text }>2022-10-15 22:16:05</span>
				</div>
				<div>
					商户ID：
					<span className = { less.text }>9d39B4f1</span>
				</div>
			</div>
			<Divider />
			<h3 className = { less.mchInfo }>账户信息</h3>
			<div className = { less.infoContainer }>
				<div className = { less.copyRow }>
					商户key：
					<span className = { less.text }>143c4f46240f4e4db07e750cbbf17123</span>
					<SVGCopyBtn />
				</div>
				<div>
					入金手续费率：
					<span className = { less.text }>0.1%</span>
				</div>
				<div className = { less.whiteList }>
					IP白名单：
					<span className = { less.text }>
						{ [ '192.168.0.0' , '192.168.0.1' , '192.168.0.2' ].map((item) => {
							return (
								<p key = { item }>{ item }</p>
							);
						}) }
					</span>
				</div>
				<div className = { less.copyRow }>
					提现TRC-20地址：
					<span className = { less.text }>TF46jFVY4nuxTEdk9t7K4qzC3RA5ZQ49u6</span>
					<SVGCopyBtn />
				</div>
				<div>
					出金手续费率：
					<span className = { less.text }>0.1%</span>
				</div>
				<div>
					代收回调url：
					<span className = { less.text }>https://www.test.com</span>
				</div>
				<div>
					入金交易固定费：
					<span className = { less.text }>1.00$</span>
				</div>
				<div>
					代付回调url：
					<span className = { less.text }>https://www.test.com</span>
				</div>
				<div>
					出金交易固定费：
					<span className = { less.text }>1.00$</span>
				</div>
			</div>
		</div>
	);
});

import { reaxel_mch_mgnt_detail } from './reaxel--mch-mgnt-detail';
import { SVGCopyBtn } from '@@SVGcomponents';
import less from './index.module.less';
