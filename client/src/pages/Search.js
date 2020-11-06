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
                let BooksArray = []
                res.data.items.forEach(item => {
                    BooksArray.push({
                        id: item.id,
                        title: item.volumeInfo.title,
                        description: item.volumeInfo.description,
                        authors: item.volumeInfo.authors,
                        image: item.volumeInfo.imageLinks,
                        link: item.volumeInfo.infoLink
                    })
                })
                setBooks(BooksArray);
            })
            .catch(err => console.log(err));
    };
    
    function handleSave() {
        API.saveBook(books)
            .then(res => {
                console.log('book has been saved')
            })
            .catch(err => console.log(err));
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
                            <ListItem key={book.id} style={{margin: '10px'}}>
                                <p>title: {book.title}</p>
                                <p>description: {book.description}</p>
                                {book.authors ?
                                    <p>authors: {book.authors.join(', ')}</p> :
                                    <p>NO AUTHORS</p>
                                }
                                {book.image ? 
                                    <img className="img-fluid" alt={book.title} src={book.image.thumbnail} /> :
                                    <p>No Image Available</p>
                                }
                                <button><a href={book.link} target="_blank" rel="noreferrer">View</a></button>
                                <button onClick = {handleSave} >SAVE</button>
                            </ListItem>
                        ))}
                    </div>
                </List>
            </Results>
    </div>


  );
}

export default Search;