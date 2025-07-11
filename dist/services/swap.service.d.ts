import { Signer, BrowserProvider, JsonRpcProvider } from 'ethers';
import { Token, TradeType } from '@uniswap/sdk-core';
import { Trade, Pair } from '@uniswap/v2-sdk';
import { Erc20Token, SwapSettings } from '../types';
import { SwapWidgetNetworkConfig } from '../types/networks';
export declare class SwapService {
    private config;
    private provider;
    private signer;
    private routerContract;
    private factoryContract;
    private wethAddress;
    private chainId;
    private pairs;
    private pairsLoadedPromise;
    private resolvePairsLoaded;
    private wethToken;
    constructor(provider: BrowserProvider | JsonRpcProvider, config: SwapWidgetNetworkConfig);
    setSigner(signer: Signer): void;
    /**
     * Rounds a number string to the specified number of decimal places
     * to avoid parseUnits errors with too many decimals
     */
    private roundToDecimals;
    /**
     * Loads all pairs from The Graph and caches them as Uniswap SDK Pair instances.
     * @param graphEndpoint The GraphQL endpoint URL
     */
    loadAllPairsFromGraph(graphEndpoint: string): Promise<void>;
    waitForPairsLoaded(): Promise<void>;
    createSDKPair(pair: {
        id: string;
        token0: {
            id: string;
            symbol: string;
            name: string;
            decimals: string | number;
        };
        token1: {
            id: string;
            symbol: string;
            name: string;
            decimals: string | number;
        };
        reserve0?: string;
        reserve1?: string;
        positionValueUsd?: number;
        totalTokens?: number;
    }): Pair;
    /**
     * Returns the cached pairs for use in routing.
     */
    getPairs(): Pair[];
    /**
     * Finds the best trade path using Uniswap SDK for a given input amount.
     * Returns the best path as an array of addresses, or null if no trade found.
     */
    private getBestTradePath;
    calculateExpectedOutput(sellToken: Erc20Token, buyToken: Erc20Token, amountIn: string): Promise<{
        amount: string;
        path: string[];
    }>;
    checkApproval(tokenAddress: string, amount: string, spenderAddress: string): Promise<boolean>;
    approveToken(tokenAddress: string, spenderAddress: string, amount: string): Promise<string>;
    swapTokens(fromToken: Erc20Token, toToken: Erc20Token, amountInWei: bigint, amountOutMinWei: bigint, path: string[], deadline: number, settings: SwapSettings): Promise<string>;
    getPairAddress(tokenA: string, tokenB: string): Promise<string>;
    checkLiquidityExists(tokenA: string, tokenB: string): Promise<boolean>;
    createTrade(fromToken: Erc20Token, toToken: Erc20Token, amountIn: string, slippageTolerance?: number): Promise<Trade<Token, Token, TradeType>>;
    /**
     * Fetch tokens from the graph endpoint (subgraph)
     * @param graphEndpoint The GraphQL endpoint URL
     * @param search Optional search string for symbol or name
     */
    getTokensFromGraph(graphEndpoint: string, search?: string): Promise<Erc20Token[]>;
}
//# sourceMappingURL=swap.service.d.ts.map