﻿import React from 'react';

const Input = (props) => {
    return (
        <div className="form-group">
            <label htmlFor={props.name} className="form-label">{props.title}:</label>
            <br/>
            <input
                className="form-input"
                id={props.name}
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
            />
            <div style={{ color: "red" }}>{props.error}</div>
        </div>
    )
}

export default Input;