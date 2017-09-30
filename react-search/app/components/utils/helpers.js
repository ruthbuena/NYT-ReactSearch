import axios from "axios";
const authKey = "5c4953b3d9a64372a9b2d64f55d8d089";

const helpers = {
  runQuery: (searchTerm) => {
    console.log("We have a search term passed into query: " + searchTerm);
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + searchTerm;
    return axios.get(queryURL).then((response) => {
      console.log(response);

      if(response.data.response.docs[0]) {
      	return response.data.response.docs;
      } else {
      	return "";
      }
    });
  },

  getSaved: () => {
  	return axios.get("/api/saved");
  },

  saveArticle: (articleTitle, articleDate, articleURL) => {

  	return axios.post("/api/saved",
  		{
  			title: articleTitle,
  			date: articleDate,
        url: articleURL
  		}
  	);
  },

  deleteArticle: (articleID) => {
  	return axios.delete("/api/saved/" + articleID)
  	.then(res =>  {
  		console.log("Delete response from axios: " + res);
  	})
  	.catch(err => {
  		console.log("Error pushing to delete: " + err);
  	});
  }
};

export default helpers;
