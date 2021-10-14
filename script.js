function Book(title, author, pages, read){
  this.title=title
  this.author=author
  this.pages=pages
  this.read=read
  this.info = function() {
    console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "you've read this title" : "you've not yet read this title"}`)
  };
};

function addBookToLibrary(book){
  myLibrary.push(book)
}

function submitNewBook(){
  const title = document.querySelector('#form-title')
  const author = document.querySelector('#form-author')
  const pages = document.querySelector('#form-pages')
  const read = document.querySelector('#form-read')

  if (title.value && author.value && pages.value){
    newBook = new Book(title.value, author.value, pages.value, read.checked)
    addBookToPage(newBook)
    title.value = ''
    author.value = ''
    pages.value = ''
    read.checked = false

    toggleForm()
    setIDs()
    setLibrary()
  }
}

function getLibrary(){
  let x = window.localStorage.getItem('books')
  console.log(x)
  if (x) {
    return JSON.parse(x)
  } else {
    return []
  }
}

function setLibrary(){
  window.localStorage.removeItem('books')
  window.localStorage.setItem('books', JSON.stringify(myLibrary))
}

function setIDs(){
  const cards = document.querySelectorAll('.card')
  for (let i = 0; i < cards.length; i++) {
    cards[i].dataset.id = i
  }
}

function removeBook(e){
  let idx = e.parentElement.parentElement.dataset.id
  console.log(idx)
  myLibrary.splice(idx, 1)
  e.parentElement.parentElement.remove()
  console.log(myLibrary)
  setIDs()
  setLibrary()
  event.stopPropagation()
}

function addBookToPage(book){
  const cont = document.querySelector(".container")
  const card = document.createElement("div")
  const cardtext = document.createElement("div")
  const title = document.createElement("h2")
  const author = document.createElement("h3")
  const pages = document.createElement("p")
  const readbar = document.createElement("div")
  const close = document.createElement("div")

  card.setAttribute("class", "card")
  card.setAttribute("data-id", myLibrary.length)
  cardtext.setAttribute("class", "cardtext")
  readbar.setAttribute("class", `readbar ${book.read ? "read" : "unread"}`)
  readbar.setAttribute("onclick","toggleRead(this)")

  close.textContent = "x"
  close.setAttribute("class", "close-card")
  close.setAttribute("onclick", "removeBook(this)")
  title.textContent = book.title
  author.textContent = book.author
  pages.textContent = `${book.pages} pages long`

  card.appendChild(cardtext)
  card.appendChild(readbar)
  cardtext.appendChild(title)
  cardtext.appendChild(author)
  cardtext.appendChild(pages)
  readbar.appendChild(close)
  cont.appendChild(card)
  addBookToLibrary(book)
  setIDs()
  setLibrary()
}

function toggleRead(e){
  e.classList.toggle('unread')
  e.classList.toggle('read')
  console.log(myLibrary[e.parentNode.dataset.id].read)
  myLibrary[e.parentNode.dataset.id].read = !myLibrary[e.parentNode.dataset.id].read
  console.log(myLibrary[e.parentNode.dataset.id].read)
  setLibrary()
}

function toggleForm(){
  const button = document.querySelector('.open-form')
  const form = document.querySelector('.the-form')
  button.classList.toggle('disappeared')
  form.classList.toggle('disappeared')
}

loadLibrary = getLibrary()
console.log(loadLibrary)
myLibrary = []

for (let i=0; i<loadLibrary.length; i++){
  addBookToPage(loadLibrary[i])
}

