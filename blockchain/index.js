const { mode } = require("crypto-js");
const Block = require("./block");

class Blockchain {
    constructor(){
        this.chain = [Block.genesisBlock()]; //chain is a sequence of blocks
    }

    addBlock(data){
        const block = Block.mineBlock(this.chain[this.chain.length -1],data); 
        this.chain.push(block);

        return block;
    }

    isValidChain(chain){
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesisBlock())) return false; 

        for (let i =1; i < chain.length; i++){
            const currentBlock = chain[i];
            const lastBlock = chain[i-1];

            if (currentBlock.lastBlockHash !== lastBlock.ownHash || 
                currentBlock.ownHash !== Block.createBlockHash(currentBlock)) {
                    return false;
            }

        }

        return true;
    }

    replaceChain(newChain){
        if (newChain.length <= this.chain.length){
            console.log('Received chain is not longer than the current chain');
            return;
        } else if (!this.isValidChain(newChain)){
            console.log('Received chain is not valid');
        }

        console.log('Replacing blockchain with new chain');
        this.chain = newChain ;
    }
}

module.exports = Blockchain;