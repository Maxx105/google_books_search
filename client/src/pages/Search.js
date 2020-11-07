import React, { useState } from "react";
import { Input, FormBtn } from "../components/SearchForm";
import { List, ListItem } from "../components/List";
import Results from "../components/Results";
import API from "../utils/API";


function Search() {
    const [books, setBooks] = useState([])
    const [formObject, setFormObject] = useState({})

    function handleFormSubmit(event) {
        event.preventDefault();
        loadBooks(formObject.value);
    };

    function handleInputChange(event) {
        const { value } = event.target;
        setFormObject({...formObject, value})
    };

    function loadBooks(query) {
        API.getBooks(query)
            .then(res => {
                let BooksArray = [];
                res.data.items.forEach(item => {
                    BooksArray.push({
                        _id: item.id,
                        title: item.volumeInfo.title,
                        description: item.volumeInfo.description ? item.volumeInfo.description : "No Description Available",
                        authors: item.volumeInfo.authors,
                        image: item.volumeInfo.imageLinks,
                        link: item.volumeInfo.infoLink
                    })
                })
                setBooks(BooksArray);
            })
            .catch(err => console.log(err));
    };
    
    function handleSave(books) {
        API.saveBook(books)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err.response));
    }

  return (
    <div>
        <div className="book-search">
            <form>
                <h3>Book Search</h3>
                <h6>Book:</h6>
                <div className="input-group mb-3">
                    <Input 
                        type="text" 
                        placeholder="Enter Book Name" 
                        onChange = {handleInputChange} >
                    </Input>
                    <FormBtn
                        type="submit"
                        onClick={handleFormSubmit} > 
                    </FormBtn>
                </div>
            </form>
        </div>
            <Results>
                <List>
                    <div>
                        {books.map(book => (
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
                                        {book.image ?
                                            <button type="button" className="btn btn-success btn-lg" onClick = {() => handleSave({...book, image: book.image.thumbnail})}>SAVE</button> :
                                            <button type="button" className="btn btn-success btn-lg" onClick = {() => handleSave({...book, image: null})}>SAVE</button>
                                        }
                                        <a href={book.link} target="_blank" rel="noopener noreferrer"><button type="button" className="btn btn-primary btn-lg">VIEW</button></a>
                                    </div>
                                </div>
                                <div className = "row">
                                    <div className = "col-md-2">
                                        {book.image ? 
                                            <img className="img-thumbnail" alt={book.title} src={book.image.thumbnail}/> :
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
            </Results>
    </div>


  );
}

export default Search;