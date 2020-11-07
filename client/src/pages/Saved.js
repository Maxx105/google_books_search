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

  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err.response));
  }

  function loadBooks() {
    API.getSavedBooks()
      .then(res => 
        setSavedBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  return (
    <div>
      <List>
        <div>
            {savedBooks.map(book => (
                <ListItem key={book._id} style={{margin: '10px'}}>
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
                    <button><a href={book.link} target="_blank" rel="noopener noreferrer">View</a></button>
                    <button onClick = {() => deleteBook(book._id)} >DELETE</button>
                </ListItem>
            ))}
        </div>
    </List>
    </div>
  );
}

export default Saved;