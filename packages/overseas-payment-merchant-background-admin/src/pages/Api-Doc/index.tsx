export const ApiDoc = reaxper(() => {
	const iframeRef = useRef<HTMLIFrameElement>() , { current : iframe } = iframeRef;
	
	useLayoutEffect(() => {
		if(iframe){
			iframe.contentWindow.document.addEventListener('error' , () => {
				alert('dddddddd');
			});
		}
	} , []);
	
	return (
		
		<iframe
			ref = { iframeRef }
			style = { {
				width : '100%' ,
				height : '100%' ,
				border : 'none' ,
				borderRadius : '8px' ,
			} }
			src = "https://rainpay.gitbook.io/api/getstarted/Rainpay-api"
		/>
	
	);
});
