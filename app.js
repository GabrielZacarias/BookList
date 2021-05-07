//book consturctor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//ui constructor
function UI(){

}

UI.prototype.addBookToList = function(book){
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

UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function(msg, className){
    //create msg div
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

UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

//event listeners
document.getElementById('book-form').addEventListener('submit', function (e){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //instance
    const book = new Book(title, author, isbn);

    //instance of ui
    const ui = new UI();

    //validate input
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields', 'error');
    }
    else{
    
        ui.addBookToList(book);
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

    ui.showAlert('Book Removed.', 'success');

    e.preventDefault();
})