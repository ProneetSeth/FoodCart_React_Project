import {useEffect, useState } from "react"
import ListItem from "./ListItems/ListItem"

const Products = () => {
    const [items,setItems] = useState([
        {
            id:0,
            discountedPrice: 340,
            price: 450,
            title: "Title of the Item",
            thumbnail: "donut.png"
        },
        {
            id: 1,
            discountedPrice: 200,
            price: 350,
            title: "Title of the Item",
            thumbnail: "donut.png"
        },
        {
            id: 2,
            discountedPrice: 300,
            price: 450,
            title: "Title of the Item",
            thumbnail: "donut.png"
        }
    ])

    useEffect(()=>{
        const result = fetch(`https://react-donut-app-default-rtdb.firebaseio.com/items.json`)
        .then(response =>{
            console.log(response)
        })
    },[])

    return (
        <div className={"product-list"}>
            <div className={"product-list--wrapper"}>
                {
                    items.map(item =>{
                        return(<ListItem key={item.id} data={item}/>)
                    })
                }
                
            </div>
        </div>
    )
}

export default Products