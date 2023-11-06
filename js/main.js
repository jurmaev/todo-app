(() => {
  let todos = JSON.parse(localStorage.getItem('todos'))
    ? JSON.parse(localStorage.getItem('todos'))
    : [];

  const searchParams = new URLSearchParams(window.location.search);
  let tab = searchParams.get('tab') ? searchParams.get('tab') : 'all';

  const createTodo = document.querySelector('.input');
  const todosList = document.querySelector('.todo__list');
  const addBtn = document.querySelector('.add__btn');
  const controlBtns = document.querySelectorAll('.btn');

  addTodos(todos);

  controlBtns.forEach((btn) => {
    if (btn.id === tab) btn.classList.add('btn--active');

    btn.addEventListener('click', () => {
      if (btn.id === 'clear') {
        todos = todos.filter((todo) => !todo.isCompleted);
        localStorage.setItem('todos', JSON.stringify(todos));
        todosList.innerHTML = '';
        addTodos(todos);
      } else {
        searchParams.set('tab', btn.id);
        window.location.search = searchParams.toString();
        tab = btn.id;
        todosList.innerHTML = '';
        addTodos(todos);
      }
    });
  });

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
      if (isDisplayed(todo)) {
        const todoContainer = document.createElement('li');
        const item = document.createElement('span');
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
            todos.find(
              (todo) => todo.id === todoContainer.id
            ).isCompleted = true;
          } else {
            todoContainer.classList.remove('checked');
            todos.find(
              (todo) => todo.id === todoContainer.id
            ).isCompleted = false;
          }
          setItemsLeft();
          localStorage.setItem('todos', JSON.stringify(todos));
        });

        closeBtn.addEventListener('click', () => {
          const id = todoContainer.id;
          todoContainer.remove();
          todos = todos.filter((todo) => todo.id !== id);
          localStorage.setItem('todos', JSON.stringify(todos));
          setItemsLeft();
        });
      }
    });

    setItemsLeft();
  }

  function setItemsLeft() {
    const itemsLeft = document.querySelector('.todo__left');
    itemsLeft.textContent = `${
      todos.filter((todo) => !todo.isCompleted).length
    } items left`;
  }

  function isDisplayed(todo) {
    if (tab === 'active' && !todo.isCompleted) return true;
    else if (tab === 'completed' && todo.isCompleted) return true;
    return tab === 'all';
  }
})();
