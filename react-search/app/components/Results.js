import React from "react";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {
        title: "",
        date: "",
        url: ""
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(index, headline, pubdate, url) {
    event.preventDefault();
    console.log("New Article to save: " + headline);
    const newState = this.state.article;
    newState.title = headline;
    newState.date = pubdate;
    newState.url = url
    this.setState({
      article: newState
    });
    this.props.setArticleToSave(index, this.state.article);
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body">
          {this.props.results.map(function(obj, index){
            return (
              <div key={index} className="row resultsRow" onClick={() => this.handleSubmit(index, obj.headline.main, obj.pub_date, obj.web_url)}>
                <div className="col-sm-6 articleText">
                  <a href={obj.web_url}>{obj.headline.main}</a>
                </div>
                <div className="col-sm-6">
                  <button className="btn btn-primary pull-right saveButton">
                    Save Article
                  </button>
                </div>
              </div>
            );
          }, this)}
        </div>
      </div>
    );
  }
}
export default Results;
