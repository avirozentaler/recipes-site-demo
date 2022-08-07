const urlRecipes = 'https://api.spoonacular.com/recipes/complexSearch?query=';
export const apiKey = '&apiKey=fd7fc864b1f548f1880a6f8952b5ae68';


export function getRecipesList(nameOfDish) {
    return fetch(urlRecipes + nameOfDish + apiKey + "").then(list => list.json()).then(data => data.results)
}

export function getIngredientsList(id) {
    return fetch('https://api.spoonacular.com/recipes/' + id + '/information?' + apiKey + "").then(information => information.json());
}

