let myLibrary = [];

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

Book.prototype.toggleRead = function () {
    this.read = !this.read;
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
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = book.read ? 'Mark as Unread' : 'Mark as Read';
        toggleBtn.setAttribute('aria-label', book.read ? 'Mark this book as unread' : 'Mark this book as read');
        toggleBtn.title = book.read ? 'Click to mark as unread' : 'Click to mark as read';

        toggleBtn.addEventListener("click", (event) => {
            book.toggleRead();
            displayBooks();
        });

        const removeCell = document.createElement('td');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.setAttribute('aria-label', 'Remove this book');

        removeBtn.dataset.id = book.id;

        removeBtn.addEventListener("click", (event) => {
            const idToRemove = event.target.dataset.id;
            removeBook(idToRemove);
        });

        row.appendChild(titleCell);
        row.appendChild(authorCell);
        row.appendChild(pagesCell);
        readCell.appendChild(toggleBtn);
        row.appendChild(readCell);
        removeCell.appendChild(removeBtn);
        row.appendChild(removeCell);
        tableBody.appendChild(row);
    });
}

const showNewBookBtn = document.getElementById("showNewBook");
const confirmBtn = document.getElementById("confirmBtn");
const newBookDialog = document.getElementById("newBookDialog");

showNewBookBtn.addEventListener("click", () => {
    newBookDialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = parseInt(document.getElementById("pages").value, 10);
    const read = document.getElementById("read").checked;

    if (title && author && pages) {
        addBookToLibrary(title, author, pages, read);
        newBookDialog.close();
        document.getElementById("bookForm").reset();
    }
});

document.querySelector('button[value="cancel"]').addEventListener("click", () => {
    newBookDialog.close();
});

function removeBook(id) {
    myLibrary = myLibrary.filter(book => book.id !== id);
    displayBooks();
}