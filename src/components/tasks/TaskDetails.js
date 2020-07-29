import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
 
 
class TaskDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
 
  componentDidMount(){
    this.getTheTask();
  }
 
  getTheTask = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:3001/api/projects/${params.id}/tasks/${params.taskId}`)
    .then( responseFromApi =>{
      const theTask = responseFromApi.data;
      this.setState(theTask);
    })
    .catch((err)=>{
        console.log(err)
    })
  }
 
  render(){
    return(
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <Link to={`/projects/${this.props.match.params.id}`}>Back to the project</Link>
      </div>
    )
  }
}
 
export default TaskDetails;