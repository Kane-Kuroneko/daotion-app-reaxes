import less from './index.module.less';
import { Button } from 'antd';

export const DxzConnectWalletPopup = () => {
	return <>
		<body
			style = { {
				background : "#f4f5f6" ,
				display : "flex" ,
				justifyContent : "flex-start" ,
				padding : "30px" ,
			} }
		>
			<div
				className = "select-wallet"
				style = { {
					padding : "32px" ,
					borderRadius : "20px" ,
					backgroundColor : "#ffffff" ,
					width : "480px" ,
					height : "fit-content" ,
					boxShadow : '0px 64px 64px -48px rgba(31, 47, 70, 0.12)' ,
				} }
			>
				<h1
					style = { {
						display : "flex" ,
						alignItems : 'center' ,
						justifyContent : "space-between" ,
						fontWeight : '700' ,
						fontSize : '32px' ,
						lineHeight : '40px' ,
					} }
				>
					<span
					>Connect wallet
					</span>
					<svg
						width = "40"
						height = "40"
						viewBox = "0 0 40 40"
						fill = "none"
						xmlns = "http://www.w3.org/2000/svg"
					>
						<path
							fillRule = "evenodd"
							clipRule = "evenodd"
							d = "M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
							fill = "#23262F"
						/>
						<rect
							x = "1"
							y = "1"
							width = "38"
							height = "38"
							rx = "19"
							stroke = "#E6E8EC"
							strokeWidth = "2"
						/>
					</svg>
				</h1>
				<p
					style = { {
						margin : "32px 0" ,
						fontWeight : '400' ,
						fontSize : "18px" ,
						color : "#777e91" ,
						lineHeight : '26px' ,
					} }
				>Choose how you want to connect. There are several wallet providers.
				</p>
				<div className = "wallet-box">
					<span
						className = "list-name"
						style = { {
							marginBottom : "10px" ,
							color : "#777e91" ,
							fontSize : "14px" ,
							fontWeight : '600' ,
							lineHeight : "28px" ,
						} }
					>Popular
					</span>
					<ul
						className = "wallet-lists"
						style = { {
							padding : "0" ,
						} }
					>
						<li
							className = { less.walletItem }
							style = { {
								border : "1px solid #e6e8ec" ,
								borderRadius : "16px" ,
								width : "100%" ,
								display : "flex" ,
								alignItems : "center" ,
								justifyContent : "flex-start" ,
								flexFlow : "row nowrap" ,
								padding : "12px 20px" ,
							} }
						>
							<svg
								width = "32"
								height = "32"
								viewBox = "0 0 32 32"
								fill = "none"
								xmlns = "http://www.w3.org/2000/svg"
							>
								<path
									d = "M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
									fill = "#FCEAE7"
								/>
								<path
									d = "M23.3954 7.89323L16.7319 12.901L17.9642 9.9465L23.3954 7.89323Z"
									fill = "#E2761B"
									stroke = "#E2761B"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M8.0127 7.89323L14.6226 12.9485L13.4507 9.9465L8.0127 7.89323Z"
									fill = "#E4761B"
									stroke = "#E4761B"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M20.9983 19.5015L19.2236 22.2526L23.0208 23.3099L24.1125 19.5624L20.9983 19.5015Z"
									fill = "#E4761B"
									stroke = "#E4761B"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M7.30908 19.5624L8.39398 23.3099L12.1912 22.2526L10.4165 19.5015L7.30908 19.5624Z"
									fill = "#E4761B"
									stroke = "#E4761B"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M11.9771 14.8528L10.9189 16.4724L14.6894 16.6418L14.5554 12.542L11.9771 14.8528Z"
									fill = "#E4761B"
									stroke = "#E4761B"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M19.4308 14.8527L16.819 12.4945L16.7319 16.6417L20.4957 16.4723L19.4308 14.8527Z"
									fill = "#E4761B"
									stroke = "#E4761B"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M12.1914 22.2526L14.455 21.1346L12.4995 19.5895L12.1914 22.2526Z"
									fill = "#E4761B"
									stroke = "#E4761B"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M16.9531 21.1346L19.2234 22.2526L18.9087 19.5895L16.9531 21.1346Z"
									fill = "#E4761B"
									stroke = "#E4761B"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M19.2229 22.2525L16.9526 21.1344L17.1335 22.632L17.1134 23.2622L19.2229 22.2525Z"
									fill = "#D7C1B3"
									stroke = "#D7C1B3"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M12.1914 22.2525L14.301 23.2622L14.2876 22.632L14.455 21.1344L12.1914 22.2525Z"
									fill = "#D7C1B3"
									stroke = "#D7C1B3"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M14.3344 18.6002L12.4458 18.0377L13.7785 17.4211L14.3344 18.6002Z"
									fill = "#233447"
									stroke = "#233447"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M17.0728 18.6002L17.6286 17.4211L18.968 18.0377L17.0728 18.6002Z"
									fill = "#233447"
									stroke = "#233447"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M12.1912 22.2526L12.5127 19.5015L10.4165 19.5624L12.1912 22.2526Z"
									fill = "#CD6116"
									stroke = "#CD6116"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M18.9009 19.5015L19.2223 22.2526L20.9971 19.5624L18.9009 19.5015Z"
									fill = "#CD6116"
									stroke = "#CD6116"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M20.4951 16.4723L16.7314 16.6417L17.0797 18.6001L17.6355 17.421L18.9749 18.0377L20.4951 16.4723Z"
									fill = "#CD6116"
									stroke = "#CD6116"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M12.4449 18.0377L13.7843 17.421L14.3334 18.6001L14.6884 16.6417L10.918 16.4723L12.4449 18.0377Z"
									fill = "#CD6116"
									stroke = "#CD6116"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M10.9189 16.4723L12.4994 19.5895L12.4458 18.0377L10.9189 16.4723Z"
									fill = "#E4751F"
									stroke = "#E4751F"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M18.9752 18.0377L18.9082 19.5895L20.4954 16.4723L18.9752 18.0377Z"
									fill = "#E4751F"
									stroke = "#E4751F"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M14.6894 16.6418L14.3345 18.6002L14.7765 20.9109L14.8769 17.8683L14.6894 16.6418Z"
									fill = "#E4751F"
									stroke = "#E4751F"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M16.7316 16.6418L16.5508 17.8615L16.6311 20.9109L17.0798 18.6002L16.7316 16.6418Z"
									fill = "#E4751F"
									stroke = "#E4751F"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M17.0805 18.6002L16.6318 20.911L16.9533 21.1346L18.9088 19.5896L18.9758 18.0378L17.0805 18.6002Z"
									fill = "#F6851B"
									stroke = "#F6851B"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M12.4458 18.0378L12.4994 19.5896L14.4549 21.1346L14.7764 20.911L14.3344 18.6002L12.4458 18.0378Z"
									fill = "#F6851B"
									stroke = "#F6851B"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M17.1137 23.2623L17.1338 22.6321L16.9664 22.483H14.4416L14.2876 22.6321L14.301 23.2623L12.1914 22.2526L12.9281 22.8625L14.4215 23.913H16.9865L18.4866 22.8625L19.2233 22.2526L17.1137 23.2623Z"
									fill = "#C0AD9E"
									stroke = "#C0AD9E"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M16.953 21.1344L16.6316 20.9108H14.7765L14.455 21.1344L14.2876 22.632L14.4416 22.4829H16.9664L17.1338 22.632L16.953 21.1344Z"
									fill = "#161616"
									stroke = "#161616"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M23.6764 13.2263L24.2457 10.4615L23.3952 7.89323L16.9526 12.7316L19.4305 14.8527L22.933 15.8895L23.71 14.9746L23.3752 14.7307L23.9109 14.236L23.4955 13.9107L24.0313 13.4974L23.6764 13.2263Z"
									fill = "#763D16"
									stroke = "#763D16"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M7.16846 10.4615L7.7377 13.2263L7.37606 13.4974L7.91183 13.9107L7.5033 14.236L8.03906 14.7307L7.70422 14.9746L8.47437 15.8895L11.9769 14.8527L14.4548 12.7316L8.01229 7.89323L7.16846 10.4615Z"
									fill = "#763D16"
									stroke = "#763D16"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M22.9331 15.8897L19.4306 14.8529L20.4954 16.4724L18.9082 19.5896L20.9977 19.5625H24.1118L22.9331 15.8897Z"
									fill = "#F6851B"
									stroke = "#F6851B"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M11.9769 14.8529L8.47435 15.8897L7.30908 19.5625H10.4165L12.4992 19.5896L10.9188 16.4724L11.9769 14.8529Z"
									fill = "#F6851B"
									stroke = "#F6851B"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
								<path
									d = "M16.7317 16.6418L16.9527 12.7317L17.9707 9.94661H13.4502L14.4547 12.7317L14.6891 16.6418L14.7695 17.8751L14.7762 20.9109H16.6313L16.6447 17.8751L16.7317 16.6418Z"
									fill = "#F6851B"
									stroke = "#F6851B"
									strokeLinecap = "round"
									strokeLinejoin = "round"
								/>
							</svg>
							
							<span
								style = { {
									marginLeft : "16px" ,
									fontWeight : '600' ,
									fontSize : '16px' ,
									color : "#141416" ,
								} }
							>Metamask
							</span>
						</li>
						<WalletItem name = "WalletConnect">
							<svg
								width = "32"
								height = "32"
								viewBox = "0 0 32 32"
								fill = "none"
								xmlns = "http://www.w3.org/2000/svg"
							>
								<path
									d = "M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
									fill = "#E7EEFC"
								/>
								<path
									d = "M8.97407 11.5484C12.8516 7.75202 19.1383 7.75202 23.0157 11.5484L23.4824 12.0053C23.6764 12.1951 23.6764 12.5029 23.4824 12.6927L21.8861 14.2557C21.7892 14.3506 21.632 14.3506 21.5349 14.2557L20.8928 13.6269C18.1878 10.9785 13.802 10.9785 11.097 13.6269L10.4093 14.3003C10.3123 14.3952 10.1552 14.3952 10.0582 14.3003L8.46188 12.7373C8.268 12.5475 8.268 12.2397 8.46188 12.0499L8.97407 11.5484ZM26.3172 14.7808L27.738 16.1719C27.9317 16.3617 27.9317 16.6694 27.738 16.8593L21.3316 23.1317C21.1377 23.3216 20.8234 23.3216 20.6295 23.1317L16.0827 18.68C16.0343 18.6325 15.9557 18.6325 15.9072 18.68L11.3605 23.1317C11.1666 23.3216 10.8523 23.3216 10.6584 23.1317L4.25185 16.8592C4.05798 16.6694 4.05798 16.3616 4.25185 16.1718L5.67263 14.7807C5.86651 14.5909 6.18083 14.5909 6.37471 14.7807L10.9216 19.2325C10.9701 19.28 11.0487 19.28 11.0971 19.2325L15.6438 14.7807C15.8377 14.5909 16.152 14.5909 16.3459 14.7807L20.8928 19.2325C20.9412 19.28 21.0198 19.28 21.0683 19.2325L25.6151 14.7808C25.8091 14.591 26.1233 14.591 26.3172 14.7808Z"
									fill = "#2782FB"
								/>
							</svg>
						
						</WalletItem>
						<WalletItem name = "Coinbase wallet">
							<svg
								width = "32"
								height = "32"
								viewBox = "0 0 32 32"
								fill = "none"
								xmlns = "http://www.w3.org/2000/svg"
							>
								<path
									d = "M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
									fill = "white"
								/>
								<path
									d = "M16 0C7.15676 0 0 7.13306 0 15.947C0 24.761 7.15676 31.894 16 31.894C24.8433 31.894 32 24.761 32 15.947C32 7.13306 24.8433 0 16 0ZM16 25.2781C10.8324 25.2781 6.63785 21.0975 6.63785 15.947C6.63785 10.7966 10.8324 6.61585 16 6.61585C21.1676 6.61585 25.3621 10.7966 25.3621 15.947C25.3621 21.0975 21.1676 25.2781 16 25.2781Z"
									fill = "url(#paint0_linear_2192_30807)"
								/>
								<path
									d = "M18.2702 18.9425H13.7296C13.3404 18.9425 13.0161 18.6192 13.0161 18.2313V13.6842C13.0161 13.2963 13.3404 12.9731 13.7296 12.9731H18.2918C18.681 12.9731 19.0053 13.2963 19.0053 13.6842V18.2313C19.0053 18.6192 18.681 18.9425 18.2702 18.9425Z"
									fill = "#2059EB"
								/>
								<defs>
									<linearGradient
										id = "paint0_linear_2192_30807"
										x1 = "16"
										y1 = "31.894"
										x2 = "16"
										y2 = "0"
										gradientUnits = "userSpaceOnUse"
									>
										<stop stop-color = "#1447EA" />
										<stop
											offset = "1"
											stop-color = "#2B65FB"
										/>
									</linearGradient>
								</defs>
							</svg>
						</WalletItem>
					</ul>
					<Button
						style = { {
							display : "flex" ,
							alignItems : "center" ,
							justifyContent : "center" ,
							width : '100%' ,
							padding : "12px 20px" ,
							borderRadius : '16px' ,
							border : "1px solid #e6e8ec" ,
							height : "56px" ,
							margin : "32px 0" ,
						} }
					>
						<span
							style = { {
								fontSize : "16px" ,
								lineHeight : "32px" ,
								fontWeight : "600" ,
								color : "#141416" ,
							} }
						>
							Show More
						</span>
					</Button>
					<footer
						className = "bios"
						style = { {
							fontWeight : "500" ,
							fontSize : "12px" ,
							lineHeight : "18px" ,
							borderRadius : '16px' ,
							padding : "12px 20px" ,
							background : "#f4f5f6" ,
						} }
					>
						By connecting a wallet, you agree to Daotion Labs’ <span className = { less.blue }>Terms of Service</span> and acknowledge that you have read and understand the Daotion <span className = { less.blue }>Protocol Disclaimer</span>.
					</footer>
				</div>
			</div>
			<div
				style = { {
					display : "flex" ,
					flexFlow : "column wrap" ,
					marginLeft : "20px" ,
				} }
			>
				<div
					className = "connecting-box"
					style = { {
						padding : "32px" ,
						borderRadius : "20px" ,
						backgroundColor : "#ffffff" ,
						width : "480px" ,
						height : "fit-content" ,
						boxShadow : '0px 64px 64px -48px rgba(31, 47, 70, 0.12)' ,
					} }
				>
					<h1
						style = { {
							display : "flex" ,
							alignItems : 'center' ,
							justifyContent : "space-between" ,
							fontWeight : '700' ,
							fontSize : '32px' ,
							lineHeight : '40px' ,
						} }
					>
						<span
						>Connect wallet
						</span>
						<svg
							width = "40"
							height = "40"
							viewBox = "0 0 40 40"
							fill = "none"
							xmlns = "http://www.w3.org/2000/svg"
						>
							<path
								fillRule = "evenodd"
								clipRule = "evenodd"
								d = "M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
								fill = "#23262F"
							/>
							<rect
								x = "1"
								y = "1"
								width = "38"
								height = "38"
								rx = "19"
								stroke = "#E6E8EC"
								strokeWidth = "2"
							/>
						</svg>
					</h1>
					<div
						className = "connecting"
						style = { {
							margin : "32px 0" ,
							background : '#e9f0fd' ,
							borderRadius : "16px" ,
							width : "100%" ,
							padding : "12px 24px" ,
							display : "flex" ,
							justifyContent : "flex-start" ,
						} }
					>
						<div className = { less.loader }></div>
						<div
							style = { {
								display : 'flex' ,
								flexFlow : "column wrap" ,
							} }
						>
							<span
								style = { {
									fontWeight : "600" ,
									fontSize : '18px' ,
									color : "#141416" ,
								} }
							>Connecting
							</span>
							<p
								style = { {
									display : "block" ,
									margin : "0" ,
									fontWeight : '400' ,
									fontSize : "14px" ,
									
								} }
							>This won't cost you any Ether
							</p>
						</div>
					</div>
					<footer
						style = { {
							fontWeight : "500" ,
							fontSize : "12px" ,
							lineHeight : "18px" ,
							borderRadius : '16px' ,
							padding : "12px 20px" ,
							background : "#f4f5f6" ,
						} }
					>
						By connecting a wallet, you agree to Daotion Labs’ Terms of Service and acknowledge that you have read and understand the Daotion Protocol Disclaimer.
					</footer>
				</div>
				<div
					className = "Error-box"
					style = { {
						padding : "32px" ,
						borderRadius : "20px" ,
						backgroundColor : "#ffffff" ,
						width : "480px" ,
						height : "fit-content" ,
						boxShadow : '0px 64px 64px -48px rgba(31, 47, 70, 0.12)' ,
						marginTop : "20px" ,
					} }
				>
					<h1
						style = { {
							display : "flex" ,
							alignItems : 'center' ,
							justifyContent : "space-between" ,
							fontWeight : '700' ,
							fontSize : '32px' ,
							lineHeight : '40px' ,
						} }
					>
						<span
						>Error
						</span>
						<svg
							width = "40"
							height = "40"
							viewBox = "0 0 40 40"
							fill = "none"
							xmlns = "http://www.w3.org/2000/svg"
						>
							<path
								fillRule = "evenodd"
								clipRule = "evenodd"
								d = "M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
								fill = "#23262F"
							/>
							<rect
								x = "1"
								y = "1"
								width = "38"
								height = "38"
								rx = "19"
								stroke = "#E6E8EC"
								strokeWidth = "2"
							/>
						</svg>
					</h1>
					<p
						style = { {
							margin : "24px 0" ,
							fontSize : "16px" ,
							fontWeight : "500" ,
							lineHeight : "22px" ,
						} }
					>
						accounts received is empty. If the problem persist please Contact support
					</p>
					<Button
						style = { {
							background : "#0070f3" ,
							borderRadius : '12px' ,
							padding : '16px 24px' ,
							width : "100%" ,
							height : '48px' ,
							marginBottom : '8px' ,
							display:"flex",
							alignItems:'center',
							justifyContent:"center"
						} }
					>
						<span
							style = { {
								textAlign : "center" ,
								color : "white" ,
								fontSize : "16px" ,
								fontWeight : '700' ,
								lineHeight : '16px' ,
							} }
						>Try again
						</span>
					</Button>
					<Button
						style = { {
							background : "#ffffff" ,
							borderRadius : '12px' ,
							padding : '16px 24px' ,
							width : "100%" ,
							height : '48px' ,
							border : "2px solid #e6e8ec",
							display:"flex",
							alignItems:'center',
							justifyContent:"center"
						} }
					>
						<span
							style = { {
								textAlign : "center" ,
								color : "#141416" ,
								fontSize : "16px" ,
								fontWeight : '700' ,
								lineHeight : '16px' ,
								
							} }
						>Back to wallet selection
						</span>
					</Button>
				</div>
				<div
					className = "connect_cancel"
					style = { {
						padding : "32px" ,
						borderRadius : "20px" ,
						backgroundColor : "#ffffff" ,
						width : "480px" ,
						height : "fit-content" ,
						boxShadow : '0px 64px 64px -48px rgba(31, 47, 70, 0.12)' ,
						marginTop : "20px" ,
					} }
				>
					<div
						style = { {
							display : "flex" ,
							flexDirection : "row-reverse" ,
							
						} }
					>
						<svg
							width = "40"
							height = "40"
							viewBox = "0 0 40 40"
							fill = "none"
							xmlns = "http://www.w3.org/2000/svg"
						>
							<path
								fillRule = "evenodd"
								clipRule = "evenodd"
								d = "M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
								fill = "#23262F"
							/>
							<rect
								x = "1"
								y = "1"
								width = "38"
								height = "38"
								rx = "19"
								stroke = "#E6E8EC"
								strokeWidth = "2"
							/>
						</svg>
					</div>
					<div
						style = {{
							display : "flex" ,
							justifyContent:"center",
							margin:"32px 0",
						}}
					>
						<svg
							width = "80"
							height = "80"
							viewBox = "0 0 80 80"
							fill = "none"
							xmlns = "http://www.w3.org/2000/svg"
						>
							<rect
								width = "80"
								height = "80"
								rx = "40"
								fill = "#0070F3"
							/>
							<path
								fillRule = "evenodd"
								clipRule = "evenodd"
								d = "M47 33H33C31.8954 33 31 33.8954 31 35V45C31 46.1046 31.8954 47 33 47H47C48.1046 47 49 46.1046 49 45V35C49 33.8954 48.1046 33 47 33ZM33 31C30.7909 31 29 32.7909 29 35V45C29 47.2091 30.7909 49 33 49H47C49.2091 49 51 47.2091 51 45V35C51 32.7909 49.2091 31 47 31H33Z"
								fill = "#FCFCFD"
							/>
							<path
								fillRule = "evenodd"
								clipRule = "evenodd"
								d = "M41 40C41 37.2386 43.2386 35 46 35H50C50.5523 35 51 35.4477 51 36C51 36.5523 50.5523 37 50 37H46C44.3431 37 43 38.3431 43 40C43 41.6569 44.3431 43 46 43H50C50.5523 43 51 43.4477 51 44C51 44.5523 50.5523 45 50 45H46C43.2386 45 41 42.7614 41 40Z"
								fill = "#FCFCFD"
							/>
							<path
								d = "M47 40C47 40.5523 46.5523 41 46 41C45.4477 41 45 40.5523 45 40C45 39.4477 45.4477 39 46 39C46.5523 39 47 39.4477 47 40Z"
								fill = "#FCFCFD"
							/>
						</svg>
					</div>
					<p
					style={{
						textAlign:"center",
						fontSize:"16px",
						fontWeight:"500",
						lineHeight:"24px",
						color:"#313436",
						marginBottom:"32px",
					}}
					>
						You need to connect your wallet first to sign<br/> messages and send transaction to Ethereum network
					</p>
					<BlueBtn name='Connect wallet'></BlueBtn>
					<WhiteBtn name='Cancel'></WhiteBtn>
				</div>
			</div>
		</body>
	</>;
};

