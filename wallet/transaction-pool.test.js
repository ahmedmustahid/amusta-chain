const TransactionPool = require('../wallet/transaction-pool');
const Transaction = require('../wallet/transaction');
const Wallet = require('../wallet/index');
const { isTaggedTemplateExpression, exportAllDeclaration } = require('@babel/types');
const Blockchain = require('../blockchain');

describe('TransactionPool',()=>{
    let tp, transaction, wallet, bc;

    beforeEach(()=>{
        tp = new TransactionPool();
        bc = new Blockchain();
        wallet = new Wallet();
        // transaction = Transaction.newTransaction(wallet, 'r4nd-4dr355', 30);
        // tp.updateOrAddTransaction(transaction);
        
        transaction = wallet.createTransaction('r4nd-4dr355', 30, bc, tp);
    });

    it('adds a transaction to the pool',()=>{
        expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
    });

    it('updates a transaction in the pool',()=>{
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = transaction.update(wallet,'foo-4ddr355', 40);
        tp.updateOrAddTransaction(newTransaction);

        expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id))).not.toEqual(oldTransaction);
    });

    it('clears transactions',()=>{
        tp.clear();
        expect(tp.transactions).toEqual([]);
    });

    describe('mixing valid and corrupt transaction',() => {
        let validTransactions;

        beforeEach(() => {
            validTransactions = [...tp.transactions];

            for (let i =0; i<6; i++) {
                wallet = new Wallet();
                transaction = wallet.createTransaction('r4nd-4dr355', 30, bc, tp);

                if (i%2 == 0) {
                    transaction.input.amount = 99999;
                } else {
                    validTransactions.push(transaction);
                }
            }

            console.log(`valid ones ${JSON.stringify(validTransactions)}`);
        });

        it('shows a difference between valid and corrupt transactions',()=>{
            expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions));
        });

        it('gets valid transactions',()=>{
            expect(tp.validTransactions()).toEqual(validTransactions);
        });
    });
});