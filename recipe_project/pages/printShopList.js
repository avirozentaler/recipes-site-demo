import { main } from './main.js';

let list;

export const shopList = document.createElement('div');
shopList.classList.add('shopList');

export function printShopList(data) {
    shopList.innerHTML = " ";
    list = data.map((item, index) => {
        return {
            id: index,
            name: item.name,
            amount: item.measures.metric.amount,
            unitShort: item.measures.metric.unitShort
        }
    })
    console.log(data);

    const titleOfShoppingList = document.createElement('div');
    titleOfShoppingList.classList.add('titleOfShoppingList');

    const titleOfShoppingListText = document.createElement('div');
    titleOfShoppingList.classList.add('titleOfShoppingListText');
    titleOfShoppingListText.innerHTML = 'edit your shop list';
    titleOfShoppingList.appendChild(titleOfShoppingListText);

    const bodyOfShoppingList = document.createElement('div');
    bodyOfShoppingList.classList.add('bodyOfShoppingList');

    const bottomOfShoppingList = document.createElement('div');
    bottomOfShoppingList.classList.add('bottomOfShoppingList');
    const confirmShoppingList = document.createElement('button');
    confirmShoppingList.classList.add('confirmShoppingList');
    confirmShoppingList.innerText = 'confirm the shopping list';
    bottomOfShoppingList.appendChild(confirmShoppingList);
    confirmShoppingList.addEventListener('click', makeShopList);


    list.forEach((item) => {

        const productDiv = document.createElement('div');
        productDiv.classList.add('productDiv');

        const nameOfProduct = document.createElement('p');
        nameOfProduct.classList.add('nameOfProduct');
        nameOfProduct.innerHTML = `${item.name} `;

        const amountInput = document.createElement('input');
        amountInput.classList.add('amountInput');
        amountInput.value = item.amount;

        const measures = document.createElement('p');
        measures.classList.add('measures');
        measures.innerHTML = ` ${item.unitShort} `;

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', item.id);
        deleteButton.classList.add('deleteButton');
        deleteButton.innerHTML = 'x';
        deleteButton.addEventListener('click', removreProduct)

        productDiv.appendChild(nameOfProduct);
        productDiv.appendChild(amountInput);
        productDiv.appendChild(measures);
        productDiv.appendChild(deleteButton);

        bodyOfShoppingList.appendChild(productDiv);
    })
    shopList.appendChild(titleOfShoppingList);
    shopList.appendChild(bodyOfShoppingList);
    shopList.appendChild(bottomOfShoppingList);
    main.appendChild(shopList);

}

export function removreProduct(event) {
    list = list.filter(item => item.id != event.target.id);
    event.target.parentElement.remove();
}

export function makeShopList() {
    let amountInputTemp = document.querySelectorAll('.amountInput'); 
    amountInputTemp.forEach((item)=>{
        console.log(item.value);
    })
}
