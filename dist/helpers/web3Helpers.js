"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moralisGetUserNfts = exports.openseaGetUserNfts = exports.getBalance = void 0;
const axios_1 = __importDefault(require("axios"));
const common_evm_utils_1 = require("@moralisweb3/common-evm-utils");
const moralis_1 = __importDefault(require("moralis"));
const web3_1 = require("web3");
const env_1 = __importDefault(require("../env"));
const abi_1 = require("../config/abi");
const getBalance = function (walletAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const contractAddress = env_1.default.CONTRACT;
        const network = env_1.default.POLYGON_NETWORK;
        const web3 = new web3_1.Web3(new web3_1.Web3.providers.HttpProvider(`https://${network}.infura.io/v3/${env_1.default.INFURA_KEY}`));
        const contract = new web3.eth.Contract(abi_1.gnsAbi, contractAddress);
        const balance = yield contract.methods
            .balanceOf(walletAddress)
            .call({ from: walletAddress });
        return Number(balance);
    });
};
exports.getBalance = getBalance;
const openseaGetUserNfts = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: "GET",
        url: `https://api.opensea.io/api/v2/chain/matic/account/${address}/nfts`,
        headers: {
            accept: "application/json",
            "x-api-key": env_1.default.OPENSEA_API_KEY,
        },
    };
    try {
        const response = yield axios_1.default.request(options);
        const results = response.data.nfts;
        return results;
    }
    catch (error) {
        console.error(error);
    }
});
exports.openseaGetUserNfts = openseaGetUserNfts;
const moralisGetUserNfts = (address) => __awaiter(void 0, void 0, void 0, function* () {
    yield moralis_1.default.start({
        apiKey: env_1.default.MORALIS_API_KEY,
    });
    const chain = common_evm_utils_1.EvmChain.POLYGON;
    const response = yield moralis_1.default.EvmApi.nft.getWalletNFTs({
        address,
        chain,
    });
    console.log(response.toJSON());
});
exports.moralisGetUserNfts = moralisGetUserNfts;
