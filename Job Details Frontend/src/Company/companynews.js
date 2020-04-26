import React, {useEffect, useState } from 'react';
import {Loader} from "semantic-ui-react"
import News from './news';
import './news.css';


function CompanyNews({name})
{
    let CompanyName = name;

    const [newsArticles,setNewsArticles] = useState([]);

    useEffect(()=>{
        getNews();
        },[]);

    const getNews = async () => {
      
            const response = await fetch(`http://127.0.0.1:8000/company/${CompanyName}`);
            const data = await response.json();
            console.log(data);
            

            setNewsArticles(data); 
    }
    let loading = <Loader active inline="centered" size='medium'>Fetching News</Loader>
    let news = newsArticles.map(news =>(
                <News 
        title = {news.title}
        imgUrl ={news.urlToImage}
        author = {news.source.name}
        url = {news.url}
         />
    ))
    

    return(
    <div><center><div className="news-heading"><h3>News</h3></div></center>
    {
         newsArticles.length > 0 ? news : loading
    }
    </div>
    );

}

export default CompanyNews;