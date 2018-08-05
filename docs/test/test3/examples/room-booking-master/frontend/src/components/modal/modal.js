import React from "react";
import ReactDOM from "react-dom";

let modalRoot;

export class Modal extends React.Component {

    constructor(props) {
        super(props);

        this.element = document.createElement('div');
        if(!modalRoot){
            modalRoot = document.createElement('div');
            modalRoot.id = 'modal-root';

            document.body.appendChild(modalRoot);
        }
    }

    componentDidMount() {
        modalRoot.appendChild(this.element);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.element);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.element
        );
    }
}
