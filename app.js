//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

var newTaskInput = document.querySelector(".new-task__input");
var newTaskButton = document.querySelector(".new-task__button");
var incompleteTaskHolder = document.querySelector(".incomplete-tasks__items");
var completedTasksHolder = document.querySelector(".completed-tasks__items");

var createNewTaskElement = function (taskString) {
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "task__checkbox";

    var label = document.createElement("label");
    label.innerText = taskString;
    label.className = "task__label";

    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "task__input";

    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.type = "button";
    editButton.className = "button task__button task__button_edit";

    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "button task__button task__button_delete";
    var deleteButtonImg = document.createElement("img");
    deleteButtonImg.alt = "";
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.className = "button__delete-img";
    deleteButton.appendChild(deleteButtonImg);

    var listItem = document.createElement("li");
    listItem.className = "task";
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

var addTask = function () {
    console.log("Add Task...");
    if (!newTaskInput.value) return;

    var listItem = createNewTaskElement(newTaskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    newTaskInput.value = "";
}

var editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem = this.parentNode;
    var editInput = listItem.querySelector(".task__input");
    var label = listItem.querySelector(".task__label");
    var editBtn = listItem.querySelector(".task__button_edit");

    if (listItem.classList.contains("task_edit-mode")) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("task_edit-mode");
};

var deleteTask = function () {
    console.log("Delete Task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}

var taskCompleted = function () {
    console.log("Complete Task...");
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function () {
    console.log("Incomplete Task...");
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function () {
    console.log("AJAX Request");
}

newTaskButton.addEventListener("click", addTask);
newTaskButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    var checkBox = taskListItem.querySelector(".task__checkbox");
    var editButton = taskListItem.querySelector(".task__button_edit");
    var deleteButton = taskListItem.querySelector(".task__button_delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
