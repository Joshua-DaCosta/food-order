import classes from './Modal.module.css';
import  ReactDOM  from 'react-dom';

const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
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
      {ReactDOM.createPortal(<Backdrop />, overylaysNode)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overylaysNode
      )}
    </>
  );
}

export default Modal