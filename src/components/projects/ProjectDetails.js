import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import EditProject from './EditProject';
import AddTask from '../tasks/AddTask';

class ProjectDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project: {}        }
    }

    componentDidMount() {
        this.getSingleProject()
    }

    getSingleProject = () => {
        const { params } = this.props.match
        axios.get(`http://localhost:3001/api/projects/${params.id}`)
        .then(response => {
            this.setState({
                ...this.state,
                project: response.data
            })
        })
    }

    renderEditForm = () => {
        if(!this.state.project.title){
            this.getSingleProject();
        } else {
        //                                                    {...props} => so we can have 'this.props.history' in Edit.js
        //                                                                                          ^
        //                                                                                          |
            return <EditProject theProject={this.state.project} getTheProject={this.getSingleProject} {...this.props} />
        }
    }

    deleteProject = () => {
        const { params } = this.props.match;
        axios.delete(`http://localhost:3001/api/projects/${params.id}`)
        .then( () =>{
            this.props.history.push('/projects')     
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderAddTaskForm = () => {
        if(!this.state.project.title){
            this.getSingleProject();
        } else {     
                // pass the project and method getSingleProject() as a props down to AddTask component
        return <AddTask theProject={this.state.project} getTheProject={this.getSingleProject} />
        }
    }

    render() {
        return (
            <div>
                <h1>Detalles del proyecto</h1>
                <h2>{this.state.project.title}</h2>
                <p>{this.state.project.description}</p>
                { this.state.project.tasks && this.state.project.tasks.length > 0 && <h3>Tasks </h3> }
                {/* map through the array of tasks and... */}
                { this.state.project.tasks && this.state.project.tasks.map((task, index) => {
                    return(
                        <div key={ index }>
                        {/* ... make each task's title a link that goes to the task details page */}
                            <Link to={`/projects/${this.state.project._id}/tasks/${task._id}`}> 
                                { task.title }
                            </Link>
                        </div>
                    )
                    
                }) }
                <button className="btn btn-danger" onClick={() => this.deleteProject()}>Delete project</button>
                <div>{this.renderEditForm()} </div>
                <div>{this.renderAddTaskForm()} </div>
                <br/><br/><br/><br/><br/>
                <Link to={'/projects'}>Back to projects</Link>
            </div>
        )
    }
}

export default ProjectDetails
