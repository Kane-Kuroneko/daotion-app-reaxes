export const Routing = reaxper((props) => {
	
	return <BrowserRouter>
		<Routes>
			<Route
				path = "*"
				element = { <Cashier/> }
			/>
		</Routes>
	</BrowserRouter>;
});


import { Cashier } from '@@pages/Cashier';
import {
	BrowserRouter ,
	Navigate ,
	Route ,
	Routes ,
} from 'react-router-dom';
