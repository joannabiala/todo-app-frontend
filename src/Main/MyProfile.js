import React from "react";
import axios from 'axios';
import '../App.css';
import {Redirect} from "react-router-dom";


export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        title: '',
        completed: false
      },
      editing: false,
      redirectToMain: false,
      searchField: '',

    }

    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }


  handleSearchFieldChange(event) {
    this.setState({
      searchField: event.target.value,
    });
  }

  handleUpdate(task) {
    this.setState({
      editing: true
    })

    if (this.state.editing === true) {
      this.setState({
        activeItem: {
          title: task.title,
          id: task.id,
          completed: task.completed
        }
      })
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

  handleDelete(task) {
    axios.delete('http://127.0.0.1:8000/api/tasks/' + task.id + '/').then(
      (response) => {
        this.fetchTasks()
        console.log(response);
      }
    ).catch((error) => {
      console.log(error)
    })
  }


  componentDidMount() {
    this.fetchTasks()
  }

  fetchTasks() {
    axios.get('http://127.0.0.1:8000/api/tasks/')
      .then((response) => {
        console.log(response)
        this.setState({
          todoList: response.data
        })
        console.log(this.state.todoList)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.editing === true) {
      axios.put('http://127.0.0.1:8000/api/tasks/' + this.state.activeItem.id + '/', this.state.activeItem).then(
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

      axios.post('http://127.0.0.1:8000/api/tasks/', this.state.activeItem)
        .then((response) => {
          this.setState({
              activeItem: {
                id: null,
                title: '',
                completed: false,
              }
            }
          )

          console.log(response);
          this.fetchTasks()

        })
        .catch((error) => {
          console.log(error);
        })

    }
  }


  handleComplete(task) {

    task.completed = !task.completed

    axios.put('http://127.0.0.1:8000/api/tasks/' + task.id + '/').then(
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


  handleLogout() {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common['Authorization'];
    this.setState({redirectToMain: true})
  }

  handleSearch(event) {
    event.preventDefault();
    axios.get('http://127.0.0.1:8000/api/tasks/?search=' + this.state.searchField).then(
      (response) => {
        console.log(response)
      }
    ).catch((error) => {
      console.log(error)
    })
  }


  render() {
    let tasks = this.state.todoList;
    let self = this;


    if (this.state.redirectToMain) {
      return (<Redirect to="/main"/>)
    }

    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input onChange={this.handleSearchFieldChange} type="text"/>
          <button type="submit">Szukaj</button>
        </form>

        <div className="container">
          <div id="task-container">
            <div id="form-wrapper">
              <form onSubmit={this.handleSubmit} id="form">
                <div className="flex-wrapper">
                  <div style={{flex: 6}}>
                    <input
                      className="form-control"
                      id="title"
                      name="title"
                      placeholder="title"
                      onChange={this.handleChange}
                      value={this.state.activeItem.title}
                    />
                  </div>
                  <div style={{flex: 1}}>
                    <input id="submit" className="btn btn-warning" type="submit" name="add"/>
                  </div>
                </div>
              </form>
            </div>

            <button onClick={this.handleLogout}>Wyloguj</button>

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
      </div>
    )
  }
}