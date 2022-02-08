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
    
    const updateItemTitle = async(itemId) =>{
        //console.log(`item with ID: ${itemId}`);
        try{
            let title = `update title #item-${itemId}`
            await axios.patch(`https://react-donut-app-default-rtdb.firebaseio.com/items/${itemId}.json`,{
                title:title
            })
            let data = [...items]
            let index = data.findIndex(e => e.id === itemId)
            data[index]['title'] = title
            
            setItems(data)
        }
        catch(error){
            console.log("Error updating the data");
        }
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