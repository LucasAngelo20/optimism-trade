import { ethers } from 'ethers';
import provider from './provider';
import { createWallet } from '../utils/createWallet';

// Gere uma nova carteira e obtenha a chave privada
const PRIVATE_KEY = "ca519f7b39def61f6e25f50dd6b233ca1b6436aaa7a984fda38fd18f2a05121b";
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

export default wallet;
