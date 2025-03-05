/*
todo 等待合约重构完DAO->space
 */

export const SpaceFactoryAbi = [
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'did',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'dao',
				type: 'address',
			},
		],
		name: 'DAOCreated',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'allIds',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'count',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'did_',
				type: 'uint256',
			},
			{
				internalType: 'string',
				name: 'name_',
				type: 'string',
			},
			{
				internalType: 'string',
				name: 'symbol_',
				type: 'string',
			},
		],
		name: 'createDAO',
		outputs: [
			{
				internalType: 'address',
				name: 'dao',
				type: 'address',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner_',
				type: 'address',
			},
		],
		name: 'daoList',
		outputs: [
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'id_',
				type: 'uint256',
			},
		],
		name: 'getDao',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
];

export const SpaceHomeAbi = [
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		inputs: [],
		name: 'id',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'id_',
				type: 'uint256',
			},
			{
				internalType: 'string',
				name: 'name_',
				type: 'string',
			},
			{
				internalType: 'string',
				name: 'symbol_',
				type: 'string',
			},
		],
		name: 'initialize',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'name',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'symbol',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
];

/*创建SBT*/
export const CreateSBTAbi = [
	{ "inputs" : [ { "internalType" : "address" , "name" : "_beacon" , "type" : "address" } ] , "stateMutability" : "nonpayable" , "type" : "constructor" } ,
	{ "anonymous" : false , "inputs" : [ { "indexed" : true , "internalType" : "address" , "name" : "previousOwner" , "type" : "address" } , { "indexed" : true , "internalType" : "address" , "name" : "newOwner" , "type" : "address" } ] , "name" : "OwnershipTransferred" , "type" : "event" } ,
	{
		"anonymous" : false ,
		"inputs" : [
			{ "indexed" : true , "internalType" : "address" , "name" : "sbt" , "type" : "address" } ,
			{ "indexed" : false , "internalType" : "uint256" , "name" : "sbtid" , "type" : "uint256" } ,
			{ "indexed" : false , "internalType" : "address" , "name" : "space" , "type" : "address" } ,
			{ "indexed" : false , "internalType" : "address" , "name" : "owner" , "type" : "address" } ,
			{ "indexed" : false , "internalType" : "string" , "name" : "uri" , "type" : "string" } ,
			{ "indexed" : false , "internalType" : "uint256" , "name" : "orderid" , "type" : "uint256" } ,
			{ "indexed" : false , "internalType" : "string" , "name" : "name" , "type" : "string" } ,
			{ "indexed" : false , "internalType" : "string" , "name" : "label" , "type" : "string" } ,
			{ "indexed" : false , "internalType" : "uint256" , "name" : "supply" , "type" : "uint256" } ,
			{ "indexed" : false , "internalType" : "uint256" , "name" : "hold_limit" , "type" : "uint256" } ,
			{ "indexed" : false , "internalType" : "bool" , "name" : "revoke" , "type" : "bool" } ,
			{ "indexed" : false , "internalType" : "bool" , "name" : "burn" , "type" : "bool" } ,
		] ,
		"name" : "SBTCreated" ,
		"type" : "event" ,
	} ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } , { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "name" : "_space_sbtlist" , "outputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "name" : "_spaces" , "outputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "beacon" , "outputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "creator" , "type" : "address" } , { "internalType" : "address" , "name" : "space" , "type" : "address" } ] , "name" : "checkRight" , "outputs" : [ { "internalType" : "bool" , "name" : "" , "type" : "bool" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "_space" , "type" : "address" } , { "internalType" : "string" , "name" : "uri" , "type" : "string" } , { "internalType" : "uint256" , "name" : "_orderid" , "type" : "uint256" } , { "internalType" : "string" , "name" : "_name" , "type" : "string" } , { "internalType" : "string" , "name" : "_label" , "type" : "string" } , { "internalType" : "uint256" , "name" : "_supply" , "type" : "uint256" } , { "internalType" : "uint256" , "name" : "_hold_limit" , "type" : "uint256" } , { "internalType" : "bool" , "name" : "_revoke" , "type" : "bool" } , { "internalType" : "bool" , "name" : "_burn" , "type" : "bool" } ] , "name" : "createSbt" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "name" : "ids" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "owner" , "outputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "renounceOwnership" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "sbtCount" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "name" : "sbts" , "outputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "event_" , "type" : "address" } ] , "name" : "setEvent" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "_factory" , "type" : "address" } ] , "name" : "setSpaceFactory" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "spaceFactory" , "outputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "newOwner" , "type" : "address" } ] , "name" : "transferOwnership" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
];

