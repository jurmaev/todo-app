(() => {
  let todos = JSON.parse(localStorage.getItem('todos'))
    ? JSON.parse(localStorage.getItem('todos'))
    : [];

  const createTodo = document.querySelector('.input');
  const todosList = document.querySelector('.todo__list');
  const addBtn = document.querySelector('.add__btn');

  addTodos(todos);

  addBtn.addEventListener('click', () => {
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

  createTodo.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    addBtn.click();
  });

  function addTodos(todos) {
    todos.forEach((todo) => {
      const todoContainer = document.createElement('div');
      const item = document.createElement('li');
      const closeBtn = document.createElement('button');
      const closeImg = document.createElement('img');
      const checkboxContainer = document.createElement('div');
      const checkbox = document.createElement('input');
      const checkmark = document.createElement('span');

      if (todo.isCompleted) {
        todoContainer.classList.add('checked');
        checkbox.checked = true;
      }

      closeImg.src = 'assets/close.svg';
      closeImg.alt = 'Delete todo';
      closeImg.classList.add('todo__close');

      closeBtn.classList.add('todo__btn');
      todoContainer.classList.add('todo__container');
      todoContainer.id = todo.id;

      checkboxContainer.classList.add('checkbox__container');
      checkbox.type = 'checkbox';
      checkbox.classList.add('todo__checkbox');
      checkmark.classList.add('todo__checkmark');

      item.classList.add('todo__item');
      item.textContent = todo.value;

      closeBtn.append(closeImg);

      checkboxContainer.append(checkbox);
      checkboxContainer.append(checkmark);

      todoContainer.append(checkboxContainer);
      todoContainer.append(item);
      todoContainer.append(closeBtn);

      todosList.append(todoContainer);

      checkbox.addEventListener('click', (e) => {
        if (e.target.checked) {
          todoContainer.classList.add('checked');
          todos.find((todo) => todo.id === todoContainer.id).isCompleted = true;
        } else {
          todoContainer.classList.remove('checked');
          todos.find(
            (todo) => todo.id === todoContainer.id
          ).isCompleted = false;
        }
        localStorage.setItem('todos', JSON.stringify(todos));
      });

      closeBtn.addEventListener('click', (e) => {
        const id = todoContainer.id;
        console.log(todoContainer.id, id);
        todoContainer.remove();
        todos = todos.filter((todo) => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(todos));
      });
    });
  }
})();
