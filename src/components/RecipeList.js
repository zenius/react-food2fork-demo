import React from "react";
import Recipe from "./Recipe";
import RecipeSearch from "./RecipeSearch";

class RecipeList extends React.Component {
  render() {
    const {
      recipes,
      handleDetails,
      search,
      handleChange,
      handleSubmit,
      error
    } = this.props;
    return (
      <React.Fragment>
        <RecipeSearch
          search={search}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <div className="container my-5">
          {/* start: tite */}
          <div className="row">
            <div className="col-10 mx-auto col-md-6 text-center text-uppercase mb-3">
              <h1 className="text-slanted">Recipe list</h1>
            </div>
          </div>
          {/* end: tite */}
          <div className="row">
            {error ? (
              <h1 className="col-10 mx-auto text-danger text-center">
                {error}
              </h1>
            ) : (
              recipes.map(recipe => {
                return (
                  <Recipe
                    key={recipe.recipe_id}
                    recipe={recipe}
                    handleDetails={() => handleDetails(1, recipe.recipe_id)}
                  />
                );
              })
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RecipeList;
