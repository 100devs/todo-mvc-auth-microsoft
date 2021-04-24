const deleteBtn = document.querySelectorAll(".del"); // Query Selector looking for all the buttons with the class 'deleteBtn'
const todoItem = document.querySelectorAll("span.not"); // Query Selector looking for all the span elements with the class 'not'
const todoComplete = document.querySelectorAll("span.completed"); // Query Selector looking for all the span elements with the class 'completed'

// Here we are creating an array with all the elements found in the line number 1 and we are adding an event listener to check if one of them is clicked.
Array.from(deleteBtn).forEach((el) => {
  el.addEventListener("click", deleteTodo);
});
// The same thing but only for 'todoItem'
Array.from(todoItem).forEach((el) => {
  el.addEventListener("click", markComplete);
});
// Same thing for 'todoComplete' when click the task complete value is turned to false
Array.from(todoComplete).forEach((el) => {
  el.addEventListener("click", markIncomplete);
});

async function deleteTodo() {
  // Get the id from the todo
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch("todos/deleteTodo", {
      method: "delete", // delete method to remove an element from the DB
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoIdFromJSFile: todoId, // Sending the todoId
      }),
    });
    const data = await response.json(); //response.json() is comming from the server todos.js line 65
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markComplete() {
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch("todos/markComplete", {
      method: "put", // The put method updates a element in the DB in this case we are changin the complete value to true
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoIdFromJSFile: todoId, // Sending the todoId
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markIncomplete() {
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch("todos/markIncomplete", {
      method: "put", // The put method updates a element in the DB in this case we are changin the complete value to false
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
