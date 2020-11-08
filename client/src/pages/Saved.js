import React, { useEffect, useState } from "react";
import { List, ListItem } from "../components/List";
import API from "../utils/API";


function Saved() {
  const [savedBooks, setSavedBooks] = useState([])

  useEffect(() => {
    API.getSavedBooks()
      .then(res => {
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
                <div className = "row">
                    <div className = "col-md-6">
                        <h5>{book.title}</h5>
                        {book.authors ?
                            <p>Written by {book.authors.join(', ')}</p> :
                            <p>No Authors</p>
                        }
                    </div>
                    <div className = "col-md-6">
                        <button type="button" className="btn btn-danger btn-lg" onClick = {() => deleteBook(book._id)}>DELETE</button>
                        <a href={book.link} target="_blank" rel="noopener noreferrer"><button type="button" className="btn btn-primary btn-lg">VIEW</button></a>
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-md-2">
                        {book.image ? 
                            <img className="img-thumbnail" alt={book.title} src={book.image}/> :
                            <p>No Image Available</p>
                        }
                    </div>
                    <div className = "col-md-10">
                        <p>{book.description}</p>
                    </div>
                </div>    
              </ListItem>
            ))}
        </div>
      </List>
    </div>
  );
}

export default Saved;