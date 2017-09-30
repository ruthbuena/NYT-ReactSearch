import React from "react";
import Search from "./children/Search";
import Saved from "./children/Saved";
import helpers from "./utils/helpers";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      results: [],
      resultToSave: {},
      saved: []
    };
    this.setTerm = this.setTerm.bind(this);
    this.setArticleToSave = this.setArticleToSave.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

// React Components
  componentDidMount() {
    helpers.getSaved().then(function(response) {
      console.log("These are the articles that are saved: " + response);
      if (response !== this.state.saved) {
        console.log("Saved articles", response.data);
        this.setState({ saved: response.data });
      }
    }.bind(this));
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      console.log("Search term updated.");
      helpers.runQuery(this.state.searchTerm).then((data) => {
        if (data !== this.state.results) {
          console.log("Search info: " + data[0].headline.main);
          this.setState({ results: data });
        }
      });
    }
  }

  setTerm(term) {
    this.setState({
      searchTerm: term
    });
  }

  setArticleToSave(index, article) {
    const newState = this.state.resultToSave;
    newState.title = article.title;
    newState.date = article.date;
    newState.url = article.url;

    this.setState({
      resultToSave: newState
    });

    console.log("Article to Save " + this.state.resultToSave.title);

    helpers.saveArticle(this.state.resultToSave.title, this.state.resultToSave.date, this.state.resultToSave.url).then((data) => {
      console.log("Saved Article: " + data);

      this.setState(previousState => ({
        saved: [...previousState.saved, this.state.resultToSave],
        results: [...previousState.results.slice(0, index), ...previousState.results.slice(index+1)]
      }));

    });
  }

  deleteArticle(articleID, index) {
    console.log("ID for the article we want to delete: " + articleID);
    helpers.deleteArticle(articleID).then(() => {
      this.setState((prevState) => ({
        saved: [...prevState.saved.slice(0,index), ...prevState.saved.slice(index+1)]
      }));
    });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1><u>New York Times Article Scrubber</u></h1>
          <p>Search for and annotate articles of interest!</p>
        </div>
        <div className="row">
          <Search setTerm={this.setTerm} setArticleToSave={this.setArticleToSave} saved={this.state.saved} results={this.state.results} resultToSave={this.state.resultToSave} />
        </div>
        <div className="row">
          <Saved saved={this.state.saved} deleteArticle={this.deleteArticle} />
        </div>
      </div>
    );
  }
}

export default Main;
