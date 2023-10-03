document.addEventListener("DOMContentLoaded", function() {
    loadFromLocalStorage();

    document.getElementById('addTaskBtn').addEventListener('click', addTodo);
});

function addTodo() {
    const input = document.getElementById('newTask');

    if (input.value.trim() === '') return;

    const todo = {
        id: Date.now(),
        content: input.value.trim(),
        done: false
    };

    appendItem(todo);
    saveToLocalStorage(todo);

    input.value = '';
}

function appendItem(todo) {
    const block = todo.done ? document.getElementById('doneBlock') : document.getElementById('todoBlock');
    const item = document.createElement('div');

    item.className = 'item';
    item.innerHTML = `
        ${todo.content}
        <span>
            <button onclick="toggleDone(${todo.id})">↔️</button>
            <button onclick="deleteItem(${todo.id})">❌</button>
        </span>
    `;

    block.appendChild(item);
}

function toggleDone(id) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) return;
    todos[index].done = !todos[index].done;

    localStorage.setItem('todos', JSON.stringify(todos));

    renderTodos();
}

function deleteItem(id) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));

    renderTodos();
}

function saveToLocalStorage(todo) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadFromLocalStorage() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => appendItem(todo));
}

function renderTodos() {
    document.getElementById('todoBlock').innerHTML = "<h3>Todo</h3>";
    document.getElementById('doneBlock').innerHTML = "<h3>Done</h3>";
    loadFromLocalStorage();
}
