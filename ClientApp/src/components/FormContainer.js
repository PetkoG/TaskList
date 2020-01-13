import React, { Component } from 'react';

/* Import Components */
import Input from './Input';

export default class  FormContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newTask: {
                Name: '',
                Details: '',
                ParentTaskId: '',
                User: '',
                Tags: ''
            },
            errors: {
                name: '',
                details: '',
                parentTaskId: '',
                user: '',
                tags: ''
            },
            response: ''
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        let isValid = this.validate(this.state.newTask);
        if (isValid) {
            let newTask = { ...this.state.newTask };
            newTask.ParentTaskId ? newTask.ParentTaskId = Number(newTask.ParentTaskId) : newTask.ParentTaskId = 1;
            console.log(JSON.stringify(newTask))
            fetch('api/Tasks', {
                method: "POST",
                body: JSON.stringify(newTask),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                let responseString = response.ok ? 'Success!' : 'Failed to create!'
                
                this.setState(state => {
                    state.response = responseString
                    return state
                })
            })
           
        }
    }
    handleChange(event) {
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'Name':
                errors.name =
                    value.trim().length < 1
                        ? 'Name cannot be blank!'
                        : '';
                break;
            case 'Details':
                errors.details =
                    value.trim().length < 1
                        ? 'Details cannot be blank!'
                        : '';
                break;
            case 'ParentTaskId':
                errors.parentTaskId =
                    value.trim().length > 0
                        ? isNaN(value) ? 'Enter valid ID number!' : ''
                        : '';
                break;
            case 'User':
                errors.user =
                    value.trim().length < 1
                        ? 'User cannot be blank!'
                        : '';
                break;
            default:
                break;
        }
        this.setState(state => {
            state.newTask[name] = value
            state.errors = errors
            return state
        })
    }
    validate(newTask) {
        let errors = this.state.errors,
            valid = true;

        if (newTask.Name.trim().length === 0) {
            errors.name = 'Name cannot be blank!';
            valid = false;
        }

        if (newTask.Details.trim().length === 0) {
            errors.details = 'Details cannot be blank!';
            valid = false;
        }

        if (newTask.ParentTaskId.trim().length > 0 && isNaN(newTask.ParentTaskId)) {
            errors.parentTaskId = "Enter valid ID number!";
            valid = false;
        }
        if (newTask.User.trim().length === 0) {
            errors.user = 'User cannot be blank!';
            valid = false;
        }

        this.setState(state => {
            state.errors = errors
            return state
        })
        console.log(errors)
        console.log(newTask)
        return valid;
    }
    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <Input type={'text'}
                    title={'Task Name'}
                    name={'Name'}
                    value={this.state.newTask.Name}
                    error={this.state.errors.name}
                    placeholder={'Enter task name'}
                    handleChange={this.handleChange}
                />
                <Input type={'text'}
                    title={'Task Details'}
                    name={'Details'}
                    value={this.state.newTask.Details}
                    error={this.state.errors.details}
                    placeholder={'Enter task details'}
                    handleChange={this.handleChange}
                />
                <Input type={'text'}
                    title={'Parent ID'}
                    name={'ParentTaskId'}
                    value={this.state.newTask.ParentTaskId}
                    error={this.state.errors.parentTaskId}
                    placeholder={'Enter task parent ID'}
                    handleChange={this.handleChange}
                />
                <Input type={'text'}
                    title={'Task User'}
                    name={'User'}
                    value={this.state.newTask.User}
                    error={this.state.errors.user}
                    placeholder={'Enter task user'}
                    handleChange={this.handleChange}
                />
                <Input type={'text'}
                    title={'Task  Tags'}
                    name={'Tags'}
                    value={this.state.newTask.Tags}
                    error={this.state.errors.tags}
                    placeholder={'Enter task tags'}
                    handleChange={this.handleChange}
                />
                <input type="submit" />
                <br/>
                <div style={{ color: this.state.response === 'Success!' ? "Green" : "Red"}}> {this.state.response} </div>
            </form>
        );
    }
}
