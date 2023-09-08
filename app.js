const add = document.querySelector("#add");
const screen = document.querySelector("#screen")
const withdraw = document.querySelector("#withdraw");
const transaction = document.querySelector("#history");
const form = document.querySelector("form");
const msg = document.querySelector('#message')


form.addEventListener('submit', (e) => {
    let date = new Date()
    date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    console.log(date);
    e.preventDefault()
    const formAmount = document.querySelector("#amount").value;
    wallet.deposit(Number(formAmount), date)
    
})

withdraw.addEventListener('click', (e) => {
    let date = new Date()
    date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    console.log(date);
    const formAmount = document.querySelector("#amount").value;

    e.preventDefault()
    wallet.withdraw(Number(formAmount), date)
})

transaction.addEventListener('click', (e) => {
    e.preventDefault()
   const lists = wallet.getTransactions()
   console.log(lists);
   let li = ''
   for (const list of lists) {
       li += `<li>The transaction type is ${list.type}, the amount is $${list.amount} and transaction date is ${list.date}</li>`
    document.querySelector('ol').innerHTML = li
   }
})



class Wallet {
    constructor() {
        this._balance = 0;
        this._transactions = [];
        this._transactionDate = ''
    }
    
    deposit(amount, dateTrans) {
        this._balance += amount;
        this._transactionDate = dateTrans
        this._processDeposit(amount, dateTrans);
        this._updateScreen()
        msg.textContent = `$${amount} has been withdrawn successfully`
               msg.style.color = 'green'
        this._clearInput()
    }
    
    withdraw(amount, dateTrans) {
        if (amount > this._balance || amount === 0) {
               msg.textContent = "Not enough funds"
               msg.style.color = 'red'
               this._clearInput()
           return
        } else {
            this._balance -= amount;
            this._transactionDate = dateTrans
            this._processWithdraw(amount, dateTrans);
            this._updateScreen()
            msg.textContent = `$${amount} has been withdrawn successfully`
               msg.style.color = 'blue'
            this._clearInput()
            return
        }
    }
    
    _processDeposit(amount,date) {
    this._transactions.push({ type: "deposit", amount,date });
}
_processWithdraw(amount,date) {
    this._transactions.push({ type: "withdraw", amount , date});
}

_updateScreen(){
    screen.innerText = this.getBalance()
}

_clearInput(){
    document.querySelector("#amount").value = 0
    setTimeout(() => {
        document.querySelector('#message').textContent = ''
    }, 3000);
}

getBalance() {
    return this._balance;
}


getTransactions() {
    return this._transactions;
}

}


// console.log(amount);

const wallet = new Wallet();