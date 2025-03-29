import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { RESULTS_PER_PAGE } from './config.js';
import { getJSON } from './views/helper.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}recipes/${id}`);
    state.recipe = data.data.recipe;
  } catch (err) {
    // alert(err);
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}recipes?search=${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //when page = 1 then (1-1)*10 = 0
  const end = page * state.search.resultsPerPage;
  // console.log(start, end);
  return state.search.results.slice(start, end); //from 0 index to 9 index means 10 result slicing
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    //change the current ingredient array quantity
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    //newQt = oldQT * newServings /oldServings
  });
  state.recipe.servings = newServings;
};
