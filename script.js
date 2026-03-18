// maintaining a single array of todos as we can differentiate between the type of todos using the status of each object

let todoArr = [];
let nextID = 1;

// ─── localStorage Helpers ────────────────────────────────────────────────────

const STORAGE_KEY = "taskify_todos";
const ID_KEY = "taskify_nextID";

function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoArr));
    localStorage.setItem(ID_KEY, String(nextID));
}

function loadFromStorage() {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    const savedID = localStorage.getItem(ID_KEY);

    if (savedTodos) {
        todoArr = JSON.parse(savedTodos);
    }
    if (savedID) {
        nextID = Number(savedID);
    }
    render();
}

// ─── Core Functions ──────────────────────────────────────────────────────────

function addnewTodo() {
    const todoObj = {
        response: "",
        status: "todo",
        id: nextID++
    };
    todoObj.response = prompt("Enter your task").trim();
    if (!todoObj.response) {
        alert("Task shouldn't be empty");
        return;
    }
    todoArr.push(todoObj);
    saveToStorage(); // 💾 persist
    render();
}

// Centralized function for moving the todo (changing the status)
function moveTodo(id, newStatus) {
    const idx = findIndexByID(id);
    if (idx === -1) return;
    todoArr[idx].status = newStatus;
    saveToStorage(); // 💾 persist
    render();
}

// Delete function for each todo
function deleteTodo(id) {
    const idx = findIndexByID(id);
    if (idx === -1) return;
    todoArr.splice(idx, 1);
    saveToStorage(); // 💾 persist
    render();
}

// To be done
function archiveTodo(id) {
}

// To edit a todo
function editTodo(id) {
    const idx = findIndexByID(id);
    if (idx === -1) return;
    const newTask = prompt("Enter your new task");
    if (!newTask) {
        alert("Task shouldn't be empty!");
        return;
    }
    todoArr[idx].response = newTask;
    saveToStorage(); // 💾 persist
    render();
}

// findIndex is a built-in function to find a specific index given in the parameter
function findIndexByID(id) {
    return todoArr.findIndex(elem => elem.id === id);
}

// ─── Component ───────────────────────────────────────────────────────────────

function createComponent(todo) {
    const newDiv = document.createElement('div');
    const newh3 = document.createElement('h3');
    const deletebtn = document.createElement('button');
    const startbtn = document.createElement('button');

    newDiv.className = "p-3 bg-white border border-gray-200 rounded shadow-sm relative group";
    newDiv.classList.add('todo-item');
    newDiv.id = "todo-" + todo.id;
    newDiv.draggable = true;
    newDiv.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', String(todo.id));
    });

    newh3.className = "font-bold text-sm pr-8";
    deletebtn.className = "absolute top-2 right-2 text-gray-400 hover:text-red-600 transition-colors duration-200";
    deletebtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
    `;

    startbtn.className = "mt-2 px-2 py-1 text-xs font-medium text-white bg-green-500 rounded hover:bg-green-600 transition-colors";

    newh3.textContent = todo.response || '';
    if (todo.status === "todo") {
        startbtn.textContent = 'Start';
        startbtn.onclick = () => moveTodo(todo.id, 'progress');
    } else if (todo.status === "progress") {
        startbtn.textContent = 'Finish';
        startbtn.onclick = () => moveTodo(todo.id, 'completed');
    } else {
        startbtn.textContent = 'Archive';
        startbtn.onclick = () => archiveTodo(todo.id);
    }

    deletebtn.addEventListener('click', () => deleteTodo(todo.id));

    newDiv.append(newh3);
    newDiv.append(startbtn);
    newDiv.append(deletebtn);

    return newDiv;
}

// ─── Render ──────────────────────────────────────────────────────────────────

function render() {
    const todoContainer = document.querySelector("#todo-list");
    const inprogressContainer = document.querySelector("#inprogress-list");
    const completedContainer = document.querySelector("#done-list");

    todoContainer.innerHTML = '';
    inprogressContainer.innerHTML = '';
    if (completedContainer) completedContainer.innerHTML = '';

    let todoCnt = 0, progressCnt = 0, doneCnt = 0;

    todoArr.forEach(todo => {
        const el = createComponent(todo);
        if (todo.status === 'todo') {
            todoContainer.appendChild(el);
            todoCnt++;
        } else if (todo.status === 'progress') {
            inprogressContainer.appendChild(el);
            progressCnt++;
        } else if (todo.status === 'completed') {
            completedContainer.appendChild(el);
            doneCnt++;
        }
    });
    document.getElementById("count-todo").textContent = todoCnt;
    document.getElementById("count-inprogress").textContent = progressCnt;
    document.getElementById("count-done").textContent = doneCnt;
}

// ─── Drag & Drop ─────────────────────────────────────────────────────────────

const columns = [
    document.getElementById("todo-list"),
    document.getElementById("inprogress-list"),
    document.getElementById("done-list")
];

columns.forEach(col => {
    col.addEventListener('dragover', e => {
        e.preventDefault();
    });
    col.addEventListener('drop', e => {
        e.preventDefault();
        col.classList.remove('hovered');
        const idStr = e.dataTransfer.getData('text/plain');
        const id = Number(idStr);
        const newStatus = col.dataset.status;
        if (!Number.isNaN(id)) moveTodo(id, newStatus);
    });
});

// ─── Init ─────────────────────────────────────────────────────────────────────

loadFromStorage(); // 🚀 Load saved tasks on page start
