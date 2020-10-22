import React from "react";
import axios from 'axios';


export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList : [],
      task : {
        id: '',
        title: '',
        completed: false
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  componentDidMount() {
    this.fetchTasks()
  }

  fetchTasks() {
    axios.get('http://127.0.0.1:8000/api/tasks/')
      .then((response)=>{
        console.log(response)
        this.setState({
          toDoList: response.data
        })
        console.log(this.state.toDoList)
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      title: this.state.title,
    };

    axios.post('http://127.0.0.1:8000/api/tasks/', data)
      .then((response) => {
        console.log(response);
        this.fetchTasks()
      })
      .catch((error) => {
        console.log(error);
      })
  }


  render() {
    let tasks = this.state.toDoList;
    let self = this;
    return (
      <div>
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
                      onChange={this.handleTitleChange}
                      value={this.state.title}
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
      </div>
    )
  }
}