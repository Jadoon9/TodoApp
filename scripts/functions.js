hideCompleted; //Getting saved todos from local storage
const getSavedTodos = () => {
  const todoJSON = localStorage.getItem("todos");
  if (todoJSON !== null) {
    return JSON.parse(todoJSON);
  } else {
    return [];
  }
};

//Adding new Todo
const saveTodo = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

//Removing Todos by iD
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === id;
  });

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

//Toggle Todo by complete value of todo
const toggleTodo = (id) => {
  const todo = todos.find((todo) => {
    return todo.id === id;
  });

  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

//Render Todos
const renderTodos = (todos, filters) => {
  //Filtering Todos on search and hide completed on checkbox check
  const todoEl = document.querySelector("#showTodos");
  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.name
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompleted = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompleted;
  });

  const incompleteTodos = todos.filter((todo) => {
    return !todo.completed;
  });

  showTodos.innerHTML = "";

  //create an h2 and show how many todos are incomplete
  document;
  todoEl.appendChild(generateSummaryDom(incompleteTodos));

  //Render Todos from localstorage
  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      todoEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const p = document.createElement("p");
    p.classList.add("empty-message");
    p.textContent = "No to-dos to show";
    todoEl.appendChild(p);
  }
};

// Generate DOM to display Todos
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const deleteButton = document.createElement("button");

  //setup todo checkbox
  checkbox.setAttribute("type", "checkbox");
  containerEl.appendChild(checkbox);
  checkbox.checked = todo.completed;

  //checkbox click Event
  checkbox.addEventListener("change", (e) => {
    toggleTodo(todo.id);
    saveTodo(todos);
    renderTodos(todos, filters);
  });

  //setup display text
  todoText.textContent = todo.name;
  containerEl.appendChild(todoText);

  //Setup Container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  //Setup Remove Button
  deleteButton.textContent = "Remove";
  todoEl.appendChild(deleteButton);
  deleteButton.classList.add("button", "button--text");

  //Delete todo
  deleteButton.addEventListener("click", (e) => {
    removeTodo(todo.id);
    saveTodo(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

//Generate Summary of incompleted Todos
const generateSummaryDom = (incompleteTodos) => {
  const summary = document.createElement("h2");
  summary.classList.add("list-title");
  const plural = incompleteTodos.length > 1 ? "s" : "";

  summary.innerHTML = `You have ${incompleteTodos.length} todo${plural} left`;

  return summary;
};
