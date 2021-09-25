const { genesisBlock } = require("./block");
const Block = require("./block");

const fooBlock = Block.mineBlock(Block.genesisBlock(),'foo');
console.log(fooBlock.toString());