import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const Modal = (props) => {

  return (
    <Auxiliary>
      <Backdrop show={props.show} clicked={props.clicked} />
      <div className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}>
        {props.children}
      </div>
    </Auxiliary>
  );

};

export default React.memo(Modal, (prevProps, nextProps) => {
  return nextProps.show === prevProps.show && nextProps.children === prevProps.children;
});