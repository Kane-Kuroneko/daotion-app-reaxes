// 获取元素的绝对位置坐标（像对于页面左上角）
export const getElementPagePosition = (element) => {
	//计算x坐标
	let actualLeft = element.offsetLeft;
	let current = element.offsetParent;
	while (current !== null) {
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	//计算y坐标
	let actualTop = element.offsetTop;
	current = element.offsetParent;
	while (current !== null) {
		actualTop += current.offsetTop + current.clientTop;
		current = current.offsetParent;
	}
	
	return { x: actualLeft, y: actualTop };
};
