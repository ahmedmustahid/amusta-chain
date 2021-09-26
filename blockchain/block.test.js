const Block = require('./block');
const { DIFFICULTY } = require('../config');

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

    it('generates a hash that matches the difficulty',()=>{
        expect(block.ownHash.substring(0,block.difficulty)).toEqual('0'.repeat(block.difficulty));
        //console.log(block.toString());
    });

    it('lowers difficulty for slowly mined blocks',()=>{
        expect(Block.adjustDifficulty(block, block.timestamp + 360000)).toEqual(block.difficulty -1);
    });


    it('raises difficulty for slowly mined blocks',()=>{
        expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(block.difficulty + 1);
    });
});