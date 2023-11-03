(() => {
  let todos = JSON.parse(localStorage.getItem('todos'))
    ? JSON.parse(localStorage.getItem('todos'))
    : [];

  const createTodo = document.querySelector('.input');
  const todosList = document.querySelector('.todos');

  addTodos(todos);

  createTodo.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;

    const todoValue = createTodo.value.trim();
    if (!todoValue) return;

    todos.push({ value: todoValue, isCompleted: false });
    localStorage.setItem('todos', JSON.stringify(todos));
    createTodo.value = '';
    addTodos(todos);
  });

  function addTodos(todos) {
    todos.forEach((todo) => {
      const item = document.createElement('li');
      item.classList.add('todos__item');
      item.textContent = todo.value;
      todosList.append(item);
    });
  }
})();
