// Event listener for when the window has finished loading
window.addEventListener('load', () => {
	// Retrieve todos from localStorage or initialize an empty array
	todos = JSON.parse(localStorage.getItem('todos')) || [];

	// Select relevant DOM elements
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

	// Retrieve username from localStorage or set it to an empty string
	const username = localStorage.getItem('username') || '';

	// Set the value of the name input to the retrieved or default username
	nameInput.value = username;

	// Event listener for changes in the name input
	nameInput.addEventListener('change', (e) => {
		// Update and store the username in localStorage
		localStorage.setItem('username', e.target.value);
	})

	// Event listener for form submission to add a new todo
	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		// Create a new todo object
		const todo = {
			content: e.target.elements.content.value,
			done: false,
			createdAt: new Date().getTime()
		}

		// Add the new todo to the todos array
		todos.push(todo);

		// Store the updated todos array in localStorage
		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		// Display the updated todos
		DisplayTodos()
	})

	// Display the todos when the page loads
	DisplayTodos()
})

// Function to display todos in the DOM
function DisplayTodos () {
	// Select the todo list container
	const todoList = document.querySelector('#todo-list');
	// Clear the existing content of the todo list container
	todoList.innerHTML = "";

	// Loop through each todo in the todos array
	todos.forEach(todo => {
		// Create a new div for the todo item
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		// Create DOM elements for the todo item components
		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		// Set attributes and classes for the checkbox, span, and other elements
		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		// Set the content of the todo content div
		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		// Set the labels and append elements to the todo item div
		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		// Append the todo item to the todo list container
		todoList.appendChild(todoItem);

		// Add 'done' class to the todo item if it is marked as done
		if (todo.done) {
			todoItem.classList.add('done');
		}

		// Event listener for changes in the checkbox
		input.addEventListener('change', (e) => {
			// Update the 'done' status of the todo
			todo.done = e.target.checked;
			// Store the updated todos array in localStorage
			localStorage.setItem('todos', JSON.stringify(todos));

			// Update the visual representation of the todo item
			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			// Display the updated todos
			DisplayTodos()
		})

		// Event listener for the 'Edit' button
		edit.addEventListener('click', (e) => {
			// Select the input element within the todo content div
			const input = content.querySelector('input');
			// Remove the 'readonly' attribute to enable editing
			input.removeAttribute('readonly');
			// Set focus on the input element
			input.focus();
			// Event listener for when the input loses focus (blurs)
			input.addEventListener('blur', (e) => {
				// Set the 'readonly' attribute to disable further editing
				input.setAttribute('readonly', true);
				// Update the content of the todo with the edited value
				todo.content = e.target.value;
				// Store the updated todos array in localStorage
				localStorage.setItem('todos', JSON.stringify(todos));
				// Display the updated todos
				DisplayTodos()
			})
		})

		// Event listener for the 'Delete' button
		deleteButton.addEventListener('click', (e) => {
			// Remove the todo from the todos array
			todos = todos.filter(t => t != todo);
			// Store the updated todos array in localStorage
			localStorage.setItem('todos', JSON.stringify(todos));
			// Display the updated todos
			DisplayTodos()
		})
	})
}
