import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";

import { EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";
import { Web3 } from "web3";
import env from "@/env";
import { gnsAbi } from "@/config/abi";
import { nftListSchemaType } from "@/config/schema.zod";

// Web3 Initialization
// const walletAddress = "0x2655Bd807104830C47b8653484059119CF8B2C96"

export const getBalance = async function (walletAddress: string) {
  const contractAddress = env.CONTRACT;
  const network = env.POLYGON_NETWORK;

  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${env.INFURA_KEY}`
    )
  );

  const contract = new web3.eth.Contract(gnsAbi, contractAddress);
  const balance = await contract.methods
    .balanceOf(walletAddress)
    .call({ from: walletAddress });
  return Number(balance);

  // web3.eth.getBlockNumber().then(console.log);
};

export const openseaGetUserNfts = async (address: string) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `https://api.opensea.io/api/v2/chain/matic/account/${address}/nfts`,
    headers: {
      accept: "application/json",
      "x-api-key": env.OPENSEA_API_KEY,
    } as RawAxiosRequestHeaders,
  };

  try {
    const response = await axios.request<nftListSchemaType>(options);
    const results = response.data.nfts;
    return results;
  } catch (error) {
    console.error(error);
    // return;
  }

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     // console.log(response.data);
  //     return response.data.nfts;
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });
};
const tester = async () => {
  const address = "0x2655Bd807104830C47b8653484059119CF8B2C96";
  const results = await openseaGetUserNfts(address);
  console.log(results);
};

// tester();

export const moralisGetUserNfts = async (address: string) => {
  await Moralis.start({
    apiKey: env.MORALIS_API_KEY,
    // ...and any other configuration
  });

  const chain = EvmChain.POLYGON;

  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain,
  });

  console.log(response.toJSON());
};
// const address = "0x2655Bd807104830C47b8653484059119CF8B2C96";
// getUserNfts(address);
