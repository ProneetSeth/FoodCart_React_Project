import {useEffect, useState } from "react"
import ListItem from "./ListItems/ListItem"
import axios from "axios"

const Products = () => {
    const [items,setItems] = useState([])

    useEffect(()=>{
        // fetch(`https://react-donut-app-default-rtdb.firebaseio.com/items.json`)
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        // })
        // .catch(error =>{
        //     console.log(error);
        // })
        axios.get('https://react-donut-app-default-rtdb.firebaseio.com/items.json')
        .then(response =>{
            //console.log(response);
            const data = response.data
            const transformedData = data.map((item,index)=>{
                return{
                    ...item,
                    id:index 
                    //getting the index and mapping the data for id 
                }
            })
            setItems(transformedData)
            //console.log(transformedData);
        })
        .catch(error =>{
            console.log(error);
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