import { getRecipesList } from '../getApi.js';
import { viewIngredientsList } from './listOfIngredients.js';
// import {listOfRecipes,listOfIngredients,shopList } from '../main/main.js';
import {main } from './main.js';
let recipeList;

export const listOfRecipes = document.createElement('div','apeear');
listOfRecipes.classList.add('listOfRecipes');

export async function viewRecipesList(nameOfDish) {
         main.innerHTML=" ";
         listOfRecipes.innerHTML =" ";

    try {
        recipeList = await getRecipesList(nameOfDish);
        // recipeList = [{ id: 656329, title: 'Pizza bites with pumpkin', image: 'https://spoonacular.com/recipeImages/656329-312x231.jpg', imageType: 'jpg' },
        // { id: 680975, title: 'BLT Pizza', image: 'https://spoonacular.com/recipeImages/680975-312x231.jpg', imageType: 'jpg' },
        // { id: 663136, title: 'Thai Pizza', image: 'https://spoonacular.com/recipeImages/663136-312x231.jpg', imageType: 'jpg' },
        // { id: 716300, title: 'Plantain Pizza', image: 'https://spoonacular.com/recipeImages/716300-312x231.jpg', imageType: 'jpg' },
        // { id: 665769, title: 'Zucchini Pizza Boats', image: 'https://spoonacular.com/recipeImages/665769-312x231.jpg', imageType: 'jpg' },
        // { id: 655698, title: 'Pepperoni Pizza Muffins', image: 'https://spoonacular.com/recipeImages/655698-312x231.jpg', imageType: 'jpg' },
        // { id: 622598, title: 'Pittata - Pizza Frittata', image: 'https://spoonacular.com/recipeImages/622598-312x231.jpg', imageType: 'jpg' },
        // { id: 641893, title: 'Easy Cheesy Pizza Casserole', image: 'https://spoonacular.com/recipeImages/641893-312x231.jpg', imageType: 'jpg' },
        // { id: 655847, title: 'Pesto Veggie Pizza', image: 'https://spoonacular.com/recipeImages/655847-312x231.jpg', imageType: 'jpg' },
        // { id: 654523, title: 'Paneer & Fig Pizza', image: 'https://spoonacular.com/recipeImages/654523-312x231.jpg', imageType: 'jpg' }]
        // console.log(recipeList);

        recipeList.map((item) => {
            const singleRecipe = document.createElement("div");
            singleRecipe.classList.add('singleRecipe', 'apeear');
            singleRecipe.setAttribute("id", item.id);
            let recipeTitle = document.createElement("div");
            recipeTitle.classList.add('recipeTitle');
            recipeTitle.innerHTML = item.title;
            let recipeImg = document.createElement("img");
            recipeImg.classList.add('recipeImg')
            recipeImg.src = item.image;
            singleRecipe.appendChild(recipeImg);
            singleRecipe.appendChild(recipeTitle);
            listOfRecipes.appendChild(singleRecipe);
            main.appendChild(listOfRecipes);
            singleRecipe.addEventListener("click", () => { viewIngredientsList(item) });
        })


    }
    catch {
        return ((err) => console.log(err));
    }
}

