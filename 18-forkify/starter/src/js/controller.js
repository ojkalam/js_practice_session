import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView._renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
//alternative when multiple event calling same callback
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));

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
