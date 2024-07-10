import { ethers } from 'ethers';
import provider from './provider';
import { createWallet } from '../utils/createWallet';

// Gere uma nova carteira e obtenha a chave privada
const PRIVATE_KEY = createWallet();
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

export default wallet;
