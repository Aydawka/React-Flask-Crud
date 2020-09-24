import React, { Component } from 'react'
import '../App.css';

export default  Component {
    constructor(props) 
        super();
        this.state = {
            input: ""
        }

    } 

    submitData = (event) => {
        event.preventDefault();
        const route = 'todos';
        fetch(`api/tasks/${route}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: this.state.input, 'completed': false })
        })
            .then(response => response.json())
            .then(jsonResponse => {
                this.props.get_Todos();
            })
            .catch(function () {
                alert('Unable to add todo. Please try your request again');
                return;
            })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() 
        return (
            <div className='inputForm' id='basicForm'>
                <form id='inputForm' onSubmit={this.submitData}>
                    <input class="input" type='text' name='input' placeholder='Enter a To-Do' onChange={this.handleChange} />
                    <input type='submit' class='sub' id='Submit' name='submit' />
                </form>
            </div>
        )
    }
