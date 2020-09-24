import React, { Component } from 'react'
import '../App.css';



export class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            num: this.props.num,
            id: this.props.id,
            completed: this.props.completed
        }
    }

    render() {
        return (
            <div className="todo" >
                <ul className="todoText">{this.state.num}. {this.state.name.toUpperCase()}
                    <input className="deleteBtn" type="button" data-id={this.props.id} onClick={this.props.delete} value="Delete" />

                    <label className="cb-label" for="checkbox">Complete</label>
                    <input className="completed" name="checkbox" type="checkbox" data-id={this.props.id} checked={this.props.completed} onChange={this.props.setCompleted}/>
                </ul>
            </div>
        )
    }
} 

export default Todo