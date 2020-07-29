import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AddProject from './AddProject'

class ProjectList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            loading: false,
            submitting: false,
            saving: false
        }
    }
    componentDidMount() {
        this.refreshProjects()
    }

    refreshProjects = () => {
        this.setState(state => ({
            ...state,
            loading: true,
            submitting: false,
            saving: false
        }))
        // setTimeout is only here to simulate the timelapse if fetch on a big database
        setTimeout(() => {
            axios.get("http://localhost:3001/api/projects/")
            .then(response => {
                this.setState({
                    projects: response.data
                })
                this.setState(state => ({
                    ...state,
                    loading: this.state.submitting ? true : false
                }))
            })
        }, 400)
    }

    handleSubmittingProject = () => {
        this.setState(state => ({
            ...state,
            loading: true,
            submitting: true
        }))
    }

    handleSavingProject = () => {
        this.refreshProjects()
        this.setState(state => ({
            ...state,
            loading: true,
            submitting: true,
            saving: true
        }))
        // setTimeout is here to maintain the "Added project with success", if not, we dont event see it
        setTimeout(() => {
            this.setState(state => ({
                ...state,
                loading: false,
                submitting: false,
                saving: false
            }))
        },1000)
    }


    render() {

        let projects = ""

        if (this.state.loading && !this.state.submitting) {
            projects = <div>
                <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="loading" />
            </div>
        } else if (this.state.loading && this.state.submitting && !this.state.saving) {
            projects = <div>
                <h2>A file is being downloaded !</h2>
                <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="loading" />
            </div>
        } else if ((this.state.loading && this.state.submitting && this.state.saving)) {
            projects = <h2>Project added with success !</h2>
        } else {
            projects = this.state.projects.map(project => (
                <div key={project._id}>
                    <Link to={`/projects/${project._id}`}><h3>{project.title}</h3></Link>
                    {/*  added so the tasks can be displayed:   */}
                    <ul className="list-group">
                      { project.tasks && project.tasks.length > 0 && "Tasks:" } 
                      { project.tasks.map((task, index) => {
                        return <li className="list-group-item" key={index}>{task.title}</li>
                      }) }
                    </ul>  
                    <p>{project.description}</p>
                </div>
            ))
        }

        return (
            <div>
            <div style={{width: '60%', float:"left"}}>
                <h1>Projects List</h1>
                {projects}
            </div>
            <div style={{width: '40%', float:"right"}}>
                <h2>Add a Project</h2>
                <AddProject
                    submitProject={() => this.handleSubmittingProject()}
                    saveProject={() => this.handleSavingProject()}/>
            </div>
            </div>
        )
    }
}
export default ProjectList