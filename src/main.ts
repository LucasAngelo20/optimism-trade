import provider from './config/provider';
import { log } from './utils/logger';
import { buyToken, sellToken } from './utils/trade';

const main = async () => {
    try {
        const network = await provider.getNetwork();
        log(`Connected to network: ${network.name} (chainId: ${network.chainId})`);

        await buyToken('0.01'); // Compra 0.01 ETH de DAI
        await sellToken('10');  // Vende 10 DAI por ETH
    } catch (error: any) {
        log(`Failed to connect: ${error.message}`);
    }
};

main();
