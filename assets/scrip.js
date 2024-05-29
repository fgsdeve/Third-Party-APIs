// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

// Generate a unique task ID
function createTaskCard(task){
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card', 'card', 'mb-3');
    taskCard.dataset.taskId = taskId;

    const dueDate = dayjs(task.deadline);
    const today = dayjs();
    if(!dueDate.isBefore(today)){
        taskCard.classList.add('task-overdue');
    }else if (dueDate.isBefore(today.add(3, 'day'))) {
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
deleteButton.addEventListener('click', handleAddTask);

return taskCard;

}

function renderTaskList() {
    const columns = {
        'Not Yet Started': document.getElementById('NotYetStarted').querySelector('.card-body'),
        'In Progress': document.getElementById('InProgress').querySelector('.card-body'),
        'Completed': document.getElementById('Completed').querySelector('.card-body')
    };

    Object.values(columns).forEach(column => column.innerHTML = '');

    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        columns[task.status].appendChild(taskCard);
    });

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


// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.dataset.taskId = task.id;

    // Create HTML structure using template literals
    taskCard.innerHTML = `
        <div class="card-header">
            <h5 class="card-title">${task.title}</h5>
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

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        const column = document.getElementById(task.status);
        column.appendChild(taskCard);
    });

    $('.task-card').draggable();
}

// Todo: create a function to handle adding a new task
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
        status: 'Not Yet Started'
    };

    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    nextId++;
    localStorage.setItem("nextId", nextId);

    updateTaskListUI();

    document.getElementById('task-Name').value = '';
    document.getElementById('task-Description').value = '';
    document.getElementById('due-Date').value = '';
}
// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = event.target.closest('.task-card').dataset.taskId;
    
    // Find the index of the task in the taskList array
    const taskIndex = taskList.findIndex(task => task.id === parseInt(taskId));
    
    if (taskIndex !== -1) {
        // Remove the task from the taskList array
        taskList.splice(taskIndex, 1);
        
        // Update the local storage with the modified taskList
        localStorage.setItem("tasks", JSON.stringify(taskList));
        
        // Remove the task card from the UI
        event.target.closest('.task-card').remove();
    }
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable.data('taskId');
    const newStatus = event.target.id; // Get the ID of the status lane 

    // Find the task in the taskList array based on taskId
    const taskIndex = taskList.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        // Update the status of the task in the taskList array
        taskList[taskIndex].status = newStatus;

        // Update the local storage with the modified taskList
        localStorage.setItem("tasks", JSON.stringify(taskList));

        // Move the task card to the new status lane
        ui.draggable.detach().appendTo($(event.target).find('.card-body'));
    }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    // Add event listener for adding a new task
    $('#taskForm').submit(handleAddTask);

    // Add event listener for deleting a task
    $('.container').on('click', '.delete-task-btn', handleDeleteTask);

    // Make lanes droppable
    $('.lane').droppable({
        drop: handleDrop
    });

    // Configure the date picker for the due date field
    $('#due-Date').datepicker();
});