export const ExecuteSBTABI = [
	{ "anonymous" : false , "inputs" : [ { "indexed" : true , "internalType" : "address" , "name" : "owner" , "type" : "address" } , { "indexed" : true , "internalType" : "address" , "name" : "approved" , "type" : "address" } , { "indexed" : true , "internalType" : "uint256" , "name" : "tokenId" , "type" : "uint256" } ] , "name" : "Approval" , "type" : "event" } ,
	{ "anonymous" : false , "inputs" : [ { "indexed" : true , "internalType" : "address" , "name" : "owner" , "type" : "address" } , { "indexed" : true , "internalType" : "address" , "name" : "operator" , "type" : "address" } , { "indexed" : false , "internalType" : "bool" , "name" : "approved" , "type" : "bool" } ] , "name" : "ApprovalForAll" , "type" : "event" } ,
	{ "anonymous" : false , "inputs" : [ { "indexed" : false , "internalType" : "uint8" , "name" : "version" , "type" : "uint8" } ] , "name" : "Initialized" , "type" : "event" } ,
	{ "anonymous" : false , "inputs" : [ { "indexed" : true , "internalType" : "address" , "name" : "previousOwner" , "type" : "address" } , { "indexed" : true , "internalType" : "address" , "name" : "newOwner" , "type" : "address" } ] , "name" : "OwnershipTransferred" , "type" : "event" } ,
	{ "anonymous" : false , "inputs" : [ { "indexed" : true , "internalType" : "address" , "name" : "from" , "type" : "address" } , { "indexed" : true , "internalType" : "address" , "name" : "to" , "type" : "address" } , { "indexed" : true , "internalType" : "uint256" , "name" : "tokenId" , "type" : "uint256" } ] , "name" : "Transfer" , "type" : "event" } ,
	{ "anonymous" : false , "inputs" : [ { "indexed" : true , "internalType" : "address" , "name" : "operator" , "type" : "address" } , { "indexed" : true , "internalType" : "address" , "name" : "from" , "type" : "address" } , { "indexed" : true , "internalType" : "address" , "name" : "to" , "type" : "address" } , { "indexed" : false , "internalType" : "uint256" , "name" : "id" , "type" : "uint256" } , { "indexed" : false , "internalType" : "uint256" , "name" : "value" , "type" : "uint256" } ] , "name" : "TransferSingle" , "type" : "event" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "minter" , "type" : "address" } , { "internalType" : "bytes" , "name" : "data" , "type" : "bytes" } ] , "name" : "Claim" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "ClaimWhite" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "bytes32[]" , "name" : "proof" , "type" : "bytes32[]" } , { "internalType" : "uint256[]" , "name" : "direct" , "type" : "uint256[]" } , { "internalType" : "address" , "name" : "owner_" , "type" : "address" } , { "internalType" : "uint256" , "name" : "id_" , "type" : "uint256" } , { "internalType" : "uint256" , "name" : "rnd_" , "type" : "uint256" } , { "internalType" : "uint256" , "name" : "timestamp_" , "type" : "uint256" } ] , "name" : "MercleCheck" , "outputs" : [ { "internalType" : "bool" , "name" : "" , "type" : "bool" } ] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "_event" , "outputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "_label" , "outputs" : [ { "internalType" : "string" , "name" : "" , "type" : "string" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "_log" , "outputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "bytes32" , "name" : "" , "type" : "bytes32" } ] , "name" : "_mercle_claims" , "outputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } , { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "name" : "_mintList" , "outputs" : [ { "internalType" : "address" , "name" : "minter" , "type" : "address" } , { "internalType" : "uint256" , "name" : "time" , "type" : "uint256" } , { "internalType" : "uint256" , "name" : "mintAmount" , "type" : "uint256" } , { "internalType" : "uint256" , "name" : "revokeAmount" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "name" : "_minter_balances" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "name" : "_minter_balances_max" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } , { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "name" : "_revoked" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "_space" , "outputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } , { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "name" : "_tokenProps" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "_totalHolder" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "_totalSupply" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "_addMinter" , "type" : "address" } , { "internalType" : "uint256" , "name" : "_max" , "type" : "uint256" } ] , "name" : "addMinter" , "outputs" : [ { "internalType" : "bool" , "name" : "" , "type" : "bool" } ] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "to" , "type" : "address" } , { "internalType" : "uint256" , "name" : "tokenId" , "type" : "uint256" } ] , "name" : "approve" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "owner" , "type" : "address" } ] , "name" : "balanceOf" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "baseURI" , "outputs" : [ { "internalType" : "string" , "name" : "" , "type" : "string" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "canBurn" , "outputs" : [ { "internalType" : "bool" , "name" : "" , "type" : "bool" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "canRevoke" , "outputs" : [ { "internalType" : "bool" , "name" : "" , "type" : "bool" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "event_" , "type" : "address" } ] , "name" : "changeEvent" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "bytes32[]" , "name" : "proof" , "type" : "bytes32[]" } , { "internalType" : "uint256[]" , "name" : "direct" , "type" : "uint256[]" } , { "internalType" : "address" , "name" : "owner_" , "type" : "address" } , { "internalType" : "uint256" , "name" : "id_" , "type" : "uint256" } , { "internalType" : "uint256" , "name" : "rnd_" , "type" : "uint256" } , { "internalType" : "uint256" , "name" : "timestamp_" , "type" : "uint256" } , { "internalType" : "uint256" , "name" : "amount_" , "type" : "uint256" } ] , "name" : "claimMercle" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "_delMinter" , "type" : "address" } ] , "name" : "delMinter" , "outputs" : [ { "internalType" : "bool" , "name" : "" , "type" : "bool" } ] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "uint256" , "name" : "tokenId" , "type" : "uint256" } ] , "name" : "exists" , "outputs" : [ { "internalType" : "bool" , "name" : "" , "type" : "bool" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "uint256" , "name" : "tokenId" , "type" : "uint256" } ] , "name" : "getApproved" , "outputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "uint256" , "name" : "_index" , "type" : "uint256" } ] , "name" : "getMinter" , "outputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "getMinterLength" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "uint256" , "name" : "tokenId" , "type" : "uint256" } , { "internalType" : "uint256" , "name" : "propId" , "type" : "uint256" } ] , "name" : "getProp" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "owner" , "type" : "address" } ] , "name" : "getTokenId" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "hold_limit" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "space_" , "type" : "address" } , { "internalType" : "address" , "name" : "event_" , "type" : "address" } , { "internalType" : "string" , "name" : "name_" , "type" : "string" } , { "internalType" : "string" , "name" : "label_" , "type" : "string" } , { "internalType" : "string" , "name" : "uri_" , "type" : "string" } , { "internalType" : "uint256" , "name" : "supply_" , "type" : "uint256" } , { "internalType" : "uint256" , "name" : "hold_limit_" , "type" : "uint256" } , { "internalType" : "bool" , "name" : "canRevoke_" , "type" : "bool" } , { "internalType" : "bool" , "name" : "canBurn_" , "type" : "bool" } ] , "name" : "initialize" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "owner" , "type" : "address" } , { "internalType" : "address" , "name" : "operator" , "type" : "address" } ] , "name" : "isApprovedForAll" , "outputs" : [ { "internalType" : "bool" , "name" : "" , "type" : "bool" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "account" , "type" : "address" } ] , "name" : "isMinter" , "outputs" : [ { "internalType" : "bool" , "name" : "" , "type" : "bool" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "owner" , "type" : "address" } ] , "name" : "isValidHolder" , "outputs" : [ { "internalType" : "bool" , "name" : "" , "type" : "bool" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "uint256" , "name" : "tokenId" , "type" : "uint256" } ] , "name" : "isValidId" , "outputs" : [ { "internalType" : "bool" , "name" : "" , "type" : "bool" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "maxSupply" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "to" , "type" : "address" } , { "internalType" : "uint256" , "name" : "amount" , "type" : "uint256" } , { "internalType" : "bytes" , "name" : "data" , "type" : "bytes" } ] , "name" : "mint" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "name" , "outputs" : [ { "internalType" : "string" , "name" : "" , "type" : "string" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "owner" , "outputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "uint256" , "name" : "tokenId" , "type" : "uint256" } ] , "name" : "ownerOf" , "outputs" : [ { "internalType" : "address" , "name" : "" , "type" : "address" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "owner" , "type" : "address" } , { "internalType" : "uint256" , "name" : "amount" , "type" : "uint256" } ] , "name" : "recover" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "renounceOwnership" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "owner" , "type" : "address" } , { "internalType" : "uint256" , "name" : "amount" , "type" : "uint256" } ] , "name" : "revoke" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "from" , "type" : "address" } , { "internalType" : "address" , "name" : "to" , "type" : "address" } , { "internalType" : "uint256" , "name" : "tokenId" , "type" : "uint256" } ] , "name" : "safeTransferFrom" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "from" , "type" : "address" } , { "internalType" : "address" , "name" : "to" , "type" : "address" } , { "internalType" : "uint256" , "name" : "tokenId" , "type" : "uint256" } , { "internalType" : "bytes" , "name" : "_data" , "type" : "bytes" } ] , "name" : "safeTransferFrom" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "operator" , "type" : "address" } , { "internalType" : "bool" , "name" : "approved" , "type" : "bool" } ] , "name" : "setApprovalForAll" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "string" , "name" : "uri_" , "type" : "string" } ] , "name" : "setBaseURI" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "_black" , "type" : "address" } , { "internalType" : "bool" , "name" : "state" , "type" : "bool" } ] , "name" : "setBlack" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "uint256" , "name" : "tokenId" , "type" : "uint256" } , { "internalType" : "uint256" , "name" : "propId" , "type" : "uint256" } , { "internalType" : "uint256" , "name" : "propvalue" , "type" : "uint256" } ] , "name" : "setProp" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "bytes32" , "name" : "root_" , "type" : "bytes32" } ] , "name" : "setRoot" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "_white" , "type" : "address" } , { "internalType" : "uint256" , "name" : "amount" , "type" : "uint256" } ] , "name" : "setWhite" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "bytes4" , "name" : "interfaceId" , "type" : "bytes4" } ] , "name" : "supportsInterface" , "outputs" : [ { "internalType" : "bool" , "name" : "" , "type" : "bool" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "symbol" , "outputs" : [ { "internalType" : "string" , "name" : "" , "type" : "string" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "uint256" , "name" : "tokenId" , "type" : "uint256" } ] , "name" : "tokenURI" , "outputs" : [ { "internalType" : "string" , "name" : "" , "type" : "string" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "totalHolders" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [] , "name" : "totalSupply" , "outputs" : [ { "internalType" : "uint256" , "name" : "" , "type" : "uint256" } ] , "stateMutability" : "view" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "from" , "type" : "address" } , { "internalType" : "address" , "name" : "to" , "type" : "address" } , { "internalType" : "uint256" , "name" : "tokenId" , "type" : "uint256" } ] , "name" : "transferFrom" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
	{ "inputs" : [ { "internalType" : "address" , "name" : "newOwner" , "type" : "address" } ] , "name" : "transferOwnership" , "outputs" : [] , "stateMutability" : "nonpayable" , "type" : "function" } ,
];

