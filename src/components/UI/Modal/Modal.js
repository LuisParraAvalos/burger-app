import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

class Modal extends React.Component {
  
  shouldComponentUpdate(nextProps, _) {
     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    return (
      <Auxiliary>
        <Backdrop show={this.props.show} clicked={this.props.clicked} />
        <div className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}>
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
};

export default Modal;