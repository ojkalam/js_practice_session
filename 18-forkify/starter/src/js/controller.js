import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultsView from './views/searchResultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

/***********************
 * What Does This Do?
module.hot

This checks if Hot Module Replacement (HMR) is enabled.

HMR allows modules to be updated without a full page reload, making development faster.

module.hot.accept()

This tells Parcel not to reload the page when a module changes.

Instead, it accepts updates for the current module and replaces only the changed code.

************************/

// if (module.hot) {
//   module.hot.accept();
// }

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    searchResultsView.update(model.getSearchResultsPage());
    //each time display recipe bookmark view should updated
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.errorMessage();
  }
};

const controlSearchRecipe = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    searchResultsView.renderSpinner();
    await model.loadSearchResult(query);
    searchResultsView.render(model.getSearchResultsPage());
    //initial pagination button
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
    searchResultsView.errorMessage();
  }
};

const controlPagination = function (gotoPage) {
  searchResultsView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings (in state)
  model.updateServings(newServings);
  //update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlBookmarkView = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlAddBookmark = function () {
  //add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state);
  //update recipe view
  recipeView.update(model.state.recipe);
  //render bookarmark view
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipeView = async function (newRecipe) {
  try {
    //here we need async function to catch the error from model async function during rejected promise
    await model.uploadRecipe(newRecipe);
    addRecipeView.message();
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);

    //change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`); //state, title, url
    setTimeout(function () {
      addRecipeView._toggleOverlayWindow();
    }, 2000);
  } catch (error) {
    addRecipeView.errorMessage(error.message);
  }
};

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
//alternative when multiple event calling same callback

// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipe)
// );
//publisher subscriber design pattern
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarkView);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerRender(controlSearchRecipe);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipeView);
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
