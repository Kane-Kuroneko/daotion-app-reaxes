
/*供react-infinite-scroller使用的ref-reaxel*/
export const reaxel_scrollParentRef = function() {
	const scrollParentRef = React.createRef<HTMLDivElement>();
	return () => {
		return { scrollParentRef };
	};
}();
