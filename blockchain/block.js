const { DIFFICULTY, MINE_RATE } = require('../config');

const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, lastBlockHash, ownHash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.lastBlockHash = lastBlockHash;
        this.ownHash = ownHash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString(){
        return `Block -
            Timestamp       : ${this.timestamp}
            Last Block Hash : ${this.lastBlockHash.substring(0, 10)}
            Own Hash        : ${this.ownHash.substring(0, 10)}
            Nonce           : ${this.nonce}
            Difficulty      : ${this.difficulty}
            Data            : ${this.data}`;
    }

    static genesisBlock(){
        return new this('Genesis time','-----','f1r57-h45h',[],0, DIFFICULTY);
    }

    static mineBlock(lastBlock, data){

        let ownHash, timestamp;
        let { difficulty } = lastBlock;
        const lastBlockHash = lastBlock.ownHash;

        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            ownHash = Block.createHash(timestamp,lastBlockHash,data,nonce, difficulty);

        } while(ownHash.substring(0,difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, lastBlockHash, ownHash, data, nonce, difficulty);
    }

    static createHash(timestamp, lastBlockHash, data, nonce, difficulty){
        return SHA256(`${timestamp}${lastBlockHash}${data}${nonce}${difficulty}`).toString();
    }

    static createBlockHash(block){
        const {timestamp, lastBlockHash, data, nonce, difficulty} = block;
        return Block.createHash(timestamp, lastBlockHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime){
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty -1 ;
        return difficulty;
    }
}

module.exports = Block ;