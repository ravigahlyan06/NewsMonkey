import React from "react";
const NewsItem = (props) => {

    let { title, description, ImageUrl, url, author, date, source } = props;
    return (
      <div>
        <div className="card">
          <div style={{
            display:'flex',
            justifyContent:'flex-end',
            position:'absolute',
            right:'0'
          }}>
          <span className=" badge rounded-pill bg-primary">{source}</span>
          </div>
          <img src={!ImageUrl?"https://www.wishtv.com/wp-content/uploads/2024/06/Red-lobster-castleton-copy.jpg":ImageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">by{!author?"Unknown":author} on { date }</small></p>
            <a  href={url} target="_blank" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
