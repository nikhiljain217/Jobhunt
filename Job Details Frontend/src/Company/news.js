import React from 'react';
import './news.css'

const News =({title,imgUrl,author,url}) =>
{
    const handleClick = e =>
    {
    window.open(url,"_blank");
    }
    return(
        
        <div className="news-body" onClick={handleClick}>
            <div className="news-title" >
            <strong>{title}</strong>
            </div>
            <div className="news-img">
            <img  src ={imgUrl} /></div>
            <div className="news-author">
            <img src={`http://logo.clearbit.com/${author.replace(/\s/g,'').replace('\.com','')}.com?size=13`} alt="" />{author}
                </div> 

        </div>
    )
}
export default News;