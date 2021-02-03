let myLibrary = [];
let colors = [];

function Book(name, author, pages, read) {
    this.name = name
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `${this.name} <br/> by ${this.author}. <br/> ${this.pages} pages. <br/> ${this.read}.`;
    }
}

// Updates list of books and update DOM
function refreshBookshelf() {
    // clear array, update list and append
    document.querySelectorAll('.book').forEach(function(book){
        book.remove();
    });

    let container = document.querySelector(".bookshelf");
    for (i = 0; i < myLibrary.length; i++) {
        let newElement = document.createElement('div');
        newElement.className = 'book';
        newElement.id = `book${i}`;
        newElement.innerHTML = myLibrary[i].info();

        let r = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);

        let rAlt = Math.floor(Math.random() * 256);
        let bAlt = Math.floor(Math.random() * 256);
        let gAlt = Math.floor(Math.random() * 256);
        
        newElement.style.backgroundImage = `linear-gradient(rgb(${r}, ${b}, ${g}), rgb(${rAlt}, ${bAlt}, ${gAlt}))`;
        
        container.appendChild(newElement);

        let btnDiv = document.createElement('div')
        btnDiv.className = 'btnDiv';
        btnDiv.id = `btnDiv${i}`
        newElement.appendChild(btnDiv);

        let button = document.createElement('button');;
        button.innerHTML = 'Change read status';
        button.className = 'readButton';
        button.value = i;
        button.addEventListener('click', function() {
            changeRead(button.value);
        });
        btnDiv.appendChild(button);

        let deleteBtn = document.createElement('button');;
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.className = 'deleteButton';
        deleteBtn.value = i;
        deleteBtn.addEventListener('click', function() {
            deleteBook(deleteBtn.value);
        });
        btnDiv.appendChild(deleteBtn);

    }
    modal.style.display = 'none';
}

// Creates a book object, stores it in myLibrary, and updates bookshelf
function getBookInfo() {
    let title = document.getElementsByName('title')[0].value;
    let author = document.getElementsByName('author')[0].value;
    let pages = document.getElementsByName('pages')[0].value;
    let checkBox = document.getElementById('read');
    let read = 'read';
    if (checkBox.checked == true) {
        read = 'read';
    } else {
        read = 'not read';
    }

    let addedBook = new Book (title, author, pages, read);
    myLibrary.push(addedBook);
    refreshBookshelf();
    setColor();
}

function changeRead(value) {
    if (myLibrary[value].read === 'read') {
        myLibrary[value].read = 'not read';
    } else {
        myLibrary[value].read = 'read';
    }
    refreshBookshelf();
}

function deleteBook(value) {
    myLibrary.splice(value, 1);
    refreshBookshelf();
}

// Sets up modal to add books to the bookshelf

let form = document.getElementById('form');

function handleForm(event) {
    event.preventDefault();
}

form.addEventListener('submit', handleForm);

let modal = document.getElementById('myModal');
let btn = document.getElementById('myBtn');
let span = document.getElementsByClassName('close')[0];

btn.onclick = function() {
    myModal.style.display = 'block';
}

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
