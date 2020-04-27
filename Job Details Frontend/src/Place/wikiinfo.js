import React, {useState, useEffect} from 'react';




function WikiInfo({topic,length})
{

    const [wikiLink, setWikiLink] = useState("")

    const [wikidescription,setWikiDescription] = useState("")

    useEffect(()=>{getResponse();
    });

    const getResponse = async () =>
    {
        const response = await fetch(`http://127.0.0.1:8000/description/${topic}`);
        const data = await response.json();
        let description = data["description"].replace('\n'," ");
        description = description.substring(0,length);
        description = description.substring(0,description.lastIndexOf('\.')+1)
        
        setWikiLink(data['url'])
        setWikiDescription(description)    
    }

    return(<div>{wikidescription}
    <a href={wikiLink} target="_blank"> Read More</a>
    </div>)
}

export default WikiInfo;