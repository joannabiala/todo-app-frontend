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

  };

  componentWillMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    console.log('fetching...! ')

    axios.get('http://127.0.0.1:8000/api/task-list/')
     .then((response)=>{
      console.log(response);
      }
    ).catch( (error)=>{
        console.log(error);
      }
    )
  }

  render() {
    return (
      <div className="container">
        <div id="form-wrapper">
          <form id="form">
            <div className="flex-wrapper">
              <div style={{flex: 6}}>
                <input className="form-control" id="title" name="title" placeholder="title"/>
              </div>
              <div style={{flex: 1}}>
                <input id="submit" className="btn btn-warning" type="submit" name="add"/>
              </div>
            </div>
          </form>
        </div>

        <div id="list-wrapper">

        </div>
      </div>
    )
  }
}


export default App;
