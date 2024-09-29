const task = document.getElementById("tarea");
const addBtn = document.getElementById("agregar-btn");
const lista = document.getElementById("task-list");
const divTotal = document.getElementById("total");
const divRealizadas = document.getElementById("realizadas");

let arrayTask = [
  { id: 1, tarea: "Tarea inicial 1", checked: false },
  { id: 2, tarea: "Tarea inicial 2", checked: true },
  { id: 3, tarea: "Tarea inicial 3", checked: false },
];
let id = 4;
let total = arrayTask.length;
let realizadas = arrayTask.filter((tarea) => tarea.checked).length;

const pressAdd = () => {
  if (!task.value) return;

  arrayTask.push({
    id: id++,
    tarea: task.value,
    checked: false,
  });

  renderTaskList();

  task.value = "";
};

const renderTaskList = () => {
  lista.innerHTML = ""; // Limpia la lista

  for (const tarea of arrayTask) {
    const li = document.createElement("li");
    li.className = "task-item";
    li.innerHTML = `
          <p>${tarea.id}</p>
          <span class="task-text ${tarea.checked ? "tachado" : ""}">${
      tarea.tarea
    }</span>
          <input type="checkbox" class="check-tarea" ${
            tarea.checked ? "checked" : ""
          } />
          <button class="delete-task">x</button>
        `;

    // Agregar eventos al checkbox y botón de eliminar
    const checkbox = li.querySelector(".check-tarea");
    const removeTask = li.querySelector(".delete-task");

    // Eliminar tarea
    removeTask.addEventListener("click", () =>
      deleteTask(tarea.id, tarea.checked)
    );

    // Cambiar estado de tarea completada
    checkbox.addEventListener("change", (event) => {
      const taskText = li.querySelector(".task-text");
      tarea.checked = event.target.checked;

      if (event.target.checked) {
        taskText.classList.add("tachado");
        realizadas += 1;
        divRealizadas.innerHTML = realizadas;
      } else {
        taskText.classList.remove("tachado");
        realizadas -= 1;
        divRealizadas.innerHTML = realizadas;
      }
    });

    lista.appendChild(li);
  }

  total = arrayTask.length;
  divTotal.innerHTML = total;
  divRealizadas.innerHTML = realizadas;
};

const deleteTask = (taskId, checked) => {
  arrayTask = arrayTask.filter((tarea) => tarea.id !== taskId);
  if (checked) {
    realizadas -= 1;
  }
  renderTaskList();
};

addBtn.addEventListener("click", pressAdd);

renderTaskList();
