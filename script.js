let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);

    myLibrary.push({title: book.title, author: book.author, pages: book.pages, read: book.read});

    addTableRow();
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

    form.addEventListener("submit", (e) => {
        const bookTitle = document.querySelector("#title");
        const bookAuthor = document.querySelector("#author");
        const pages = document.querySelector("#pages");
        const read = document.querySelector("#read");
        const modal = document.querySelector(".modal");

        e.preventDefault();

        addBookToLibrary(bookTitle.value, bookAuthor.value, pages.value, read.checked);

        modal.style.display = "none";

        bookTitle.value = "";
        bookAuthor.value = "";
        pages.value = "";
        read.value = false;
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
