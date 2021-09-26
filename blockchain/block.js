const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, lastBlockHash, ownHash, data){
        this.timestamp = timestamp;
        this.lastBlockHash = lastBlockHash;
        this.ownHash = ownHash;
        this.data = data;
    }

    toString(){
        return `Block -
            Timestamp : ${this.timestamp}
            Last Block Hash: ${this.lastBlockHash.substring(0, 10)}
            Own Hash : ${this.ownHash.substring(0, 10)}
            Data : ${this.data}`;
    }

    static genesisBlock(){
        return new this('Genesis time','-----','f1r57-h45h',[]);
    }

    static mineBlock(lastBlock, data){
        const timestamp = Date.now();
        const lastBlockHash = lastBlock.ownHash;
        const ownHash = Block.createHash(timestamp,lastBlockHash,data);

        return new this(timestamp, lastBlockHash, ownHash, data);
    }

    static createHash(timestamp, lastBlockHash, data){
        return SHA256(`${timestamp}${lastBlockHash}${data}`).toString();
    }

    static createBlockHash(block){
        const {timestamp, lastBlockHash, data} = block;
        return Block.createHash(timestamp, lastBlockHash, data);
    }
}

module.exports = Block ;