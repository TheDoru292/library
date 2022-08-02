let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);

    let number = myLibrary.push({title: book.title, author: book.author, pages: book.pages, read: book.read});

    addTableRow(number);
}

function addTableRow(number) {
    let arrayIndex = number - 1;

    const table = document.querySelector("tbody");
    const tableRow = document.createElement("tr");
    tableRow.className = `${arrayIndex}`;

    const tableTitle = document.createElement("td");
    const tableAuthor = document.createElement("td");
    const tablePage = document.createElement("td");
    const tableRead = document.createElement("td");

    const tableEdit = document.createElement("span");
    const tableDelete = document.createElement("span");

    tableEdit.className = "edit";
    tableDelete.className = "delete";

    tableTitle.textContent = myLibrary[arrayIndex].title;
    tableTitle.className = "table-book-title";
    tableAuthor.textContent = myLibrary[arrayIndex].author;
    tablePage.textContent = myLibrary[arrayIndex].pages;
    tableRead.textContent = (myLibrary[arrayIndex].read === false) ? "No" : "Yes";
    
    tableEdit.textContent = "edit";
    tableDelete.textContent = "delete";

    tableTitle.append(tableEdit, tableDelete);
    tableRow.append(tableTitle, tableAuthor, tablePage, tableRead);
    table.append(tableRow);

    tableRow.addEventListener("mouseenter", e => {
        tableEdit.style.display = "block";
        tableDelete.style.display = "block";
    });

    tableRow.addEventListener("mouseleave", e => {
        tableEdit.style.display = "none";
        tableDelete.style.display = "none";
    })

    tableDelete.addEventListener("click", e => {
        tableTitle.remove(tableEdit, tableDelete);
        tableRow.remove(tableTitle, tableAuthor, tablePage, tableRead);
        myLibrary.splice(arrayIndex, 1);
    });

    tableEdit.addEventListener("click", e => {
        if(myLibrary[arrayIndex].read === false) {
            myLibrary[arrayIndex].read = true;
            tableRead.textContent = "Yes";
        } else {
            myLibrary[arrayIndex].read = false;
            tableRead.textContent = "No";
        }
    });
}

function modalEvents(item, button, close) {
    button.onclick = function() {
        item.style.display = "block";
    }

    close.onclick = function() {
        item.style.display = "none";
    }

    window.onclick = function(event) {
        if(event.target == item) {
            item.style.display = "none";
        }
    }
}

function addFormEvent() {
    const form = document.querySelector(".form");
    const bookTitle = document.getElementById("title");
    const bookAuthor = document.getElementById("author");
    const pages = document.getElementById("pages");
    const read = document.getElementById("read");

    form.addEventListener("submit", (e) => {
        const modal = document.querySelector(".modal");

        e.preventDefault();

        addBookToLibrary(bookTitle.value, bookAuthor.value, pages.value, read.checked);
    
        modal.style.display = "none";
    
        bookTitle.value = "";
        bookAuthor.value = "";
        pages.value = "";
        read.value = false;
    });

    pages.addEventListener("input", (e) => {
        if(pages.validity.rangeUnderflow) {
            pages.setCustomValidity("The amount of pages must be higher than 1!");
            pages.reportValidity();
        }
    })
}

function onRun(){
    const modal = document.querySelector(".modal");
    const modalBtn = document.querySelector(".modal-button");
    const span = document.querySelector(".close");

    modalEvents(modal, modalBtn, span);
    addFormEvent();
}

onRun();
