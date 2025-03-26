export const state = {};
export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    state.recipe = data.data.recipe;
  } catch (err) {
    alert(err);
  }
};
