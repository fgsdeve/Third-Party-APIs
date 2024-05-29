// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

// Function to create a task card
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card', 'card', 'mb-3');
    taskCard.dataset.taskId = task.id;

    const dueDate = dayjs(task.deadline);
    const today = dayjs();
    if (dueDate.isBefore(today)) {
        taskCard.classList.add('task-overdue');
    } else if (dueDate.isBefore(today.add(3, 'day'))) {
        taskCard.classList.add('task-due-soon');
    }

    taskCard.innerHTML = `
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="card-title mb-0">${task.title}</h5>
            <button class="btn btn-danger btn-sm delete-task-btn">Delete</button>
        </div>
        <div class="card-body">
            <p class="card-text">${task.description}</p>
            <p class="card-text"><strong>Due Date:</strong> ${task.deadline}</p>
        </div>
    `;

    const deleteButton = taskCard.querySelector('.delete-task-btn');
    deleteButton.addEventListener('click', handleDeleteTask);

    return taskCard;
}

// Function to render the task list and make cards draggable
function renderTaskList() {
    const columns = {
        'NotYetStarted': document.getElementById('NotYetStarted').querySelector('.card-body'),
        'InProgress': document.getElementById('InProgress').querySelector('.card-body'),
        'Completed': document.getElementById('Completed').querySelector('.card-body')
    };

    // Clear out each column
    Object.values(columns).forEach(column => column.innerHTML = '');

    // Add tasks to their respective columns
    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        const column = columns[task.status.replace(/\s+/g, '')]; // Remove spaces from status
        if (column) {
            column.appendChild(taskCard);
        } else {
            console.log(`Column not found for status: ${task.status.replace(/\s+/g, '')}`);
        }
    });

    // Make task cards draggable
    $('.task-card').draggable({
        revert: 'invalid',
        start: function() {
            $(this).css('opacity', '0.5');
        },
        stop: function() {
            $(this).css('opacity', '1');
        }
    });
}


// Function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const taskName = document.getElementById('task-Name').value;
    const taskDescription = document.getElementById('task-Description').value;
    const dueDate = document.getElementById('due-Date').value;

    const newTask = {
        id: generateTaskId(),
        title: taskName,
        description: taskDescription,
        deadline: dueDate,
        status: 'NotYetStarted' // Matches the ID in HTML
    };
    

    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", nextId);

    renderTaskList();

    $('#addTaskModal').modal('hide');
    document.getElementById('taskForm').reset();
}

// Function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = event.target.closest('.task-card').dataset.taskId;
    taskList = taskList.filter(task => task.id != taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable.data('taskId');
    const newStatus = event.target.closest('.swim-lane').id; // Get the ID of the status lane 

    console.log(`Task ID: ${taskId}`);
    console.log(`New Status: ${newStatus}`);

    taskList = taskList.map(task => {
        if (task.id == taskId) {
            console.log(`Updating task ${task.id} status from ${task.status} to ${newStatus}`);
            return { ...task, status: newStatus };
        }
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}


// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    // Add event listener for adding a new task
    $('#taskForm').submit(handleAddTask);

    // Add event listener for deleting a task
    $('.container').on('click', '.delete-task-btn', handleDeleteTask);

    // Make lanes droppable
    $('.swim-lane').droppable({
        accept: '.task-card',
        drop: handleDrop
    });

    // Configure the date picker for the due date field
    $('#due-Date').datepicker({
        dateFormat: 'yy-mm-dd'
    });
});
