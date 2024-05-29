# Task Board

## Description
The Task Board is a web application that allows a team to manage project tasks efficiently. It provides features to add, delete, and update tasks, while also categorizing them into different progress states. This application leverages Third-Party APIs and libraries to enhance its functionality.

## Features
- **Task Management**: Add, delete, and update tasks with ease.
- **Progress Tracking**: Tasks are categorized into columns representing different progress states (Not Yet Started, In Progress, Completed).
- **Color Coding**: Tasks are color-coded based on their due dates to indicate their status (yellow for nearing deadline, red for overdue).
- **Persistent Storage**: Tasks are saved in local storage, ensuring they persist after page refresh.
- **Drag and Drop**: Drag tasks between columns to update their progress state.

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Font Awesome
- jQuery
- jQuery UI
- Day.js

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/fgsdeve/Task-Board
    ```
2. Navigate to the project directory:
    ```sh
    cd Task-Board
    ```
3. Open `index.html` in your preferred web browser.

## Usage
1. Click the "Add Task" button to open the task creation modal.
2. Enter the task title, description, and due date, then click "Add Task".
3. View and manage tasks in the columns representing their progress states.
4. Drag and drop tasks between columns to update their status.
5. Click the delete button on a task card to remove it from the board.

## Detailed Changes and Concepts

### Unique Task ID Generation
A function was created to generate a unique task ID using a combination of a timestamp and a random number. This ensures each task has a distinct identifier, which is useful for tracking, storing, and referencing tasks.

### Task Card Creation
A function was implemented to create task cards that visually represent tasks. Each card includes the task title, description, and deadline. This is crucial for project management applications to display and manage individual tasks effectively.

### HTML Structure Using Template Literals
Template literals in JavaScript were used to dynamically create HTML structures. This allows for easy generation of complex HTML elements with dynamic content based on variables or data. It supports multi-line strings and dynamic data binding, making the code more concise and readable.

### Persistent Storage
Tasks are stored in local storage to ensure they persist after page refresh. This is implemented using `localStorage` in JavaScript.

### Drag and Drop Functionality
Tasks can be dragged and dropped between columns to update their progress state. This is achieved using jQuery UI's `draggable` and `droppable` components.

## Resources Used
- [Bootstrap 5](https://getbootstrap.com/docs/5.1/getting-started/introduction/) for responsive design.
- [Font Awesome](https://fontawesome.com/) for icons.
- [jQuery](https://jquery.com/) for simplified DOM manipulation.
- [jQuery UI](https://jqueryui.com/) for drag and drop functionality.
- [Day.js](https://day.js.org/) for date manipulation.

## Credits
This project was inspired by a coding challenge and developed by Francisco.
https://fgsdeve.github.io/Third-Party-APIs/

## License
MIT License

