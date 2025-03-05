export const reaxel_create_space = function(){
	let ret;
	const { Modal } = antd;
	const initialState = {
		visible : false ,
		modal_showing : false ,
		input_space_name : '' ,
		select_types : [] ,
		select_network : null ,
		input_email : null ,
		/*是否正在创建 , 冻结输入元素*/
		creating : false ,
	};
	const { store , setState } = orzMobx(initialState);
	
	const { invokeContract } = Reaxel_fact__contract(SpaceFactoryAddress , SpaceFactoryAbi , (contractWithSigner) => contractWithSigner.createDAO)();
	
	const create_space = async () => {
		const reax_wallet = reaxel_wallet();
		const reax_user = reaxel_user();
		
		const fetch_space_ID = async () => {
			setState({ creating : true });
			const address = reax_wallet.account.address;
			
			const createPayload = async () => {
				const data = {
					name : store.input_space_name ,
					tags : store.select_types.join(',') ,
					email : store.input_email ,
					/*当前用户地址*/
					createAddress : address ,
					timestamp : await request_server_timestamp() ,
				};
				return {
					address ,
					data : data ,
					signature : await reax_user.signByFakeWallet(data) ,
				};
			};
			return request_create_space(createPayload);
		};
		
		const contract_create = async (spaceID : number) => {
			setState({ creating : true });
			const spaceName = store.input_space_name;
			return invokeContract(spaceID , spaceName , "desciption").then(() => {
				Modal.success({ title : "transaction success !" });
				setState(initialState);
			}).catch((e) => {
				console.error(e);
				ret.setCreateModalVisible(true);
				Modal.error({
					title : e.toString() ,
				});
			});
		};
		
		try {
			if( !reax_wallet.account ) {
				ret.setCreateModalVisible(false);
				await reax_wallet.connectWallet();
				ret.setCreateModalVisible(true);
			}
			const spaceID = await fetch_space_ID();
			await contract_create( spaceID );
			ret.setCreateModalVisible( false );
			update_space_list( spaceID );
		} catch ( e ) {
			console.error( e );
			Modal.error( {
				title : e.toString() ,
			} );
		}finally {
			setState( { creating : false  } );
		}
	};
	
	const validations = {
		input_space_name : () => {
			return true;
			/*暂时不对space-name做限制 , beta阶段出问题再限制*/
		} ,
		input_email_address : (address : string) => {
			return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(address);
		} ,
	};
	
	return () => {
		return ret = {
			get store(){
				return store;
			} ,
			setCreateModalVisible : (visible : boolean) => setState({ visible }) ,
			CreateSpaceModal : reaxper(class extends Reaxlass {
				
				render(){
					const {
						Form ,
						Modal ,
						Button ,
						Input ,
						Select ,
					} = antd;
					const {
						language ,
						changeLang ,
					} = reaxel_i18n();
					return <>
						<Modal
							open = { store.visible }
							// visible = { true }
							centered
							maskClosable
							closeIcon = { <SVGModalCloseIcon /> }
							mask = { true }
							className = { less.antdCreateSpaceModal }
							onCancel = { () => setState({ visible : false }) }
							footer = { <>
								<Button
									type = { "primary" }
									loading = { store.creating }
									className = { less.createSpaceBtn }
									onClick = { () => {
										if( !validations.input_email_address(store.input_email) ) {
											return;
										}
										if( !validations.input_space_name() ) {
											return;
										}
										create_space();
									} }
								>
									{ store.creating ? <I18n>
										Creating...
									</I18n> : <I18n>
										Create
									</I18n> }
								</Button>
							</> }
							width = "596px"
							maskStyle = { {
								background : "#f4f4f4" ,
							} }
						>
							<div
								className = { less.modalContent }
								style = { {
									height : "fit-content" ,
								} }
							>
								<h1 className = { less.mainTitle }>
									<I18n>
										Create your Space
									</I18n>
								</h1>
								<h5 className = { less.decTitle }>
									<I18n>
										Create your own organization in a few minutes!
									</I18n>
								</h5>
								<h3 className = { less.subTitle }>
									<I18n>
										Space Information
									</I18n>
								</h3>
								<div className = { less.formList }>
									<div className = { less.formItem }>
										<p>
											<I18n>
												Name
											</I18n>
										</p>
										<XInput
											disabled = { store.creating }
											type = "primary"
											placeholder = { i18n("Name your Space") }
											value = { store.input_space_name }
											onChange = { (e) => {
												setState({
													input_space_name : e.target.value ,
												});
											} }
										/>
									</div>
									<div className = { less.formItem }>
										<p
											style = { {
												display : "flex" ,
												justifyContent : "space-between" ,
											} }
										>
											<span>
												<I18n>
													Type
												</I18n>
											</span>
											<span
												style = { {
													color : "#b1b5c3" ,
													fontWeight : "normal" ,
												} }
											>
												<span style = { { color : "#313436" } }>{ store.select_types.length }</span>
												/3
											</span>
										</p>
										<XSelect
											type = "primary"
											disabled = { store.creating }
											suffixIcon = { <SVGSelectArrowIcon /> }
											mode = "tags"
											dropdownMatchSelectWidth = { true }
											placeholder = { i18n("Please select") }
											value = { store.select_types }
											onChange = { (selectedTypes) => {
												if( selectedTypes.length < 4 ) {
													setState({
														select_types : selectedTypes ,
													});
												}
											} }
										>
											{ spaceTags.filter((text) => !store.select_types.includes(text)).
											map((text) => <Select.Option key = { text }>{ text }</Select.Option>) }
										</XSelect>
									</div>
									<div className = { less.formItem }>
										<div className = { less.titleWrp }>
											<p>
												<I18n>
													Network
												</I18n></p>
										</div>
										<Select
											disabled = { store.creating }
											suffixIcon = { <SVGSelectArrowIcon /> }
											defaultValue = "Ethereum"
											className = { less.antdNetSelect }
											dropdownClassName = { less.dropDownMenu }
										>
											<Select.Option value = "Ethereum">
												<OptionNetEthereum />
											</Select.Option>
										</Select>
									</div>
									<div className = { less.formItem }>
										<p>
											<I18n>
												Email
											</I18n>
										</p>
										<XInput
											disabled = { store.creating }
											type = "primary"
											placeholder = { i18n("Enter your email") }
											value = { store.input_email }
											onChange = { (e) => {
												setState({ input_email : e.target.value });
											} }
										/>
										{ (
											!validations.input_email_address(store.input_email) && store.input_email
										) && <p
											style = { {
												color : "red" ,
												fontWeight : "normal" ,
											} }
										>
											<I18n>email address is not valid</I18n>
										</p> }
									</div>
								</div>
							</div>
						</Modal>
					</>;
				}
			}) ,
		};
	};
}();

