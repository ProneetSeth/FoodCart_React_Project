import { useState } from "react"
import { Fragment } from "react/cjs/react.production.min"
import CartIcon from "../../../assets/icons/add_cart.svg"
import Modal from "../../UI/Modal"

const ListItem = ({data, updateItemTitle}) =>{
    const [counter,setCounter] = useState(0)
    const [showModal, setShowModal] = useState(false)

    const increaseCounterByOne = () =>{
        setCounter(counter + 1)
    }

    const decreaseCounterByOne = () =>{
        if(counter === 0){
            return;
        }
        setCounter(counter - 1)
    }

    const handleModal = () =>{
        setShowModal(previousState => !previousState)
    }


    return(
            <Fragment>
                <div onClick={handleModal} className={"item-card"}>
                    <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt="some images"/>
                    <div className={"item-card__information"}>
                        <div className={"pricing"}>
                            <span>₹{data.discountedPrice}</span>
                            <small>
                                <strike>₹{data.price}</strike>
                            </small>
                        </div>
                        <div className={"title"}>
                            <h3>{data.title}</h3>
                        </div>
                    </div>
                    <button onClick={()=> updateItemTitle(data.id)}>Update The Title</button>
                    {
                        counter < 1 ?
                        <button className={"card-add"} onClick={increaseCounterByOne}>
                        <span>Add To Cart</span>
                        <img src={CartIcon} alt="Cart Icon" width="18px" height="18px" />
                        </button>
                        :
                        <div className="cart-addon">
                        <button onClick={decreaseCounterByOne}><span>-</span></button>
                        <span>{counter}</span>
                        <button onClick={increaseCounterByOne}><span>+</span></button>
                        </div>
                    }
                </div>
                {showModal && <Modal onClose ={handleModal}/>}
            </Fragment>
       )
}

export default ListItem