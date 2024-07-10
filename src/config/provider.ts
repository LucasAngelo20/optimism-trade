import { ethers } from 'ethers';

const PROVIDER_URL = 'https://black-late-sailboat.optimism.quiknode.pro/556caf4380678a3a51b48b68b1336069547a6c1c/'; // Substitua pelo URL do seu provedor de nós

const provider = new ethers.JsonRpcProvider(PROVIDER_URL);

export default provider;

