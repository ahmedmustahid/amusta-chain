class Miner {
    constructor(blockchain,  transactionPool, wallet, p2pServer ){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.p2pServer = p2pServer;

    }

    mine(){
        const validTransactions = this.transactionPool.validTransactions();

        //include a reward for the miner
        //create a block with valid transaction
        //synchronize chains in the p2p server
        //clear the transaction pool
        //broadcast to every miner to clear their transaction pools
    }
}

module.exports = Miner;