import { ethers } from 'ethers';
import wallet from '../config/wallet';
import { log } from './logger';
import { Token, CurrencyAmount, TradeType, Percent, Route, Trade, Fetcher, WETH, TokenAmount } from '@uniswap/sdk';

const chainId = 1; // Optimism chain ID
const WETH_ADDRESS = WETH[chainId].address;
const DAI_ADDRESS = '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1'; // DAI address on Optimism

export const buyToken = async (amountInEther: string) => {
    try {
        const amountIn = ethers.parseEther(amountInEther);
        const weth = WETH[chainId];
        const dai = new Token(chainId, DAI_ADDRESS, 18, 'DAI', 'Dai Stablecoin');

        const pair = await Fetcher.fetchPairData(weth, dai);
        const route = new Route([pair], weth);

        const trade = new Trade(
            route,
            new TokenAmount(weth, amountIn.toString()),
            TradeType.EXACT_INPUT
        );

        const slippageTolerance = new Percent('50', '10000'); // 0.50%
        const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
        const path = [weth.address, dai.address];
        const to = wallet.address;
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

        const uniswap = new ethers.Contract(
            '0xE592427A0AEce92De3Edee1F18E0157C05861564', // Uniswap V3 router address on Optimism
            ['function exactInputSingle((address,address,uint24,address,uint256,uint256,uint160)) external returns (uint256)'],
            wallet
        );

        const tx = await uniswap.exactInputSingle({
            tokenIn: path[0],
            tokenOut: path[1],
            fee: 3000, // 0.3%
            recipient: to,
            deadline: deadline,
            amountIn: amountIn.toString(),
            amountOutMinimum: amountOutMin.toString(),
            sqrtPriceLimitX96: 0
        });

        log(`Buy order sent: ${tx.hash}`);
    } catch (error: any) {
        log(`Failed to send buy order: ${error.message}`);
    }
};

export const sellToken = async (amountInDai: string) => {
    try {
        const amountIn = ethers.parseUnits(amountInDai, 18);
        const weth = WETH[chainId];
        const dai = new Token(chainId, DAI_ADDRESS, 18, 'DAI', 'Dai Stablecoin');

        const pair = await Fetcher.fetchPairData(dai, weth);
        const route = new Route([pair], dai);

        const trade = new Trade(
            route,
            new TokenAmount(dai, amountIn.toString()),
            TradeType.EXACT_INPUT
        );

        const slippageTolerance = new Percent('50', '10000'); // 0.50%
        const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
        const path = [dai.address, weth.address];
        const to = wallet.address;
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

        const uniswap = new ethers.Contract(
            '0xE592427A0AEce92De3Edee1F18E0157C05861564', // Uniswap V3 router address on Optimism
            ['function exactInputSingle((address,address,uint24,address,uint256,uint256,uint160)) external returns (uint256)'],
            wallet
        );

        const tx = await uniswap.exactInputSingle({
            tokenIn: path[0],
            tokenOut: path[1],
            fee: 3000, // 0.3%
            recipient: to,
            deadline: deadline,
            amountIn: amountIn.toString(),
            amountOutMinimum: amountOutMin.toString(),
            sqrtPriceLimitX96: 0
        });

        log(`Sell order sent: ${tx.hash}`);
    } catch (error: any) {
        log(`Failed to send sell order: ${error.message}`);
    }
};
