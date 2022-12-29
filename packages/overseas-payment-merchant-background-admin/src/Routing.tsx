
export const Routing = reaxper((props) => {
	
	return <BrowserRouter>
		<Routes>
			<Route
				path = "login"
				element = { <Login/> }
			/>
			<Route
				path = 'test'
				element={<TestRender/>}
			/>
			<Route
				path="*"
				element={<Layout/>}
			/>
			
		</Routes>
	</BrowserRouter>;
});


export const MainContentRouting = reaxper(() => {
	
	return <Routes>
		<Route path = "*">
			<Route
				index
				element = { <Navigate to = { '/overview' } /> }
			/>
			<Route
				path = "overview"
			>
				<Route
					index
					element = { toolkits.withOutlet(<HomePage />) }
				/>
				<Route
					path = "fin-detail"
					element = { toolkits.withOutlet(<FinancialDetails />) }
				/>
				<Route
					path = "withdraw"
					element = { toolkits.withOutlet(<OverviewWithdraw />) }
				/>
				<Route
					path = "deposit"
					element = { toolkits.withOutlet(<OverviewDeposit />) }
				/>
			</Route>
			
			<Route
				path = "profile/*"
				element = { toolkits.withOutlet(<Profile />) }
			/>
			<Route
				path = "collection-order"
				element = { toolkits.withOutlet(<CollectionOrder />) }
			/>
			{/*目前代收订单为多态组件, 已将代付和提现订单功能抽象 */}
			<Route
				path = "payment-order"
				element = { toolkits.withOutlet(<PaymentOrder />) }
			/>
			<Route
				path = "withdrawal-order"
				element = { toolkits.withOutlet(<WithdrawalOrder />) }
			/>
			<Route
				path = "deposit-order"
				element = { toolkits.withOutlet(<DepositOrder />) }
			/>
			<Route
				path = "ops-record"
				element = { toolkits.withOutlet(<OpsRecord />) }
			/>
			<Route
				path= "payment-mgnt/*"
			>
				<Route
					index
					element = { toolkits.withOutlet(<PayoutManagement />) }
				/>
				<Route
					path = "new-payment"
					element = { toolkits.withOutlet(<NewPayment />) }
				/>
			</Route>
			<Route
				path = "api-doc"
				element = { toolkits.withOutlet(<ApiDoc />) }
			/>
		</Route>
	</Routes>;
});

export const ProfileRouting = reaxper(() => {
	
	return <Routes>
		<Route
			path="*"
		>
			<Route index element={<Navigate to="base-info"/>}/>
			<Route path="base-info" element={<ProfileInfo/>}/>
			<Route path="reset-pwd" element={<ResetPwd/>}/>
			<Route path="API" element={<ProfileApi/>}/>
		</Route>
	</Routes>
})

import { reaxel_user_auth } from '@@reaxels';
import  { ResetPwd, ProfileInfo, ProfileApi } from '@@pages/Profile/components'
import { Login } from '@@pages/Auth';
import { Profile } from '@@pages/Profile';
import { HomePage} from '@@pages/Overview';
import { FinancialDetails } from '@@pages/Fin-Detail'
import { OverviewWithdraw } from '@@pages/Withdraw-Apply'
import { OverviewDeposit } from '@@pages/Deposit-Apply'
import { CollectionOrder } from '@@pages/Collection-Order';
import { PaymentOrder } from '@@pages/Payment-Order';
import { WithdrawalOrder } from '@@pages/Withdrawal-Order';
import { DepositOrder } from '@@pages/Deposit-Order';
import { OpsRecord } from '@@pages/Ops-Record';
import { PayoutManagement } from '@@pages/Payment-Mgnt';
import { Layout } from './Layout';
import { NewPayment } from "@@pages/--Components--/New-Payment";
import { TestRender } from '@@pages/test'
import { ApiDoc } from '@@pages/Api-Doc'
import {
	BrowserRouter ,
	Navigate ,
	Route ,
	Routes ,
} from 'react-router-dom';
