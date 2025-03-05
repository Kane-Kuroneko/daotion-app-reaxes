//@ts-nocheck
import { useState, useEffect } from 'react'
import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import { ethers } from 'ethers'

import { initWeb3Onboard } from './onboard'
import { AccountDetails, Network } from './components'
import { BigNumber } from "@ethersproject/bignumber";
import type { Account } from './types'

// Must be called outside of the App function
initWeb3Onboard()

function App() {
  const [
    {
      wallet, // the wallet that has been connected or null if not yet connected
      connecting // boolean indicating if connection is in progress
    },
    connect, // function to call to initiate user to connect wallet
    disconnect // function to call to with wallet<DisconnectOptions> to disconnect wallet
  ] = useConnectWallet()

  const [
    {
      chains, // the list of chains that web3-onboard was initialized with
      connectedChain, // the current chain the user's wallet is connected to
      settingChain // boolean indicating if the chain is in the process of being set
    },
    setChain // function to call to initiate user to switch chains in their wallet
  ] = useSetChain()

  // This hook allows you to track the state of all the currently connected wallets
  const connectedWallets = useWallets()

  // The user's currently connected account
  const [account, setAccount] = useState<Account | null>(null)

  // The address to send to
  const [toAddress, setToAddress] = useState('')

  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>()


  useEffect(() => {
    // If `wallet` is defined then the user is connected
    if (wallet) {
      const { name, avatar } = wallet?.accounts[0].ens ?? {}
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url }
      })
    }
  }, [wallet])

  useEffect(() => {
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    }
  }, [wallet])

  const connectWallet = async () => {
    try{
      await connect({});
    }catch(err){
      console.log(err);
    }
  };

  const disconnectWallet = () => {
    if (wallet?.label) {
      disconnect({ label: wallet?.label })
      setAccount(null)
    }
  }

const domain = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
    { name: "salt", type: "bytes32" },
];
const trasInfo = [
    { name: "amount", type: "uint256" },
    { name: "toAddr", type: "address" },
    { name: "erc20Constract", type: "address" },
];

const domainData = {
  // name: "My test712 dApp",
  // version: "2",
  // chainId: 4,
  // verifyingContract: "0xd8a7B766A7C2C11F426D72ba89efE88e66cF2445",
  // salt: "0xf2d857f4a3edcb9b78b5d503bfe733db1e3f6cdc2b7971ee739626c97e86a558"
};
var message = {
  amount: 100,
  toAddr: "0x8a49f3c0BCdc9198B1936BceB9a64848d5CDdbA0",
  erc20Constract: "0xd28030aB015E5228b7a5f111Ed2e05798432E158"
};

let checkAddress = "0xd8a7B766A7C2C11F426D72ba89efE88e66cF2445";

let abiCheck = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "getNonce",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "signer",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "toAddr",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "erc20Constract",
            "type": "address"
          }
        ],
        "internalType": "struct Erc712TestCheck.TrasInfo",
        "name": "tras",
        "type": "tuple"
      },
      {
        "internalType": "bytes32",
        "name": "sigR",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "sigS",
        "type": "bytes32"
      },
      {
        "internalType": "uint8",
        "name": "sigV",
        "type": "uint8"
      }
    ],
    "name": "verify",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "toAddr",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "erc20Constract",
            "type": "address"
          }
        ],
        "internalType": "struct Erc712TestCheck.TrasInfo",
        "name": "tras",
        "type": "tuple"
      },
      {
        "internalType": "bytes32",
        "name": "sigR",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "sigS",
        "type": "bytes32"
      },
      {
        "internalType": "uint8",
        "name": "sigV",
        "type": "uint8"
      }
    ],
    "name": "transferVerify",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]


const data = JSON.stringify({
  types: {
      EIP712Domain: domain,
      TrasInfo: trasInfo,
  },
  domain: domainData,
  primaryType: "TrasInfo",
  message: message
});

  const sendTransaction = async () => {

   // const signer = provider?.getUncheckedSigner()
   
  
     await provider?.send("eth_signTypedData_v3", [
      wallet?.accounts[0].address.toLowerCase(),
      data]
      ).then((result)=>{
        
        const signature = result.substring(2);
        const r = "0x" + signature.substring(0, 64);
        const s = "0x" + signature.substring(64, 128);
        const v = parseInt(signature.substring(128, 130), 16);

        let contractCheck = new ethers.Contract(checkAddress, abiCheck, provider);
        const contractWithSigner = contractCheck.connect(provider.getSigner());
        //ethers.Wallet()
        //let contractWithSigner = new ethers.Contract(checkAddress, abiCheck, wallet)
        let tx = contractWithSigner.transferVerify(message, r, s, v, { gasLimit: 1000000}).then((val:any)=>{
          console.log(val)
        }).catch((error:any)=>{
          console.log(error)
        })
        
      }).catch((error)=>{
        console.log(error)
      });


    // await signer?.sendTransaction({
    //   to: toAddress,
    //   value: 1000000000000000
    // })
  }

  return (
    <div className="bg-grey-100 flex flex-col  items-center min-h-screen relative">
      <div className="fixed w-full top-0 right-0 p-3 flex justify-end items-center">
        {wallet ? (
          <Network
            chains={chains}
            connectedChain={connectedChain}
            setChain={(chainId) => setChain({ chainId })}
          />
        ) : null}
        <div className="mx-1" />
        <AccountDetails account={account} />
      </div>
      <div className="my-32 text-3xl font-bold">Web3 Onboard Demo</div>
      <div className="flex my-24">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              className="input input-bordered outline-none"
              value={toAddress}
              placeholder="address"
              onChange={(e) => setToAddress(e.target.value)}
            />
            <button onClick={sendTransaction} className="btn btn-square">
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="flex">
        <button onClick={connectWallet} className="btn btn-primary mr-12">
          Connect
        </button>
        <button onClick={disconnectWallet} className="btn btn-secondary">
          Disconnect
        </button>
      </div>
    </div>
  )
}

export default App
