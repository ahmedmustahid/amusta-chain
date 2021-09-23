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
            Data : ${this.data}
        `
    }
}

module.exports = Block ;