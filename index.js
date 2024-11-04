document.addEventListener("DOMContentLoaded", function() {
    let taskInput = document.getElementById("task-input");
    let addButton = document.getElementById("add-button");
    let taskList = document.getElementById("task-list");

    // Fonction pour charger les tâches depuis le Local Storage
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(function(task) {
            addTaskToList(task);
        });
    }

    // Fonction pour ajouter une tâche à la liste
    function addTaskToList(taskText) {
        let taskElement = document.createElement("li");
        taskElement.className = "task";

        let taskParagraph = document.createElement("span");
        taskParagraph.textContent = taskText;

        let deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = '<img src="https://img.icons8.com/ios-filled/50/000000/trash.png" alt="Supprimer">'; // Icône de poubelle
        deleteButton.onclick = function() {
            taskList.removeChild(taskElement);
            removeTaskFromStorage(taskText); // Supprime aussi du Local Storage
        };

        taskElement.appendChild(taskParagraph);
        taskElement.appendChild(deleteButton);
        taskList.appendChild(taskElement);
    }

    // Fonction pour ajouter une tâche
    function addTask() {
        var taskText = taskInput.value.trim();
        if (taskText === "") return;

        addTaskToList(taskText);
        saveTaskToStorage(taskText); // Sauvegarde dans le Local Storage
        taskInput.value = ""; // Réinitialiser l'entrée
    }

    // Fonction pour sauvegarder une tâche dans le Local Storage
    function saveTaskToStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Fonction pour supprimer une tâche du Local Storage
    function removeTaskFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(function(task) {
            return task !== taskText;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Charger les tâches au démarrage
    loadTasks();
});
