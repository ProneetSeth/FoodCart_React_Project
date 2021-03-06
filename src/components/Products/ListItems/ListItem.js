import { useState } from "react"
import { Fragment } from "react/cjs/react.production.min"
import CartIcon from "../../../assets/icons/add_cart.svg"
import Modal from "../../UI/Modal"

const ListItem = ({ data, updateItemTitle, onAdd, onRemove }) => {
    const [showModal, setShowModal] = useState(false)
    

    const increaseCounterByOne = event => {
        event.stopPropagation()
        onAdd(data.id)
    }

    const decreaseCounterByOne = event => {
        event.stopPropagation()
        onRemove(data.id);
    }

    const handleModal = () => {
        setShowModal(previousState => !previousState)
    }


    return (
        <Fragment>
            <div onClick={handleModal} className={"item-card"}>
                <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt="some images" />
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
                <button onClick={() => updateItemTitle(data.id)}>Update The Title</button>
                {
                    data.quantity < 1 ?
                        <button className={"card-add"} onClick={increaseCounterByOne}>
                            <span>Add To Cart</span>
                            <img src={CartIcon} alt="Cart Icon" width="18px" height="18px" />
                        </button>
                        :
                        <div className="cart-addon">
                            <button onClick={decreaseCounterByOne}><span>-</span></button>
                            <span>{data.quantity}</span>
                            <button onClick={increaseCounterByOne}><span>+</span></button>
                        </div>
                }
            </div>
            {showModal &&
                <Modal onClose={handleModal}>
                    <div className="item-card__modal">
                        <div className="img-wrap">
                            <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt="some images" />
                        </div>
                        <div className="meta">
                            <h3>{data.title}</h3>
                            <div className={"pricing"}>
                                <span>₹{data.discountedPrice}</span>
                                <small>
                                    <strike>₹{data.price}</strike>
                                </small>
                            </div>
                            <p>{data.description}</p>
                            {
                                data.quantity < 1 ?
                                    <button className={"card-add card-add__modal"} onClick={increaseCounterByOne}>
                                        <span>Add To Cart</span>
                                        <img src={CartIcon} alt="Cart Icon" width="18px" height="18px" />
                                    </button>
                                    :
                                    <div className="cart-addon cart-addon__modal">
                                        <button onClick={decreaseCounterByOne}><span>-</span></button>
                                        <span>{data.quantity}</span>
                                        <button onClick={increaseCounterByOne}><span>+</span></button>
                                    </div>
                            }
                        </div>
                    </div>
                </Modal>
            }
        </Fragment>
    )
}

export default ListItem