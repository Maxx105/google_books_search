import React, { useEffect, useState } from "react";
import { List, ListItem } from "../components/List";
import API from "../utils/API";


function Saved() {
  const [savedBooks, setSavedBooks] = useState([])

  useEffect(() => {
    API.getSavedBooks()
      .then(res => {
        console.log(res.data)
        setSavedBooks(res.data)
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <div>
      <List>
        <div>
            {savedBooks.map(book => (
                <ListItem key={book.title} style={{margin: '10px'}}>
                    <p>title: {book.title}</p>
                    <p>description: {book.description}</p>
                    {book.authors ?
                        <p>authors: {book.authors.join(', ')}</p> :
                        <p>NO AUTHORS</p>
                    }
                    {book.image ? 
                        <img className="img-fluid" alt={book.title} src={book.image} /> :
                        <p>No Image Available</p>
                    }
                    <button><a href={book.link} target="_blank" rel="noreferrer">View</a></button>
                    <button >DELETE</button>
                </ListItem>
            ))}
        </div>
    </List>
    </div>
  );
}

export default Saved;