import { Fragment } from "react"
import ReactDom from "react-dom"
import { Backdrop } from "./Loader"

const Modal = ({onClose}) =>{
    return(
        <Fragment>
            {
                ReactDom.createPortal(
                    <Fragment>
                        <Backdrop onClose={onClose}/>
                        <div className="modal">
                            Modal Content
                            <button onClick={onClose}>X</button>
                        </div>
                    </Fragment>
                    ,
                    document.getElementById("modal-root")
                )
            }
        </Fragment>
    )
}

export default Modal