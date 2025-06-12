const tasks = [
    {
       title: "Task 1",
       completed: true,
    },
    {
       title: "Task 2",
       completed: false,
    },
    {
       title: "Task 3",
       completed: false,
    },
 ];
 
 const taskList = document.querySelector("#task-list");
 
 const html = tasks
    .map(
       (task) =>
          `<li class="task-item ${task.completed ? "completed" : ""}">
         <span class="task-title">${task.title}</span>
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
 