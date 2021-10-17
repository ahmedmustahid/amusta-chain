const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transactions',() => {
    let transaction, wallet, recipient, amount;

    beforeEach(()=>{
        wallet = new Wallet();
        amount = 50;
        recipient = 'r3c1p13nt';
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('outputs the `amount` subtracted from the wallet balance',() => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
    });


    it('outputs the `amount` added to the recipient\'s balance',() => {
        expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount);
    });

    it('inputs the balance of the wallet',()=>{
        expect(transaction.input.amount).toEqual(wallet.balance);
    });

    it('validates a valid transaction',()=>{
        expect(Transaction.verifyTransaction(transaction)).toBe(true);
    });

    describe('if transacting with an amount that exceeds the balance',()=>{
        beforeEach(()=>{
            amount = 50000;
            transaction = Transaction.newTransaction(wallet, recipient, amount);
        });

        it('transaction will not happen because the transacted `amount` is higher than the balance',()=>{
            expect(transaction).toEqual(undefined);
        })
    });
});

