import { getIngredientsList } from '../getApi.js';
import { main } from './main.js';
import { printShopList, shopList } from './printShopList.js';
let data = null;
let numOfServing = 0;
let timeToReady = 0;


export const listOfIngredients = document.createElement('div');
listOfIngredients.classList.add('listOfIngredients');


export async function viewIngredientsList(recipe) {
    console.log(recipe);
    shopList.remove();
    listOfIngredients.innerHTML = " ";

    try {
        data = await getIngredientsList(recipe.id);       
        numOfServing = data.servings;
        timeToReady = data.readyInMinutes

        let header = document.createElement('div');  //// create the header area
        header.classList.add('header');

        let viewTimeToReady = document.createElement('span');
        viewTimeToReady.classList.add('viewTimeToReady');
        viewTimeToReady.innerHTML = '&#9200 ' + timeToReady + ' minutes';
        header.appendChild(viewTimeToReady);

        let changeAmount = document.createElement('span');
        changeAmount.classList.add('changeAmount');

        let numServ = document.createElement('span');
        numServ.classList.add('numServ')
        numServ.setAttribute('id', 'numServ');
        numServ.innerHTML = ` for ${numOfServing}  people `;

        let incBtm = document.createElement('button');
        incBtm.classList.add('btmAmount');
        incBtm.innerHTML = '+';
        let decBtm = document.createElement('button');
        decBtm.classList.add('btmAmount');
        decBtm.innerHTML = '-';
        incBtm.addEventListener('click', changeMe);
        decBtm.addEventListener('click', changeMe);

        changeAmount.appendChild(numServ);
        changeAmount.appendChild(incBtm);
        changeAmount.appendChild(decBtm);

        const addMeToStorageIcon = document.createElement('button');
        addMeToStorageIcon.classList.add('addToStorageIcon');
        addMeToStorageIcon.innerHTML = '&#10084';
        addMeToStorageIcon.addEventListener('click', () => { addToStorage(recipe) })//

        header.appendChild(viewTimeToReady);
        header.appendChild(changeAmount);
        header.appendChild(addMeToStorageIcon);
        listOfIngredients.appendChild(header);

        const ingredients = document.createElement('div'); //// create the list area
        ingredients.classList.add('ingredients');

        data.extendedIngredients.map(item => {       ///// loop of all products 
            let singleIngredient = document.createElement('span');

            singleIngredient.classList.add('singleIngredient')

            let vIcon = document.createElement('span');
            vIcon.innerHTML = '&#10003' + ' ';
            vIcon.style.color = 'orange';

            const IngredientDetails = document.createElement('span');
            IngredientDetails.classList.add('IngredientDetails');

            const IngredientName = document.createElement('span');
            IngredientName.innerHTML = ` ${item.name} `;

            const IngredientAmount = document.createElement('span');
            IngredientAmount.classList.add('IngredientAmount');
            IngredientAmount.innerText = item.measures.metric.amount.toString().substring(0, item.measures.metric.amount.toString().indexOf('.') + 2);;

            const IngredientUnitShort = document.createElement('span');
            IngredientUnitShort.innerHTML = ` ${item.measures.metric.unitShort} `;

            IngredientDetails.appendChild(IngredientName);
            IngredientDetails.appendChild(IngredientAmount);
            IngredientDetails.appendChild(IngredientUnitShort);

            singleIngredient.appendChild(vIcon)
            singleIngredient.appendChild(IngredientDetails);

            ingredients.appendChild(singleIngredient);
            listOfIngredients.appendChild(ingredients);

        })

        const bottomIngredients = document.createElement('div');
        bottomIngredients.classList.add('bottomIngredients');
        listOfIngredients.appendChild(bottomIngredients);

        const addMe = document.createElement('p');
        addMe.classList.add('addMe');
        addMe.innerHTML = 'make shope list';
        addMe.addEventListener('click', () => { makeShopeList(data.extendedIngredients) })
        bottomIngredients.appendChild(addMe);
        main.appendChild(listOfIngredients);
    }
    catch {
        return ((err) => console.log(err))
    }
}


export function changeMe(event) {

    let amount = document.querySelectorAll('.IngredientAmount');
    let prevNumOfServing = numOfServing;
    let numServDiv = document.querySelector('.numServ');

    if (event.target.textContent == '+') {
        numOfServing++;
        numServDiv.innerHTML = ` for ${numOfServing}  people `;
    }
    else {
        if (numOfServing > 1) {
            numOfServing--;
            numServDiv.innerHTML = ` for ${numOfServing}  people `;
        }
    }

    data.extendedIngredients.map((item) => {
        let tempAmount = (item.innerHTML / prevNumOfServing) * numOfServing;
        item.innerHTML = tempAmount.toString().substring(0, tempAmount.toString().indexOf('.') + 2);
    })
    amount.forEach((item) => {
        let tempAmount = (item.innerHTML / prevNumOfServing) * numOfServing;
        item.innerHTML = tempAmount.toString().substring(0, tempAmount.toString().indexOf('.') + 2);
    })
}



export function addToStorage(recipe) {

    let nameOfRecipe = recipe.title;
    let existingRecipes = JSON.parse(localStorage.getItem(nameOfRecipe));
    if (!existingRecipes) {
        localStorage.setItem(nameOfRecipe, JSON.stringify(recipe))
    }
}


export function makeShopeList(data) {
    printShopList(data);
}