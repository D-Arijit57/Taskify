 // maintaining a single array of todos as we can differentiate between the type of todos using the status of each object

 let todoArr = []; // array in which the todos will get pushed
 let nextID = 1;

 window.addEventListener("load",() =>{
    const savedData = localStorage.getItem("taskBoardData");
    if (savedData) {
        todoArr = JSON.parse(savedData);
         nextID = todoArr.length ? Math.max(...todoArr.map(t => t.id)) + 1 : 1;
    }
    render();
 });
 function saveToLocalStorage() {
    localStorage.setItem("taskBoardData", JSON.stringify(todoArr));
}
function addnewTodo(){
    // each todo has a text (response), status (todo , progress, completed) and an Id (for deletion , insertion and updation of the todo)
    const todoObj = {
        response : "",
        status : "todo",
        id: nextID++
    }
    todoObj.response = prompt("Enter your task").trim();
    if (!todoObj.response) {
        alert("Task shouldn't be empty");
        return;
    }// in case the user doesn't type anything
    // push the new todo text into the array and render
    else {
    todoArr.push(todoObj); 
    saveToLocalStorage();
    render();
    }
    
}
// Centralized function for moving the todo (changing the status)
function moveTodo(id, newStatus ){
    const idx = findIndexByID(id);
    if(idx === -1) return;
    todoArr[idx].status = newStatus;
    saveToLocalStorage();
    render();
}
// Delete function for each todo 
// delete by identifying the status of the todo 
function deleteTodo(id){
    const idx = findIndexByID(id);
    if(idx === -1) return;
    todoArr.splice(idx , 1);
    render();
}
// To be done 
function archiveTodo(id){
}
// findIndex is a built-in function to find a specific index given in the paremeter 
function findIndexByID(id){
    return todoArr.findIndex(elem => elem.id === id);
}
// Todo component
function createComponent(todo){
    const newDiv = document.createElement('div');
    const newh3 = document.createElement('h3');
    const deletebtn = document.createElement('button');
    const startbtn = document.createElement('button'); 

    newDiv.className ="p-3 bg-white border border-gray-200 rounded shadow-sm relative group";
    // adding an extra className using .classList.add
    newDiv.classList.add('todo-item');
    newDiv.id = "todo-" + todo.id;
    newDiv.draggable =true;
    // adding an eventListner for whenever the item is selected and dargged
    newDiv.addEventListener('dragstart' , e => {
        // you can't store a raw number in a data tansfer so storing it in a string
        e.dataTransfer.setData('text/plain',String(todo.id));

    })
    newh3.className = "font-bold text-sm pr-8"; 
    deletebtn.className ="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition-colors duration-200";
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
    } else if(todo.status === "progress") {
        startbtn.textContent = 'Finish';
        startbtn.onclick = () => moveTodo(todo.id, 'completed');
    }else{
        startbtn.textContent = 'Archive';
        startbtn.onclick = () => archiveTodo(todo.id);
    }

    deletebtn.addEventListener('click', () => deleteTodo(todo.id));

    newDiv.append(newh3);
    newDiv.append(startbtn);
    newDiv.append(deletebtn);
    
    return newDiv;
}
// Rendering the todo 
function render(){
    const todoContainer = document.querySelector("#todo-list");
    const inprogressContainer = document.querySelector("#inprogress-list");
    const completedContainer = document.querySelector("#done-list");
 
    todoContainer.innerHTML = '';
    inprogressContainer.innerHTML = '';
    if(completedContainer) completedContainer.innerHTML = '';

    todoArr.forEach(todo => {
        const el = createComponent(todo);
        if(todo.status === 'todo') todoContainer.appendChild(el);
        else if (todo.status === 'progress') inprogressContainer.appendChild(el);
        else if(todo.status === 'completed') completedContainer.appendChild(el);
        });
}
// here columns are the dropping zone for us 
const columns = [
    document.getElementById("todo-list"),
    document.getElementById("inprogress-list"),
    document.getElementById("done-list")
]
columns.forEach(col => {
    col.addEventListener('dragover' , e =>{
        e.preventDefault();
    });
    col.addEventListener('drop', e =>{
        e.preventDefault();
        col.classList.remove('hovered');
    const idStr = e.dataTransfer.getData('text/plain'); // to get the data (id) that we set earlier
    const id = Number(idStr);// since we converted into a string earlier we need to convert it back to a number
    const newStatus = col.dataset.status; 
    if(!Number.isNaN(id)) moveTodo(id , newStatus);
    });
    
})