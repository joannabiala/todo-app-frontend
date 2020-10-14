import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        title: '',
        completed: false,
      },
      editing: false
    }

    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

  };


  componentWillMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    console.log('fetching...! ')

    axios.get('http://127.0.0.1:8000/api/task-list/')
      .then((response) => {
          console.log(response);
          this.setState({
            todoList: response.data
          })
          console.log(this.state.todoList)
        }
      ).catch((error) => {
        console.log(error);
      }
    )
  }


  handleRegister(){
    const data = {
      email: 'joannabiala@gmail.com',
      username: 'joasia',
      password: 'biala'
    }

    axios.post('http://127.0.0.1:8000/api/create-auth/'+1, data ).then((response)=>{
      console.log(response)
    })

  }

  handleDelete(task) {
    axios.delete('http://127.0.0.1:8000/api/task-delete/' + task.id + '/').then(
      (response) => {
        this.fetchTasks()
        console.log(response);
      }
    ).catch((error) => {
      console.log(error)
    })
  }


  handleUpdate(task) {
    this.setState({
      editing: true
    })

    if (this.state.editing === true) {
      this.setState({
        activeItem: {
          title: task.title,
          id: task.id
        }
      })
    }
  }


  handleSubmit(event) {
    event.preventDefault();


    if (this.state.editing === true) {
      axios.put('http://127.0.0.1:8000/api/task-update/' + this.state.activeItem.id + '/', this.state.activeItem).then(
        (response) => {
          this.fetchTasks()
          console.log(response);
          this.setState({
            editing: false
          })
        }
      ).catch((error) => {
        console.log(error)
      })

    } else {

      axios.post('http://127.0.0.1:8000/api/task-create/', this.state.activeItem).then(
        (response) => {
          this.fetchTasks()
          this.setState({
              activeItem: {
                id: null,
                title: '',
                completed: false,
              }
            }
          )
          console.log(response)
        }
      )
    }
  }


  handleChange(event) {
    let name = event.target.name
    let value = event.target.value

    console.log('name: ', name)
    console.log('value: ', value)

    this.setState({
      activeItem: {
        ...this.state.activeItem,
        title: value
      }
    })
  }


  handleComplete(task) {

    task.completed = !task.completed

    axios.put('http://127.0.0.1:8000/api/task-update/' + task.id + '/').then(
      (response) => {
        this.setState({
            completed: task.completed
          }
        )
        console.log(response)

      }
    ).catch((error) => {
      console.log(error)
    })

  }


  render() {

    let tasks = this.state.todoList;
    let self = this;

    return (
      <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <form onSubmit={this.handleSubmit} id="form">
              <div className="flex-wrapper">
                <div style={{flex: 6}}>
                  <input
                    onChange={this.handleChange}
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="title"
                    value={this.state.activeItem.title}
                  />
                </div>
                <div style={{flex: 1}}>
                  <input id="submit" className="btn btn-warning" type="submit" name="add"/>
                </div>
              </div>
            </form>
          </div>

          <div id="list-wrapper">
            {tasks.map(function (task, index) {
              return (
                <div key={index} className="task-wrapper flex-wrapper ">
                  <div style={{flex: 7}}>
                    <span onClick={() => self.handleComplete(task)}>
                   {task.completed === false ? (<span>{task.title}</span>) : (<del>{task.title}</del>)}
                    </span>
                  </div>

                  <div style={{flex: 1}}>
                    <button onClick={() => self.handleUpdate(task)} className="btn btn-sm btn-outline-info">Edit
                    </button>
                  </div>

                  <div>
                    <button onClick={() => self.handleDelete(task)} className="btn btn-sm btn-outline-dark delete">-
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}


export default App;
