import { ethers } from 'ethers';

export const createWallet = () => {
    const wallet = ethers.Wallet.createRandom();

    if (!wallet.mnemonic) {
        throw new Error('Failed to generate mnemonic for the wallet');
    }

    console.log('Address:', wallet.address);
    console.log('Mnemonic:', wallet.mnemonic.phrase);
    console.log('Private Key:', wallet.privateKey);

    return wallet.privateKey;
};
