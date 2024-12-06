import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const apiKey =  process.env.REACT_APP_NEWS_API;


// import PropTypes from 'prop-types'
export default class News extends Component {
  static defaultProps={
    pageSize:8,
   
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      error: null,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.updateNews();
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/everything?q=tesla&from=2024-11-01&sortBy=publishedAt&apiKey=${apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    try {
      const response = await fetch(url);
      this.props.setProgress(20);
      const data = await response.json();
      this.props.setProgress(50);
      if (response.ok) {
        this.setState({
          articles: data.articles,
          loading: false,
          totalResults: data.totalResults,
          error: null,
        });
      } else {
        throw new Error(`Error fetching news: ${response.statusText}`);
      }
    } catch (error) {
      this.setState({ error: error.message, loading: false });
      console.error('Error fetching news:', error);
    }
    this.props.setProgress(100);
  }

  handlePreviousClick = async () => {
    this.setState({loading:true});
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 }, this.updateNews);
    }
    this.setState({loading:false});
  };

  handleNextClick = async () => {
    const maxPage = Math.ceil(this.state.totalResults / this.props.pageSize);
    this.setState({loading:true});
    if (this.state.page < maxPage) {
      this.setState({ page: this.state.page + 1 }, this.updateNews);
    }
    this.setState({loading:false});
  };

  fetchMoreData = async() => {
    // a fake async api call like which sends
 this.setState({page:this.state.page+1})
//  this.updateNews();
const url = `https://newsapi.org/v2/everything?q=tesla&from=2024-11-01&sortBy=publishedAt&apiKey=${apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

try {
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    this.setState({
      articles: this.state.articles.concat(data.articles),
      loading: false,
      totalResults: data.totalResults,
      error: null,
    });
  } else {
    throw new Error(`Error fetching news: ${response.statusText}`);
  }
} catch (error) {
  this.setState({ error: error.message, loading: false });
  console.error('Error fetching news:', error);
}
  }

  render() {
    const { articles, loading, error } = this.state;

    return (
      <>
        <div className="container my-3">
          <h1 className="text-center">NewsMonkey - Top Headlines</h1>
{/* {this.state.loading&&<Spinner></Spinner>} */}
<InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.totalResults}
          loader={<Spinner></Spinner>}
        >
          {loading && <p className="text-center">Loading news articles...</p>}
          {error && <p className="text-center">Error fetching news: {error}</p>}
         
          <div className="row">
            {Array.isArray(articles) && articles.length > 0 ? (
              articles.map((element, index) => (
                <div className="col-md-4" key={element.url || index}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ''}
                    description={element.description ? element.description.slice(0, 88) : ''}
                    imageURL={element.urlToImage ? element.urlToImage : ''}
                    newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
                  />
                </div>
              
              ))
            ) : (
              <p className="text-center">No articles available.</p>
            )}
          </div>
          </InfiniteScroll>
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              onClick={this.handlePreviousClick}
              className="btn btn-dark"
            >
              &larr; Previous
            </button>
            <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}
              type="button"
              onClick={this.handleNextClick}
              className="btn btn-dark"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}