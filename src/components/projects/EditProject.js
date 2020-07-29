
import React, { Component } from 'react';
import axios from 'axios';
 
class EditProject extends Component {
  constructor(props){
    super(props);
    this.state = {
        title: this.props.theProject.title, 
        description: this.props.theProject.description
    }
  }
 
  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    axios.put(`http://localhost:3001/api/projects/${this.props.theProject._id}`, { title, description })
    .then( () => {
        this.props.getTheProject();
        // after submitting the form, redirect to '/projects'
        this.props.history.push('/projects');    
    })
    .catch( error => console.log(error))
  }
 
  handleChangeTitle = (event) => {  
    this.setState({
      title:event.target.value
    })
  }
 
  handleChangeDesc = (event) => {  
    this.setState({
      description:event.target.value
    })
  }
 
  render(){
    return (
      <div>
        <hr />
        <h3>Edit form</h3>
        <form className="form-group" onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input className="form-control m-3" type="text" name="title" value={this.state.title} onChange={e => this.handleChangeTitle(e)}/>
          <label>Description:</label>
          <textarea className="form-control m-3" name="description" value={this.state.description} onChange={e => this.handleChangeDesc(e)} />
          
          <input className="btn btn-primary" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
 
export default EditProject;
