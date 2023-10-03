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
    
    // 투두 내용 추가
    const content = document.createElement('div');
    content.className = 'content';
    content.innerText = todo.content;
    item.appendChild(content);

    // span 태그 추가
    const span = document.createElement('span');

    // 투두 토글 버튼 추가
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toggleBtn';
    toggleBtn.innerText = todo.done ? '⏪' : '✅';
    toggleBtn.addEventListener('click', () => toggleDone(todo.id));
    span.appendChild(toggleBtn);

    // 투두 삭제 버튼 추가
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.innerText = '❌';
    deleteBtn.addEventListener('click', () => deleteItem(todo.id));
    span.appendChild(deleteBtn);

    item.appendChild(span);
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
