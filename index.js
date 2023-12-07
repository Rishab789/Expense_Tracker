
localStorageGet();

let iconCounter = 0;

function submitHandler(event) {
    iconCounter++;
    event.preventDefault();

    //  Income Expense Balance value Section 
    let balanceElement = document.querySelector('.balance');

    let incomeElement = document.querySelector('.income');
    let expenseElement = document.querySelector('.expense');

    let balance = balanceElement.innerText;

    let income = incomeElement.innerText;
    let expense = expenseElement.innerText;

    let itemText = document.getElementById("item-title").value;
    let itemAmount = document.getElementById("item-amount").value;

    // Assign the unique ID to the element

    let icon = document.createElement('i');
    icon.classList.add('bi');
    icon.classList.add('bi-trash3');
    icon.id = iconCounter.toString();

    //-----------------------------//

    let items = JSON.parse(localStorage.getItem("items")) || [];

    items.push({ title: itemText, amount: itemAmount, id: icon.id });

    localStorage.setItem("items", JSON.stringify(items));



    //Here You have to start . you are calculating the income and exxpense here and putting the income and expense to the local storage.

    // Calculate the new income and expense
    let totalIncome = items.reduce((total, item) => {
        return total + (item.amount > 0 ? Math.abs(item.amount) : 0);
    }, 0);

    let totalExpense = items.reduce((total, item) => {
        return total + (item.amount < 0 ? Math.abs(item.amount) : 0);
    }, 0);



    // Update the displayed income, expense, and balance
    income = totalIncome;
    incomeElement.innerText = income;

    expense = totalExpense;
    expenseElement.innerText = expense;

    balance = income - expense;
    balanceElement.innerText = balance;

    // Update local storage
    let balanceItems = JSON.parse(localStorage.getItem('balanceItems')) || [];
    balanceItems.push({ income: income, expense: expense, balance: balance });
    localStorage.setItem('balanceItems', JSON.stringify(balanceItems));

    let itemDiv = document.querySelector(".item-div");

    let p1 = document.createElement('p');
    p1.textContent = itemText;
    let p2 = document.createElement('p');
    p2.textContent = itemAmount;

    let addItems = document.createElement("div");
    addItems.classList.add("add-items");

    addItems.appendChild(p1);
    addItems.appendChild(p2);
    addItems.appendChild(icon);
    itemDiv.appendChild(addItems);
    uiUpdate()
}



function uiUpdate() {
    let itemDiv = document.querySelector(".item-div");
    itemDiv.innerHTML = "";
    localStorageGet();

}



function localStorageGet() {


    let items = JSON.parse(localStorage.getItem("items")) || [];


    items.forEach(item => {
        let p1 = document.createElement('p');
        p1.textContent = item.title;
        let p2 = document.createElement('p');
        p2.textContent = item.amount;
        let addItems = document.createElement("div");
        addItems.classList.add("add-items");

        ////////////icon id initialization///////

        let icon = document.createElement('i');
        icon.classList.add('bi');
        icon.classList.add('bi-trash3');

        icon.addEventListener('click', () => {



            function removeItem(iconId) {
                let items = JSON.parse(localStorage.getItem("items")) || [];
                let indexToRemove = items.filter(item => item.id !== iconId);
                items = indexToRemove;
                localStorage.setItem("items", JSON.stringify(items));
                uiUpdate();


            }
            removeItem(item.id);
        });


        addItems.appendChild(p1);
        addItems.appendChild(p2);

        addItems.appendChild(icon);

        itemDiv.appendChild(addItems);

    })




}










