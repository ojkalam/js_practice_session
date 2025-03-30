import { async } from 'regenerator-runtime';
import { API_KEY, API_URL } from './config.js';
import { RESULTS_PER_PAGE } from './config.js';
import { getJSON, sendJSON } from './views/helper.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}recipes/${id}?key=${API_KEY}`);
    state.recipe = data.data.recipe;
    if (state.bookmarks.some(bm => bm.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    // alert(err);
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.page = 1;
    state.search.query = query;
    const data = await getJSON(
      `${API_URL}recipes?key=${API_KEY}&search=${query}`
    );
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        key: recipe.key,
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
    ing.quantity = (
      (ing.quantity * newServings) /
      state.recipe.servings
    ).toFixed(2);
    //newQt = oldQT * newServings /oldServings
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  //add bookmark
  state.bookmarks.push(recipe);
  //mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  //Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  //mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
  console.log(state.bookmarks);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

//upload recipe
export const uploadRecipe = async function (newRecipe) {
  const ingredients = Object.entries(newRecipe)
    .filter(entry => {
      return entry[0].startsWith('ingredient') && entry[1] !== '';
    })
    .map(ing => {
      const ingArr = ing[1].split(',').map(el => el.trim());
      if (ingArr.length !== 3) {
        throw new Error('Wrong Ingredient format. Plase input correct format');
      }
      const [quantity, unit, description] = ingArr;
      return { quantity: quantity ? +quantity : null, unit, description };
    });
  const recipe = {
    title: newRecipe.title,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    servings: newRecipe.servings,
    cooking_time: newRecipe.cookingTime,
    source_url: newRecipe.sourceUrl,
    ingredients,
  };
  const res = await sendJSON(`${API_URL}recipes?key=${API_KEY}`, recipe);
  state.recipe = res.data.recipe;
  addBookmark(res.data.recipe);
};
