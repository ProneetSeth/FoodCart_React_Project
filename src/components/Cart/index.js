import { Fragment, useState } from "react"
import Modal from "../UI/Modal"
import CartItem from "./CartItem";

const Cart = ({ count, items, onHandleEvent}) => {
    const [showModal, setShowModal] = useState(false);

    const handleModal = () => {
        setShowModal(previousState => !previousState)
    }

    return (
        <Fragment>
            <button onClick={handleModal}>
                <span className="cart" data-items={count}>Cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" height="30" viewBox="0 0 24 24"
                    fill="none" strokeWidth="1.5" stroke="white" strokeLinejoin="round" strokeLinecap="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="6" cy="19" r="2" />
                    <circle cx="17" cy="19" r="2" />
                    <path d="M17 17h-11v-14h-2" />
                    <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
                    <path d="M15 6h6m-3 -3v6" />
                </svg>
            </button>
            {
                showModal &&
                <Modal onClose={handleModal}>
                    <div className="checkout-modal">
                        <h2>Checkout Modal</h2>
                        <div className="checkout-modal_list">
                            {
                                count > 0 ?
                                    items.map(item => {
                                        return (<CartItem 
                                                    data={item} 
                                                    onEmitIncreaseItem={ id => onHandleEvent(id,1)} 
                                                    onEmitDecreaseItem={id => onHandleEvent(id,-1)} 
                                                    key={item.id} 
                                                />)
                                    })
                                    :
                                    <div className="empty-cart">Please add something in your cart!</div>
                            }
                        </div>
                        {
                            count > 0 &&
                            <div className="checkout-modal_footer">
                                <div className="totalAmount">
                                    <h4>Total Amount: </h4>
                                    <h4>
                                        {
                                         items.reduce((previous,current) =>{
                                            return previous + (current.discountedPrice * current.quantity)
                                        },0)
                                        }
                                        <span style = {{marginLeft: "4px"}}>INR</span>
                                    </h4>
                                </div>
                                <button>Order Now</button>
                            </div>
                        }
                </div>
                </Modal>
            }
        </Fragment >
    )
}

export default Cart