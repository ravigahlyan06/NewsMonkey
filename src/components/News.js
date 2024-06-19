import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 8,
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };
  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }
  
  async updateNews(page = 1) {
    console.log(page)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c538fb29dc941fd86575a9db1a06c94&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, page: page, loading: false });
  }

  componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c538fb29dc941fd86575a9db1a06c94&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading: true,
    // });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({ articles: parsedData.articles, page: 1, loading: false });
    this.updateNews(1);
  }

  handleNextClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c538fb29dc941fd86575a9db1a06c94&page=${
    //   this.state.page + 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading: true,
    // });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   page: this.state.page + 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    this.setState({ page: this.state.page + 1 });
    this.updateNews(this.state.page + 1);
  };

  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c538fb29dc941fd86575a9db1a06c94&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading: true,
    // });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    this.setState({ page: this.state.page - 1 });
    this.updateNews(this.state.page - 1);
  };

  render() {
    return (
      <div>
        <div className="container my-2">
          <h1 className="text-center" style={{ margin: "40px 0px" }}>
            NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines 

          </h1>
          {this.state.loading ? (
            <Spinner />
          ) : (
            <>
              <div className="row">
                {this.state.articles.map((element, index) => {
                  return (
                    <div className="col-md-4" key={index}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 45) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 88)
                            : ""
                        }
                        ImageUrl={element.urlToImage}
                        url={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="container d-flex justify-content-between my-5">
                <button
                  type="button"
                  disabled={this.state.page <= 1}
                  className="btn btn-dark "
                  onClick={this.handlePrevClick}
                >
                  &larr; Preview
                </button>
                <button
                  type="button"
                  className="btn btn-dark "
                  onClick={this.handleNextClick}
                  disabled={this.state.page == 3}
                >
                  Next &rarr;
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default News;
