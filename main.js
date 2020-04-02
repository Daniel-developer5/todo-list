let toggle = document.getElementById("toggle")
let todoListCont = document.getElementsByClassName("todo-list-cont")[0]
let closeText = document.querySelectorAll(".close-text")
let openText = document.querySelectorAll(".open-text")
let todoList = document.getElementsByClassName("todo-list")[0]
let form = document.getElementsByTagName("form")[0]
let input = document.getElementsByClassName("input")[0]
let ul = document.getElementsByTagName("ul")[0]
let todos = JSON.parse(localStorage.getItem("todos")) || []
let plus = document.getElementsByClassName("add-box")[0]

toggle.addEventListener('click', () => {
    todoListCont.classList.toggle('open')
    renderTodos()
    setTimeout(() => {
        toggle.classList.toggle('full')
        closeText.forEach((elem) => {
            elem.classList.toggle('close-text')
        })
        openText.forEach((elem) => {
            elem.classList.toggle('open-none')
        })
    },700)
})

function markTodo(item, text) {
    item.classList.toggle('ready')
    text.classList.toggle('finish')
}

function removeTodo(item, index) {
    item.classList.add('delete')
    setTimeout(() => {
        todos.splice(index, 1)
        renderTodos()
    },400)
}

function renderTodos() {
    ul.innerHTML = ''
    todos.forEach((elem, index) => {
        elem = document.createElement("li")
        ul.appendChild(elem)
        //Create text
        let text = document.createElement("p")
        elem.appendChild(text)
        text.textContent = todos[index].text
        //Create checkbox
        let checkbox = document.createElement("div")
        elem.appendChild(checkbox)
        checkbox.setAttribute('class', 'checkbox')
        checkbox.addEventListener('click', () => {
            checkbox.classList.toggle('active')
            markTodo(elem, text)
            todos[index].able = !todos[index].able
            localStorage.setItem("todos", JSON.stringify(todos))
        })
        //Create bin
        let bin = document.createElement("img")
        bin.setAttribute('src', 'img/bin-img.png')
        bin.setAttribute('alt', 'delete')
        bin.setAttribute('class', 'bin-img')
        elem.appendChild(bin)
        bin.addEventListener('click', () => {
            removeTodo(elem, index) 
        })
        //Checking
        if (todos[index].able) {
            markTodo(elem, text)
            checkbox.classList.add('active')
        }
    })
    input.value = ''
    localStorage.setItem("todos", JSON.stringify(todos))
}

function condition() {
    if (input.value) {
        todos.push(obj = {
            text: input.value,
            able: false
        })
        renderTodos()
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    condition()
})

plus.addEventListener('click', () => {
    condition()
})