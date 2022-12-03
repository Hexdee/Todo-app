let todos = [];

let savedTasks = localStorage.getItem("todos");
if (savedTasks != null) {
    savedTasks = JSON.parse(savedTasks);
    savedTasks.map(addTask);
}

document.getElementById("add-todo-btn").addEventListener("click", () => {
    const todo = document.getElementById("input-todo");
    if (todo.value != "") {
        addTask(todo.value);
        todo.value = "";
    }
});

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTask(task) {
    todos.push(task);
    const todoList = document.getElementById("todos-list")
    const li = document.createElement("li");
    li.classList.add("todo");
    todoList.append(li);

    p = document.createElement("p");
    p.classList.add("todo-text-container");
    li.append(p);

    checkBtn = document.createElement("button");
    checkBtn.classList.add("check-todo-btn");
    p.append(checkBtn);

    const todoText = document.createElement("input");
    todoText.classList.add("todo-text");
    todoText.id = todos.length - 1;
    todoText.readOnly = true;
    todoText.value = task;
    p.append(todoText);

    checkBtn.addEventListener("click", () => {
        if (todoText.disabled == false) {
            checkBtn.style.backgroundColor = "#7DF196";
            todoText.disabled = true;
        } else {
            checkBtn.style.backgroundColor = "transparent";
            todoText.disabled = false;
        }
    });

    btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    li.append(btnContainer);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-todo-btn");
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    btnContainer.append(deleteBtn);

    deleteBtn.addEventListener("click", () => {
        todos.splice(todoText.id, 1);
        li.remove();
        saveTodos();
    });

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo-btn");
    editBtn.innerHTML = '<i class="fa fa-edit"></i>';
    btnContainer.append(editBtn);

    const confirmEditBtn = document.createElement("button");
    confirmEditBtn.classList.add("confirm-edit-btn");
    confirmEditBtn.innerHTML = '<i class="fa fa-check"></i>';
    confirmEditBtn.style.display = "none";
    btnContainer.append(confirmEditBtn);

    editBtn.addEventListener("click", () => {
        todoText.readOnly = false;
        todoText.style.color = "#EB4764";
        confirmEditBtn.style.display = "block";
        editBtn.style.display = "none";
    });

    confirmEditBtn.addEventListener("click", () => {
        todoText.readOnly = true;
        todoText.style.color = "";
        confirmEditBtn.style.display = "none";
        editBtn.style.display = "block";
        todos[todoText.id] = todoText.value;
        saveTodos();
    });

    saveTodos();
}