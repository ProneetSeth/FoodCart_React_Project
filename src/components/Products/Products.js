import {useEffect, useState } from "react"
import ListItem from "./ListItems/ListItem"
import axios from "axios"
import Loader from "../UI/Loader"

const Products = ({onAddItem,onRemoveItem}) => {
    const [items,setItems] = useState([])
    const [loader,setLoader] = useState(true)
    const [presentItems, setPresentItems] = useState([])
    const handleAddItem = id =>{
        if(presentItems.indexOf(id) > -1){
            return
        }
        setPresentItems([...presentItems,id])
        onAddItem();
    }
    const handleRemoveItem = id =>{
        let index = presentItems.indexOf(id)
        if(index > -1){
            let items = [...presentItems]
            items.splice(index,1)
            setPresentItems([...items]);
            onRemoveItem();
        }
        
    }
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
                //setLoader(false)
                setItems(transformedData)
                //console.log(transformedData);
            }  
            catch(error){
                //setLoader(false)
                console.log("Error", error);
                alert("some error occured")
            }
            finally{
                setLoader(false)
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