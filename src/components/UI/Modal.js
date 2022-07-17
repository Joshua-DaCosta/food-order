import classes from './Modal.module.css';
import  ReactDOM  from 'react-dom';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={() => props.toggleCart()}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
            {props.children}
      </div>
    </div>
  );
};

const Modal = props => {
      const overylaysNode = document.getElementById("overlays");
  return (
    <>
      {ReactDOM.createPortal(<Backdrop toggleCart={props.toggleCart}/>, overylaysNode)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overylaysNode
      )}
    </>
  );
}

export default Modal