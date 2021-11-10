const { id } = require("../chain-util");
const Transaction = require("../wallet/transaction");


class TransactionPool {
    constructor(){
        this.transactions = [];
    }

    updateOrAddTransaction(transaction){
        let transactionWithId = this.transactions.find(t => t.id === transaction.id);

        if (transactionWithId)　{
            this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
            console.log(`Updated transactionWithID ${transaction.id}`);
        } else {
            this.transactions.push(transaction);
            console.log(`Added transactionWithID ${transaction.id}`);
        }
    }

    existingTransaction(address) {
        console.log(`existing transactions are ${JSON.stringify(this.transactions)}`);
        return this.transactions.find(t => t.input.address == address);
    }

    validTransactions(){
        return this.transactions.filter(transaction => {
            const outputTotal = transaction.outputs.reduce((total, output) =>{
                return total + output.amount;
            },0);

            if (transaction.input.amount != outputTotal) {
                console.log(`Invalid transaction from ${transaction.input.address}}`);
                return ;
            }

            if (!Transaction.verifyTransaction(transaction)) {
                console.log(`Invalid signature ${transaction.input.address}`);
                return ;
            }

            return transaction;
        });
    }

    clear() {
        this.transactions = [];
    }
}

module.exports = TransactionPool;