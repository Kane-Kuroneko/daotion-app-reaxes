export * from './user';
export * from './Spaces';
export * from './SBT';






/**
 * 从服务器获取时间戳
 */
export const request_server_timestamp = () => {
	
	return request.post<{timestamp:number},any>( `/tools/get-server-timestamp` ).
	then( ( data ) => {
		return data.timestamp as number;
	} );
};


