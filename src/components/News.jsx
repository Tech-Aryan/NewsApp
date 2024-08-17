import React, { useState, useEffect, useCallback } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = useCallback(async () => {
    
    const url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=2dbdeb43c16b46cb9abca905e25dba66&page=${page}`;
    const data = await fetch(url);
    const parsedData = await data.json();

     // Midway progress
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    // Complete progress
  }, [page, props]);

  useEffect(() => {
    updateNews();
  }, [updateNews]);

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=2dbdeb43c16b46cb9abca905e25dba66&page=${page + 1}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    
    setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center"style={{margin:'35px 0px',marginTop:'90px'}}>NewsApp - Top Headlines</h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<h4>Loading...</h4>}
      >
        <div className="row">
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title || ""}
                description={element.description || ""}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author || "unknown"}
                date={element.publishedAt}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default News;
