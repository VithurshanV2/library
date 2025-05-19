const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        const readStatus = this.read ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const tableBody = document.querySelector('#booksTable tbody');
    tableBody.innerHTML = '';

    myLibrary.forEach(book => {
        const row = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = book.title;

        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;

        const pagesCell = document.createElement('td');
        pagesCell.textContent = book.pages;

        const readCell = document.createElement('td');
        readCell.textContent = book.read ? 'Read' : 'Not read yet';

        row.appendChild(titleCell);
        row.appendChild(authorCell);
        row.appendChild(pagesCell);
        row.appendChild(readCell);
        tableBody.appendChild(row);
    });
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
console.log(myLibrary);
