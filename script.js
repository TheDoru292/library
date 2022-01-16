let myLibrary = [];

const leftSidebar = document.querySelector(".left-sidebar");
const rightSidebar = document.querySelector(".right-sidebar");
const header = document.querySelector(".header");
const addButton = document.querySelector(".addBookButton");
const content = document.querySelector(".content");
const footer = document.querySelector(".footer");

const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modalclose");
const modalSubmit = document.querySelector(".modal-button");
const modalContentForm = document.querySelector("form");
const modalBookTitle = document.querySelector(".addBookTitle");
const modalBookAuthor = document.querySelector(".addBookAuthor");
const modalBookPages = document.querySelector(".addBookPages");
const modalBookRead = document.querySelector(".addBookRead");

let ranOnce = false;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    const titleValue = modalBookTitle.value;
    const authorValue = modalBookAuthor.value;
    const pagesValue = modalBookPages.value;
    const readValue = modalBookRead.checked;

    const myLibraryIndex = myLibrary.length;

    myLibrary[`${myLibraryIndex}`] = new Book(titleValue, authorValue, pagesValue, readValue);

    readLibrary();
}

function removeFromArray(object) {
    for(let i = 0; myLibrary.length > i; i++) {
        const bookObject = myLibrary[i];
        if(bookObject.title === object.title) {
            myLibrary.splice(myLibrary.indexOf(myLibrary[i]), 1);
        }
    }
}

function removeCard(path, object, ...htmlObjects) {
    for(let i = 0; i < path.length; i++) {
        if(path[i].dataset['bookname'] === object.title) {
            const card = document.querySelector(`[data-bookname='${object.title}']`);
            card.remove(htmlObjects);
            removeFromArray(object);
        }
    }
}


function createCard(div, object) {
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("p");
    const close = document.createElement("span");
    close.className = "close";

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const switchText = document.createElement("p");
    label.className = "switch";
    input.type = "checkbox";
    span.className = "slider round";

    title.textContent = `"${object.title}"`;
    author.textContent = `by ${object.author}`;
    pages.textContent = `${object.pages} pages`;
    close.textContent = `x`;

    input.addEventListener("click", () => {
        if(object.read === false) {
            object.read = true;
            read.textContent = "finished";
        } else if(object.read === true) {
            object.read = false;
            read.textContent = "not finished";
        } else {
            console.log("Ooops! Something went wrong!");
        }
    });

    close.addEventListener("click", (e) => {
        let composed = e.composedPath();
        removeCard(composed, object, close, title, author, pages, read, switchText, label);
    });
 
    if(object.read === false) {
        read.textContent = "not finished";
        switchText.textContent = `Mark as read:`;
        switchText.className = "small";
    } else {
        read.textContent = "finished";
        switchText.textContent = `Mark as unread`;
        switchText.className = "smaller"
    }

    label.append(input, span);
    div.append(close, title, author, pages, read, switchText, label);
    ranOnce = true;
}

function deleteCard() {
    const card = document.querySelectorAll(".card");
    card.forEach(cards => {
        cards.remove(cards);
    })
}

function readLibrary() {
    if(ranOnce === true) {
        deleteCard();
    }
    for(let i = 0; myLibrary.length > i; i++) {
        const book = document.createElement("div");
        const bookObject = myLibrary[i];
        book.className = "card";
        book.dataset.bookname = bookObject.title;
        leftSidebar.append(book);
        createCard(book, bookObject);
    }
}

addButton.addEventListener("click", () => {
    modal.style.display = "block";

})

window.addEventListener("click", (e) => {
    if(e.target == modal) {
        modal.style.display = "none";
    }
})

modalClose.addEventListener("click", () => {
    modal.style.display = "none";
})

modalSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary();
    modalContentForm.reset();
    modal.style.display = "none";
})