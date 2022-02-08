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
        async function fetchItems(){
            try{
                const response = await axios.get('https://react-donut-app-default-rtdb.firebaseio.com/items.json')
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
            }  
            catch(error){
            console.log("Error", error);
            alert("some error occured")
            }
        }
        fetchItems();
    },[])
    
    const updateItemTitle = itemId =>{
        console.log(`item with ID: ${itemId}`);
    }
    return (
        <div className={"product-list"}>
            <div className={"product-list--wrapper"}>
                {
                    items.map(item =>{
                        return(<ListItem key={item.id} data={item} updateItemTitle={updateItemTitle}/>)
                    })
                }
                
            </div>
        </div>
    )
}

export default Products