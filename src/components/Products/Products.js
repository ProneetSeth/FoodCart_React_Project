import {useEffect, useState } from "react"
import ListItem from "./ListItems/ListItem"
import axios from "axios"
import Loader from "../UI/Loader"

const Products = ({onAddItem,onRemoveItem,eventState}) => {
    const [items,setItems] = useState([])

    const [loader,setLoader] = useState(true)

    const handleAddItem = id =>{
        let data = [...items]
        let index = data.findIndex(i => i.id === id)
        data[index].quantity += 1
        setItems([...data])
        onAddItem(data[index])
    }

    const handleRemoveItem = id =>{
        let data = [...items]
        let index = data.findIndex(i => i.id === id)
        if(data[index].quantity !== 0){
            data[index].quantity -= 1
            setItems([...data])
            onRemoveItem(data[index])
        }
        
    }

    useEffect(()=>{
        async function fetchItems(){
            try{
                const response = await axios.get('https://react-donut-app-default-rtdb.firebaseio.com/items.json')
                const data = response.data
                const transformedData = data.map((item,index)=>{
                    return{
                        ...item,
                        quantity:0,
                        id:index 
                        //getting the index and mapping the data for id 
                    }
                })
                setItems(transformedData)
            }  
            catch(error){
                console.log("Error", error);
                alert("some error occured")
            }
            finally{
                setLoader(false)
            }
        }
        fetchItems();
    },[])

    useEffect(() => {
        if(eventState.id > -1){
            if(eventState.type === 1){
                handleAddItem(eventState.id)
            }
            else if(eventState.type === -1){
                handleRemoveItem(eventState.id)
            }
        }
    },[eventState])
    
    const updateItemTitle = async(itemId) =>{
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
        <>
        <div className={"product-list"}>
            <div className={"product-list--wrapper"}>
                {
                    items.map(item =>{
                        return(<ListItem onAdd={handleAddItem} onRemove={handleRemoveItem} key={item.id} data={item} updateItemTitle={updateItemTitle}/>)
                    })
                }
                
            </div>
        </div>
        {loader && <Loader/>}
        </>
    )
}

export default Products