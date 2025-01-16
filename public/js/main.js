// Get all the buttons and todo items from page
const deleteBtn = document.querySelectorAll('.del');
const todoItem = document.querySelectorAll('span.not');
const todoComplete = document.querySelectorAll('span.completed');

// Add click handlers to all elements
Array.from(deleteBtn).forEach((el) => {
  el.addEventListener('click', deleteTodo);
});

Array.from(todoItem).forEach((el) => {
  el.addEventListener('click', markComplete);
});

Array.from(todoComplete).forEach((el) => {
  el.addEventListener('click', markIncomplete);
});

// Delete todo function
async function deleteTodo() {
  const todoId = this.parentNode.dataset.id; // Get todo ID
  try {
    const response = await fetch('todos/deleteTodo', {
      method: 'delete',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    location.reload(); // Refresh page after delete
  } catch (err) {
    console.log(err);
  }
}

// Mark todo as complete
async function markComplete() {
  const todoId = this.parentNode.dataset.id; // Get todo ID
  try {
    const response = await fetch('todos/markComplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    location.reload(); // Refresh page after update
  } catch (err) {
    console.log(err);
  }
}

// Mark todo as incomplete
async function markIncomplete() {
  const todoId = this.parentNode.dataset.id; // Get todo ID
  try {
    const response = await fetch('todos/markIncomplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    location.reload(); // Refresh page after update
  } catch (err) {
    console.log(err);
  }
}
