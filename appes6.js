class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//front end class
class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');

        //create tr to add book
        const row = document.createElement('tr');

        row.innerHTML =  `
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>${book.isbn}</td>
                            <td><a href="#" class="delete">X</a></td>
                            `;

        list.appendChild(row);
    }

    showAlert(msg, className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;
    
        div.appendChild(document.createTextNode(msg));
    
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
    
        container.insertBefore(div, form);
    
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

//local storage
class Store {
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI();

            ui.addBookToList(book);
        })
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static getBooks(){
        let books = [];

        if(localStorage.getItem('books') !== null)
            books = JSON.parse(localStorage.getItem('books'));
    
        return books;
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        })

        localStorage.setItem('books', JSON.stringify(books));
    }
}


//event listeners
document.getElementById('book-form').addEventListener('submit', function (e){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //instance
    const book = new Book(title, author, isbn);
    const ui = new UI();

    //validate input
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields', 'error');
    }
    else{
    
        ui.addBookToList(book);
        Store.addBook(book);

        ui.showAlert('Book added!', 'success');
        //clear fields
        ui.clearFields();

    }

    e.preventDefault();
})

//listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    
    const ui = new UI();

    ui.deleteBook(e.target);

    //get isbn number of book
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert('Book Removed.', 'success');

    e.preventDefault();
})

document.addEventListener('DOMContentLoaded', Store.displayBooks);
