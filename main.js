const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

const taskList = document.querySelector("#task-list");
const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-input");

function saveTasks() {
   localStorage.setItem("tasks", JSON.stringify(tasks));
}

function escapeHTML(html) {
   const div = document.createElement("div");
   div.innerText = html;
   return div.innerHTML;
}

function checkDuplicate(value, taskIndex) {
   if (
      tasks.some(
         (task, index) =>
            task.title.toLowerCase() === value.toLowerCase() &&
            index !== taskIndex
      )
   ) {
      toDoInput.value = "";
      return true;
   }
}

taskList.onclick = function (e) {
   const taskItem = e.target.closest(".task-item");
   if (!taskItem) return;
   const taskIndex = +taskItem.dataset.index;

   if (e.target.closest(".edit")) {
      const newTitle = prompt(
         "Enter the new task title:",
         tasks[taskIndex].title
      );
      if (!newTitle) {
         return alert("Enter the new task title pls");
      }

      if (checkDuplicate(newTitle, taskIndex)) {
         return alert("Đã có trong danh sách");
      }

      tasks[taskIndex].title = newTitle;
   } else if (e.target.closest(".done")) {
      tasks[taskIndex].completed = true;
   } else if (e.target.closest(".delete")) {
      tasks.splice(taskIndex, 1);
   }
   saveTasks();
   renderTaskList();
};

toDoForm.onsubmit = function (e) {
   e.preventDefault();
   const value = toDoInput.value.trim();
   if (!value) {
      return alert("Nhập gì coi");
   }

   if (checkDuplicate(value)) {
      return alert("Đã có trong danh sách");
   }

   const task = {
      title: value,
      completed: false,
   };

   tasks.unshift(task);
   saveTasks();
   renderTaskList();
   toDoInput.value = "";
};

function renderTaskList() {
   if (tasks.length === 0) {
      taskList.innerHTML = `<li class="empty-message">No tasks avalilabel!</li>`;
   } else {
      const html = tasks
         .map(
            (task, index) =>
               `<li class="task-item ${
                  task.completed ? "completed" : ""
               }" data-index=${index}>
         <span class="task-title">${escapeHTML(task.title)}</span>
         <div class="task-action">
             <button class="task-btn edit">Edit</button>
             <button class="task-btn done">${
                task.completed ? "Mark as done" : "Mark as undone"
             }</button>
             <button class="task-btn delete">Delete</button>
         </div>
     </li>`
         )
         .join("");
      taskList.innerHTML = html;
   }
}

renderTaskList();
