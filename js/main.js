(() => {
  let todos;
  const createTodo = document.querySelector('.input');
  const todosList = document.querySelector('.todos');
  createTodo.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const item = document.createElement('li');
    item.classList.add('todos__item');
    item.textContent = createTodo.value;
    createTodo.value = '';
    todosList.append(item);
  });
})();
