```javascript
// Get HTML elements

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


// Load tasks from localStorage

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Display tasks when the page loads

displayTasks();


// Add a new task

addBtn.addEventListener("click", addTask);


// Allow Enter key to add a task

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Function to add task

function addTask() {

    const taskText = taskInput.value.trim();

    // Don't add an empty task

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }


    // Create task object

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };


    // Add task to array

    tasks.push(task);


    // Save tasks

    saveTasks();


    // Display updated list

    displayTasks();


    // Clear input

    taskInput.value = "";

    taskInput.focus();
}


// Function to display tasks

function displayTasks() {

    // Clear existing list

    taskList.innerHTML = "";


    // Create HTML for every task

    tasks.forEach(function(task) {

        const li = document.createElement("li");

        li.className = "task-item";


        // Add completed class if task is completed

        if (task.completed) {
            li.classList.add("completed");
        }


        // Task text

        const span = document.createElement("span");

        span.className = "task-text";

        span.textContent = task.text;


        // Click task to mark complete

        span.addEventListener("click", function() {

            toggleTask(task.id);

        });


        // Delete button

        const deleteBtn = document.createElement("button");

        deleteBtn.className = "delete-btn";

        deleteBtn.textContent = "Delete";


        deleteBtn.addEventListener("click", function() {

            deleteTask(task.id);

        });


        // Add elements to list item

        li.appendChild(span);

        li.appendChild(deleteBtn);


        // Add list item to task list

        taskList.appendChild(li);

    });
}


// Mark task as completed / incomplete

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });


    saveTasks();

    displayTasks();
}


// Delete task

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    saveTasks();

    displayTasks();
}


// Save tasks in localStorage

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}
```
