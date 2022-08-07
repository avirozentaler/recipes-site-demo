import { viewRecipesList } from './listOfRecipes.js';
import { viewIngredientsList } from './listOfIngredients.js'

export const deshboard = document.createElement('div');
deshboard.classList.add('deshboard');

let siteDescription = document.createElement('div');
siteDescription.classList.add('siteDescription');
let siteDescriptionP = document.createElement('div');
siteDescriptionP.classList.add('siteDescriptionP');
siteDescriptionP.innerHTML = 'recipes site';
siteDescription.appendChild(siteDescriptionP);

let searchRecipesDiv = document.createElement('div');
searchRecipesDiv.classList.add('searchRecipesDiv',);
let searchInput = document.createElement('input');
searchInput.classList.add('searchInput');
searchInput.placeholder = 'enter name of dish'

let searchButton = document.createElement('input');
searchButton.classList.add('searchButton', 'g');
searchButton.value = 'search';
searchRecipesDiv.appendChild(searchInput);
searchRecipesDiv.appendChild(searchButton);
searchButton.addEventListener('click', () => viewRecipesList(searchInput.value));

let wishListDiv = document.createElement('div');
wishListDiv.classList.add('wishListDiv');

const wishList = document.createElement('div');
wishList.classList.add('wishList', 'hidden');

let wishListIcon = document.createElement('div');
wishListIcon.classList.add('wishListIcon');
wishListIcon.innerHTML = '&#10084'

wishListIcon.addEventListener('mouseover', showFavouriteList);
wishList.addEventListener('mouseleave', unShowFavouriteList);

wishListDiv.appendChild(wishList);
wishListDiv.appendChild(wishListIcon);
deshboard.appendChild(siteDescription);
deshboard.appendChild(searchRecipesDiv,);
deshboard.appendChild(wishListDiv);

export function showFavouriteList() {
    wishList.innerHTML = ' ';
    let tempRecipes = {...localStorage };

    const keys = Object.keys(tempRecipes);
    console.log(tempRecipes)

    let existingRecipes = keys.map((item) => {
        return JSON.parse(tempRecipes[item]);
    })
  
    if (existingRecipes.length) {
        existingRecipes.map((item) => {
            const singleRecipe = document.createElement("div");
            singleRecipe.classList.add('singleRecipe');
            singleRecipe.setAttribute("id", item.id);
            let recipeTitle = document.createElement("div");
            recipeTitle.classList.add('recipeTitle');
            recipeTitle.innerHTML = item.title;
            let recipeImg = document.createElement("img");
            recipeImg.classList.add('recipeImg')
            recipeImg.src = item.image;
            singleRecipe.appendChild(recipeImg);
            singleRecipe.appendChild(recipeTitle);
            singleRecipe.addEventListener("click", () => { viewIngredientsList(item) });

            wishList.appendChild(singleRecipe);
        })
    }
    else {
        console.log('empty')
        const singleRecipe = document.createElement("div");
        singleRecipe.classList.add('singleRecipe');
        singleRecipe.innerHTML = "no saved recipes";
        wishList.appendChild(singleRecipe);
    }
    wishList.classList.remove('hidden');
}


export function unShowFavouriteList() {
    wishList.classList.add('hidden');
}




