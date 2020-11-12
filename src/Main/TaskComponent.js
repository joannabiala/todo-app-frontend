import React from "react";

const TaskComponent = (props) => {

  return (
    <div>
      {props.task.title}
      {props.task.completed}
    </div>
  );
}


export default TaskComponent;