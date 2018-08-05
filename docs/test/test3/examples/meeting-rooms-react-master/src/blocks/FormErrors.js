import React, { Component } from 'react';

class FormErrors extends Component {
    render() {
        return(
            <span className="formErrors">{this.props.formErrors}</span>
        )
    }
}
export default FormErrors;
