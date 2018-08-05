import React, { Component } from 'react';

import FormErrors from '../blocks/FormErrors';
import Button from '../blocks/Button';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || ''
        }
    }

    _onChange = (event) => {
        const newValue = event.target ? event.target.value : '';
        this.setState({
            value: newValue
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.props.name, newValue);
            }
        })
    };

    _renderButton() {
        const { button } = this.props;
        if (button)
            return (
                <Button
                    type="icon"
                    name={button}
                />
            );
    }

    _renderInput() {
        const { name, placeholder, value, formErrors } = this.props;
        let invalid = formErrors ? 'invalid' : '';

        return (
            <input
                onChange={this._onChange}
                className={"input__field " + invalid}
                placeholder={placeholder}
                value={value}
                id={name}
                name={name}
                type="text"
            />
        );
    }

    render() {
        const { input, name, block, formErrors } = this.props;
        return (
            <div>
                <label htmlFor={name} className="input__label">
                    {block}
                    {formErrors && <FormErrors formErrors = {formErrors}/>}
                </label>
                <div className={input}>
                    {this._renderButton()}
                    {this._renderInput()}
                </div>
            </div>
        )
    }
}

export default Input;
