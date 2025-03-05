import { Requester } from '#requester';




import { AsyncReplayablePayloadPlugin } from '#requester/src/plugins/async-replayable-payload-plugin';
import { ApplyEnvConfigPlugin } from '#requester/src/plugins/env-proxy-confing-plugin';
import { RealAddressPlugin } from '#requester/src/plugins/real-address-plugin';
import { FormdataPlugin } from '#requester/src/plugins/formdata-plugin';


export const request:{
	post:post,
} = new Requester([
	RealAddressPlugin(__ENV_CONFIG__ , __ENV__),
	ApplyEnvConfigPlugin(__ENV_CONFIG__ , __ENV__),
	AsyncReplayablePayloadPlugin(),
	FormdataPlugin(),
]);


type post = <RESP = any,PL = any>(input:RequestInfo | URL , init:Omit<RequestInit,"body"> & {
	body? : PL;
	env?:string,
	mock?:boolean,
}) => Promise<RESP>;
