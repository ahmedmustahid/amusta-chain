const { id } = require("../chain-util");


class TransactionPool {
    constructor(){
        this.transactions = [];
    }

    updateOrAddTransaction(transaction){
        let transactionWithId = this.transactions.find(t => t.id === transaction.id);

        if (transactionWithId)　{
            this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
        } else {
            this.transactions.push(transaction);
        }
    }

    existingTransaction(address) {
        console.log(`existing transactions are ${this.transactions}`);
        return this.transactions.find(t => t.input.address == address);
    }
}

module.exports = TransactionPool;