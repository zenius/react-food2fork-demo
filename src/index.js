import React from "react";
import ReactDOM from "react-dom";

import { recipes } from "./tempList";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

import "./styles.css";

class App extends React.Component {
  state = {
    recipes: recipes,
    url:
      "https://www.food2fork.com/api/search?key=c68a9f467a4ac4ebc7a9318b020b948e",
    details_id: 35375,
    pageIndex: 0,
    search: "",
    error: ""
  };

  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      console.log("jsonData ", jsonData);
      if (jsonData.recipes.length === 0) {
        this.setState({ error: "No Results Found" });
      } else {
        this.setState({ recipes: jsonData.recipes, error: "" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    this.getRecipes();
  }

  displayPage = index => {
    const { recipes, details_id, search, error } = this.state;
    switch (index) {
      default:
      case 0:
        return (
          <RecipeList
            recipes={recipes}
            handleDetails={this.handleDetails}
            search={search}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            error={error}
          />
        );
      case 1:
        return (
          <RecipeDetails
            details_id={details_id}
            handleIndex={this.handleIndex}
          />
        );
    }
  };

  handleIndex = index => {
    this.setState({ pageIndex: index });
  };
  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    });
  };

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { search } = this.state;
    const base_url =
      "https://www.food2fork.com/api/search?key=c68a9f467a4ac4ebc7a9318b020b948e";
    const query = "&q=";

    this.setState(
      () => {
        return {
          url: `${base_url}${query}${search}`,
          search: ""
        };
      },
      () => {
        this.getRecipes();
      }
    );
  };

  render() {
    // console.log("recipes ", this.state.recipes);
    const { pageIndex } = this.state;
    return <React.Fragment>{this.displayPage(pageIndex)}</React.Fragment>;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