export const WalletItem = ( props ) => {
	return <>
		<li
			className = { less.walletItem }
			style = { {
				border : "1px solid #e6e8ec" ,
				borderRadius : "16px" ,
				width : "100%" ,
				display : "flex" ,
				alignItems : "center" ,
				justifyContent : "flex-start" ,
				flexFlow : "row nowrap" ,
				padding : "12px 20px" ,
			} }
		>
			{ props.children }
			
			<span
				style = { {
					marginLeft : "16px" ,
					fontWeight : '600' ,
					fontSize : '16px' ,
					color : "#141416" ,
				} }
			>{ props.name }
			</span>
		</li>
	</>;
};
export const BlueBtn=(props)=>{
	return<>
		<Button
			style = { {
				background : "#0070f3" ,
				borderRadius : '12px' ,
				padding : '16px 24px' ,
				width : "100%" ,
				height : '48px' ,
				marginBottom : '8px' ,
				display:"flex",
				alignItems:'center',
				justifyContent:"center"
			} }
		>
			<span
				style = { {
					color : "white" ,
					fontSize : "16px" ,
					fontWeight : '700' ,
					lineHeight : '16px' ,
				} }
			>{props.name}
			</span>
		</Button>
	</>
}
export const WhiteBtn=(props)=>{
	return<>
		<Button
			style = { {
				background : "#ffffff" ,
				borderRadius : '12px' ,
				padding : '16px 24px' ,
				width : "100%" ,
				height : '48px' ,
				border : "2px solid #e6e8ec",
				display:"flex",
				alignItems:'center',
				justifyContent:"center"
			} }
		>
			<span
				style = { {
					textAlign : "center" ,
					color : "#141416" ,
					fontSize : "16px" ,
					fontWeight : '700' ,
					lineHeight : '16px' ,
					
				} }
			>{props.name}
			</span>
		</Button>
	</>
}
