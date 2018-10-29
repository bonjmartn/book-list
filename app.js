// ES5 Style

// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() { 
}

// Add Book to List Prototype
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    // create tr element
    const row = document.createElement('tr');
    // insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

// Show Alert Prototype
UI.prototype.showAlert = function(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert -- 1st param - what to insert, 2nd param - what to insert before
    container.insertBefore(div, form);
    // Timeout after 3 seconds
    // takes 2 things: thing to set the timeout on, then the milliseconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

// Delete Book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }

}
// Clear Fields Prototype
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event Listener for adding a book
document.getElementById('book-form').addEventListener('submit', function(e){

    // get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
    
    // Instantiate a book object
    const book = new Book(title, author, isbn);

    // Instantiate a UI object
    const ui = new UI();

    // Validate input
    if(title === '' || author === '' || isbn === '') {
        // Error alert
        ui.ShowAlert('Please fill in all fields', 'error');

    } else {
        // Add book to list
        ui.addBookToList(book);

        // Show success
        ui.showAlert('Book Added!', 'success');

        // Clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

    // Instantiate a UI object
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // Show message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
});
