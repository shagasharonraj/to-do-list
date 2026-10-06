// Get HTML elements
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");


// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Save tasks to localStorage
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// Display tasks on the webpage
function displayTasks() {

    // Clear the existing list
    taskList.innerHTML = "";


    // Create each task
    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.className = "task";


        // Add completed class
        if (task.completed) {

            li.classList.add("completed");

        }


        // Create checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;


        // Mark task complete/incomplete
        checkbox.addEventListener("change", function () {

            tasks[index].completed = checkbox.checked;

            saveTasks();

            displayTasks();

        });


        // Create task text
        const taskText = document.createElement("span");

        taskText.className = "task-text";

        taskText.textContent = task.text;


        // Create delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-button";


        // Delete task
        deleteButton.addEventListener("click", function () {

            tasks.splice(index, 1);

            saveTasks();

            displayTasks();

        });


        // Add elements to the task
        li.appendChild(checkbox);

        li.appendChild(taskText);

        li.appendChild(deleteButton);


        // Add task to the list
        taskList.appendChild(li);

    });

}


// Add a new task
function addTask() {

    const text = taskInput.value.trim();


    // Prevent empty tasks
    if (text === "") {

        alert("Please enter a task.");

        return;

    }


    // Add task to array
    tasks.push({

        text: text,

        completed: false

    });


    // Save and display
    saveTasks();

    displayTasks();


    // Clear input
    taskInput.value = "";

    taskInput.focus();

}


// Add task when button is clicked
addButton.addEventListener("click", addTask);


// Add task when Enter key is pressed
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// Display saved tasks when page loads
displayTasks();
