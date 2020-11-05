import React, { useState } from "react";
import { Input, FormBtn } from "../components/SearchForm";
import { List, ListItem } from "../components/List";
import Results from "../components/Results";
import API from "../utils/API";


function Search() {
    const [books, setBooks] = useState([])
    const [formObject, setFormObject] = useState({})

    // useEffect(() => {
    //     loadBooks()
    // }, [])

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
                setBooks(res.data.items)
                console.log(res.data.items)
            })
            .catch(err => console.log(err));
      };

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
                            <ListItem key={book.id} style={{margin: '10px'}}>
                                <p>title: {book.volumeInfo.title}</p>
                                <p>description: {book.volumeInfo.description}</p>
                                <p>authors: {book.volumeInfo.authors}</p>
                                <img className="img-fluid" alt={book.volumeInfo.title} src={book.volumeInfo.imageLinks.thumbnail} />
                                <a href={book.volumeInfo.infoLink} target="_blank" rel="noreferrer">{book.volumeInfo.infoLink}</a>
                            </ListItem>
                        ))}
                    </div>
                </List>
            </Results>
    </div>


  );
}

export default Search;