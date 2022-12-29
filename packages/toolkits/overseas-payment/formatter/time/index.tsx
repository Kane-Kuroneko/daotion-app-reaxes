/**
 * 将时间格式化为巴西时区
 * @param {string} template 格式,见https://dayjs.gitee.io/docs/zh-CN/display/format
 * @return {string}
 */
export const time_localize_Brazil = (timestamp : number = Date.now()/1000 , template : string = "YYYY-MM-DD HH:mm:ss" ) => {
	const unix = dayjs.unix(timestamp);
	dayjs.extend(utc);
	dayjs.extend(timezone);
	/*后端go传的是毫秒*/
	
	return dayjs.tz(unix , "America/Sao_Paulo").format(template);
};

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
