import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import searchView from './views/searchView.js';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView._renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView._errorMessage();
  }
};

const controlSearchRecipe = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResult(query);
    // console.log(model.state.search.results);
    searchView.render(model.state.search.results);
  } catch (error) {}
};

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
//alternative when multiple event calling same callback

// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipe)
// );
//publisher subscriber design pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  SearchView.addHandlerRender(controlSearchRecipe);
};
init();

//MVC Architechture
//Why worry about arechitecture ?
//First architecture will give our project the structure in which we can then write the code
//Like a house, software needs a structure the way we organized our code

//Maintainability: for future

//Expandability: to add new feature in future

//We established architecture attern like MVC , Flux, etc.

/***********************
 *
 * CONCEPTs of ANY ARCHITECTURE
 *
 ************************/
// 1. Business Logic -> 2. State -> 3. HTTP Library -> 4. Application Logic (Router) -> 5. Presentation Logic(UL Layer)
