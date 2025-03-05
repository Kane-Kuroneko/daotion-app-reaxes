/*供react-infinite-scroller使用的ref-reaxel*/
export const Reaxel_fact__scrollParentRef = () => {
	const scrollParentRef = React.createRef<HTMLDivElement>();
	return () => {
		return { scrollParentRef };
	};
};
