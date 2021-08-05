const todos = getSavedTodos();
const filters = { searchText: "", hideCompleted: false };
const showTodos = document.querySelector("#showTodos");

//Reading Todos and diplay
renderTodos(todos, filters);

//Filtering Todos on filter input text and push into filters object
document.querySelector("#filterTodos");
filterTodos.addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

//Adding new Todo and save to Local storage
document.querySelector("#addTodo").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.elements.text.value.trim();
  if (name) {
    todos.push({
      id: uuidv4(),
      name,
      completed: false,
    });
  }
  saveTodo(todos);
  renderTodos(todos, filters);
  e.target.elements.text.value = "";
});

//Checkbox Check
document.querySelector("#hideCompleted");
hideCompleted.addEventListener("change", (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
