export const reaxel_new_payment = (function () {
	const initialState = {
		pending: false,
		currentPattern: 'pix',
		pix_code: '',
		payment_amount: '',
		bank_name: '',
		bank_card_num: '',
		holder_name: '',

		max_payment_amount: null,
	};

	const initiatePayment = async () => {
		return request_initiate_payment(async function () {
			return {
				pix: {
					method: 1,
					pixCode: store.pix_code,
				},
				bank: {
					method: 2,
				},
			}[store.currentPattern];
		}).catch((e) => {
			if(e.code === 4100){
				throw new Error('错误的pix支付码!');
			}
		});
	};

	const { store, setState } = orzMobx(initialState);

	return () => {
		return {
			get state() {
				return store;
			},
			get setFields() {
				return setState;
			},
			async fetchNewPayment() {
				if (!store.pix_code) {
					throw new Error('请输入有效的pix码');
				}
				return initiatePayment();
			},
			resetDeps(){
				
			},
			resetState() {
				setState(initialState);
			},
		};
	};
})();

import { request_initiate_payment } from '@@requests';
