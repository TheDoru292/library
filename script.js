const book1 = new Book("test", "test", 123, false);
const book2 = new Book("test1", "test2", 123, true);
const book3 = new Book("test2", "test2", 123, true);
const book4 = new Book("test3", "test2", 123, true);
const book5 = new Book("test4", "test2", 123, true);

let myLibrary = [book1, book2, book3, book4, book5];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {

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

const leftSidebar = document.querySelector(".left-sidebar");

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
}

function readLibrary() {
    for(let i = 0; myLibrary.length > i; i++) {
        const book = document.createElement("div");
        book.className = "card";
        const bookObject = myLibrary[i];
        book.dataset.bookname = bookObject.title;
        leftSidebar.append(book);
        createCard(book, bookObject);    
    }
}

readLibrary();