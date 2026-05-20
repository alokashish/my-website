/* =========================
   LOGIN FUNCTION
========================= */

function login() {

    let username = document.getElementById("username").value;

    let password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {

        // Save login status
        localStorage.setItem("loggedIn", "true");

        // Redirect to dashboard
        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Username or Password");
    }
}

/* =========================
   LOGOUT FUNCTION
========================= */

function logout() {

    // Remove login status
    localStorage.removeItem("loggedIn");

    // Redirect to login page
    window.location.href = "index.html";
}

/* =========================
   CHECK LOGIN STATUS
========================= */

// If user is not logged in,
// redirect back to login page

if (
    window.location.pathname.includes("dashboard.html")
) {

    if (localStorage.getItem("loggedIn") !== "true") {

        window.location.href = "index.html";
    }
}

/* =========================
   TASK MANAGER
========================= */

let taskList = document.getElementById("taskList");

// Load tasks only if taskList exists
if (taskList) {

    loadTasks();
}

/* =========================
   ADD TASK
========================= */

function addTask() {

    let taskInput = document.getElementById("taskInput");

    let taskText = taskInput.value.trim();

    if (taskText === "") {

        alert("Please enter a task");

        return;
    }

    createTask(taskText);

    saveTask(taskText);

    taskInput.value = "";
}

/* =========================
   CREATE TASK
========================= */

function createTask(taskText) {

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

/* =========================
   TOGGLE TASK
========================= */

function toggleTask(task) {

    task.classList.toggle("completed");
}

/* =========================
   DELETE TASK
========================= */

function deleteTask(button) {

    let li = button.parentElement;

    li.remove();

    updateLocalStorage();
}

/* =========================
   SAVE TASK
========================= */

function saveTask(task) {

    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(task);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

/* =========================
   LOAD TASKS
========================= */

function loadTasks() {

    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {

        createTask(task);
    });
}

/* =========================
   UPDATE LOCAL STORAGE
========================= */

function updateLocalStorage() {

    let tasks = [];

    document
        .querySelectorAll("#taskList li span")
        .forEach(task => {

            tasks.push(task.textContent.trim());
        });

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}
