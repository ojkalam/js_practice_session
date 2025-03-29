import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './views/helper.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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
