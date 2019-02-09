import React from "react";
import { recipe } from "../tempDetails";

class RecipeDetails extends React.Component {
  state = {
    recipe: recipe
  };
  async componentDidMount() {
    const details_id = this.props.details_id;
    const url = `https://www.food2fork.com/api/get?key=c68a9f467a4ac4ebc7a9318b020b948e&rId=${details_id}`;
    try {
      const data = await fetch(url);
      const jsonData = await data.json();
      this.setState(
        (state, props) => {
          return { recipe: jsonData.recipe };
        },
        () => {}
      );
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log("recipe details ", recipe);
    const {
      image_url,
      publisher,
      publisher_url,
      source_url,
      title,
      ingredients
    } = this.state.recipe;

    const { handleIndex } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
              <button
                type="button"
                className="btn btn-warning mb-5 text-capitalize"
                onClick={() => handleIndex(0)}
              >
                back to recipe list
              </button>
              <img src={image_url} alt={title} className="d-block w-100" />
            </div>
            <div className="col-10 mx-auto col-md-6 my-3">
              <h6 className="text-capitalize">{title}</h6>
              <h6 className="text-warning text-capitalize text-slanted">
                {" "}
                provided by {publisher}
              </h6>
              <a
                href={publisher_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-2 mr-3 text-capitalize"
              >
                publisher webpage
              </a>
              <a
                href={source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success mt-2 text-capitalize"
              >
                recipe url
              </a>
              <ul className="list-group mt-4">
                <h2 className="mt-3 mb-3">Ingredients</h2>
                {ingredients.map((ingredient, index) => {
                  return (
                    <li key={index} className="list-group-item text-slanted">
                      {" "}
                      {ingredient}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RecipeDetails;
