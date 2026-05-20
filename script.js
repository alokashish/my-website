/* LOGIN FUNCTION */

function login(){

    let username = document.getElementById("username").value;

    let password = document.getElementById("password").value;

    if(username === "admin" && password === "1234"){

        localStorage.setItem("loggedIn", "true");

        window.location.href = "dashboard.html";

    }
    else{
        alert("Invalid Username or Password");
    }
}

/* LOGOUT FUNCTION */

function logout(){

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";
}

/* TASK MANAGER */

let taskList = document.getElementById("taskList");

if(taskList){

    loadTasks();
}

function addTask(){

    let taskInput = document.getElementById("taskInput");

    let taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    createTask(taskText);

    saveTask(taskText);

    taskInput.value = "";
}

function createTask(taskText){

    let li = document.createElement("li");

    li.innerHTML = `
        <span onclick="toggleTask(this)">
            ${taskText}
        </span>

        <button class="delete-btn"
        onclick="deleteTask(this)">
            Delete
        </button>
    `;

    taskList.appendChild(li);
}

function toggleTask(task){

    task.classList.toggle("completed");
}

function deleteTask(button){

    let li = button.parentElement;

    li.remove();

    updateLocalStorage();
}

function saveTask(task){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTask(task);
    });
}

function updateLocalStorage(){

    let tasks = [];

    document.querySelectorAll("li span").forEach(task => {
        tasks.push(task.textContent);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}