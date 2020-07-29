import React, { Component } from 'react'
import axios from 'axios'

class AddProject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title:"",
            description: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const body = this.state
        this.props.submitProject()
        // setTimeout is only here to simulate if we upload something heavy
        setTimeout(() => {
            axios.post("http://localhost:3001/api/projects/", body)
            .then(response => {
                this.props.saveProject();
                console.log("Enviado con éxito !")
                this.setState({
                    title:"",
                    description: ""
                })
            })
            .catch(error => console.log("Error: ",error))
        },500)
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState(state => ({
            ...state,
            [name]: value
        }))
    }

    render() {
        return (
            <form className="form-group" onSubmit={this.handleSubmit}>
                <label>Title:</label>
                <input className="form-control" type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                <label>Description:</label>
                <input className="form-control" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                <input className="btn btn-primary m-3" type="submit" value="SEND" />
            </form>
        )
    }
}

export default AddProject
