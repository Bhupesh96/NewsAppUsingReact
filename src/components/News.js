import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    console.log("Hello I am constructor from news component.");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=c4e68450cdfb4b35b8632432074413c9";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
  }

  handlePrevious = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=c4e68450cdfb4b35b8632432074413c9&page=${
      this.state.page - 1
    }`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
    this.setState({ page: this.state.page - 1 });
  };
  handleNext = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=c4e68450cdfb4b35b8632432074413c9&page=${
      this.state.page + 1
    }`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
    this.setState({ page: this.state.page + 1 });
  }
  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevious}>
            &larr;Previous
          </button>
          <button
            type="button"
            class="btn btn-dark"
            onClickCapture={this.handleNext}
          >
            Next&rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
