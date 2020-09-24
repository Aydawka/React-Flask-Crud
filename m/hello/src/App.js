import React, { Component } from 'react';
import './App.css';
import TodoInput from './components/TodoInput'
import Todo from './components/Todo'

class App extends Component {
  constructor(props)  {
    super();
    this.state = {
      todos: [],
      num: 1
    }
  }

  getTodos = () => {
    const route = 'todos';
    fetch(`http://127.0.0.1:5000/${route}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        this.setState({
          todos: jsonResponse.todos
        })
      })
      .catch(function () {
        alert('Unable to load todos. Please try your request again');
        return;
      })
  }

  deleteTodo = (event) => {
    if (window.confirm('Are you sure you want to delete the item?')) {
      event.preventDefault();
      const id = event.target.dataset['id'];
      const route = `todos/${id}`;
      fetch(`http://127.0.0.1:5000/${route}`, {
        method: 'DELETE',
      })
        .then(() => {
          window.location.reload(true);
        })
        .catch(function () {
          alert('Unable to delete todo. Please try your request again');
          return;
        })
    }
  }

  setCompleted = (event) => {
    const id = event.target.dataset['id'];
    let checked = event.target.checked;
    const route = `todos/completed/${id}`;
    fetch(`http://127.0.0.1:5000/${route}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 'completed': checked })
    }).then(() => {
      this.setState({ completed: checked });
      this.getTodos();
    })
      .catch(function () {
        alert('Unable to mark completed. Please try your request again');
        return;
      })
  }

  componentDidMount = () => {
    this.getTodos();
  }

  render() {
    return (
      <div className="App">
        <h1>Basic Todo App</h1>
        <TodoInput get_Todos={this.getTodos} />
        <h2>Todo List:</h2>
        <div className="todoList">{this.state.todos.map((todo, index) => (
         <b> <div class="s"><Todo  key={todo.id}
            name={todo.name}
            num={index + 1}
            id={todo.id}
            completed={todo.completed}
            setCompleted={this.setCompleted}
            delete={this.deleteTodo} /></div></b>
        ))}</div>
      </div>
    )
  }
}

export default App;