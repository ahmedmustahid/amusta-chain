const Block = require('./block');

describe('Block',()=>{
    let data, lastBlock, block;
    beforeEach(()=> {
        data = 'bar';
        lastblock = Block.genesisBlock();
        block = Block.mineBlock(lastblock,data);

    }); 
    it('sets the `data` to match the input ',()=> {
        expect(data).toEqual(data);
    });
    it('sets the `lastBlockHash` to match the hash of the last block',()=>{
        expect(block.lastBlockHash).toEqual(lastblock.ownHash);
    });
});