import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>{
const [articles, setArticles] = useState([])
const [loading, setLoading]= useState(true)
const [page, setPage]= useState(1)
const [totalResults, setTotalResults]= useState(0)

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

 const  updateNews = async (page = 1)=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4c538fb29dc941fd86575a9db1a06c94&page=${page}&pageSize=${props.pageSize}`;
  //  setPage(page + page)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
updateNews();
  },[])

//  const handleNextClick = async () => {
//     setPage(page + 1);
//     updateNews();
//   };

//  const handlePrevClick = async () => {
//     setPage(page - 1);
//     updateNews();
//   };

   const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4c538fb29dc941fd86575a9db1a06c94&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }
  
    return (
      <div className="container my-2">
        <h1 className="text-center" style={{  marginTop: '90px' }}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length <totalResults}
          loader={<Spinner />}
        >
          <div className="row" style={{ margin: "40px 40px", padding: "10px" }}>
            {articles?.map((element, index) => {
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
        </InfiniteScroll>
      </div>

    );
  
}
News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 8,
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
