const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');

class Miner {
    constructor(blockchain,  transactionPool, wallet, p2pServer ){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;

    }

    mine(){
        //get valid transactions from the pool
        const validTransactions = this.transactionPool.validTransactions();
        //include a reward for the miner
        validTransactions.push(Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet()));
        //validTransactions.push(Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet()));
        //create a block with valid transaction
        const block = this.blockchain.addBlock(validTransactions);
        //synchronize chains in the p2p server
        this.p2pServer.syncChain();
        //clear the transaction pool local to this miner
        this.transactionPool.clear(); 
        //broadcast to every miner to clear their transaction pools
        this.p2pServer.broadcastClearTransaction();
        return block;
    }
}

module.exports = Miner;