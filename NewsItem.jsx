import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {
    let { title, description, imageURL, newsURL,author,date ,source} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: '18rem' }}>
          {/* Use imageURL if available */}
          <img src={imageURL?imageURL:'https://th.bing.com/th?id=OIP.VWChxFEpEc14eZmHhy9yowHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2}'} alt="News" className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{title}...<span className="badge bg-secondary"></span><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{source}<span className="visually-hidden">unread messages</span></span></h5>
            <p className="card-text">{description}...</p>
            {/* Add content inside the link */}
            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsURL} className="btn btn-sm btn-primary" target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