const update_space_list = async (spaceID : number) => {
	const { result } = await request.post<{ result : boolean }>('/space/query-space-created' , {
		body : async () => {
			return {
				spaceID ,
			};
		} ,
	});
	
	if( result ) {
		const { reset_fetch_state , deduped_fetch_all_space_list } = reaxel_space_list();
		const { fetchUpdate_joined_space_list } = reaxel_joined_Space_list();
		reset_fetch_state();
		deduped_fetch_all_space_list();
		fetchUpdate_joined_space_list();
	} else {
		console.log(result);
	}
	
	
};


export const OptionNetEthereum = reaxper(() => {
	return <>
		<span className = { less.netEthereum }>
			<SVGModalNetEthereum />
			Ethereum
		</span>
	</>;
});


import {
	reaxel_i18n ,
	reaxel_joined_Space_list ,
	reaxel_space_list ,
	reaxel_user ,
	reaxel_wallet ,
} from '@@reaxels';
import { Reaxel_fact__contract } from '@@reaxels/Reaxel-Factories';

import spaceTags from '@@public/space-tags.json';
import { SpaceFactoryAbi } from '@@public/contract/abi';
import { SpaceFactoryAddress } from '@@public/contract/address';
import {
	request_create_space ,
	request_server_timestamp ,
} from '@@requests';
import { ethers } from 'ethers';
import { XInput } from '@@pages/Test/dxz-input';
import { XSelect } from '@@pages/Test/dxz-select';
import { SVGSelectArrowIcon } from '@@SVGcomponents/space-setting-svg';
import {
	SVGModalCloseIcon ,
	SVGModalNetEthereum ,
} from '@@SVGcomponents';
import less from '../../styles/reaxels.module.less';
