(() => {
  let todos = JSON.parse(localStorage.getItem('todos'))
    ? JSON.parse(localStorage.getItem('todos'))
    : [];

  const createTodo = document.querySelector('.input');
  const todosList = document.querySelector('.todo__list');

  addTodos(todos);

  createTodo.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;

    const todoValue = createTodo.value.trim();
    if (!todoValue) return;
    currentTodo = {
      id: crypto.randomUUID(),
      value: todoValue,
      isCompleted: false,
    };
    todos.push(currentTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    createTodo.value = '';
    addTodos([currentTodo]);
  });

  function addTodos(todos) {
    todos.forEach((todo) => {
      const todoContainer = document.createElement('div');
      const item = document.createElement('li');
      const closeBtn = document.createElement('button');
      const closeImg = document.createElement('img');

      closeImg.src = 'assets/close.svg';
      closeImg.alt = 'Delete todo';
      closeImg.classList.add('todo__close');

      closeBtn.classList.add('todo__btn');
      todoContainer.classList.add('todo__container');
      todoContainer.id = todo.id;

      item.classList.add('todo__item');
      item.textContent = todo.value;
      closeBtn.append(closeImg);
      todoContainer.append(item);
      todoContainer.append(closeBtn);
      todosList.append(todoContainer);

      closeBtn.addEventListener('click', (e) => {
        const id = e.target.parentElement.parentElement.id;
        e.target.parentElement.parentElement.remove();
        todos = todos.filter((todo) => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(todos));
      });
    });
  }
})();
