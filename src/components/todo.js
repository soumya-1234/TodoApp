import { cleanup } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import todo from '../images/todo.jpg';

const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }
    else {
        return [];
    }
}
const Todo=()=>{
    const [inputData,setInputData]= useState('');
    const [items,setItems]= useState(getLocalItems());
    const [toggleSubmit,setToggleSubmit]=useState(true);
    const [isEditItem,setIsEditItem]=useState(null);
    const addItem=()=>{
        let result=inputData.trim();
        if(!result){
            alert("please fill your data");
        }
        else if(inputData && !toggleSubmit){
            setItems(
                items.map((elem)=>{
                    if(elem.id === isEditItem){
                        return{...elem, name:inputData}
                    }
                    return elem;
                })
            )
            setToggleSubmit(true)
            setInputData('');
            setIsEditItem(null);
        }
        else{
            const allInputData={id:new Date().getTime().toString(),name:inputData}
            setItems([...items,allInputData]);
            setInputData('')
        }
    }
    const deleteItem=(index)=>{
        const updateditems=items.filter((elem)=>{
            return index !== elem.id;

        });
        
        setItems(updateditems);
    }
    const removeAll = () =>{
        setItems([]);
    }
    const editItem=(id)=>{
        let newEditItem=items.find((elem)=>{
            return elem.id===id
        });
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }
    useEffect(() => {
        localStorage.setItem('lists',JSON.stringify(items))
    },[items]);
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={todo} alt="todologo"/>
                        <figcaption>Add Your List Here</figcaption>
                    </figure>
                    <div className="addItem">
                        <input type="text" placeholder="Add Item"
                        value={inputData} 
                        onChange={(e)=>setInputData(e.target.value)}
                        />
                        {
                            toggleSubmit ?   <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>:
                            <i class="far fa-edit add-btn btn-danger" title="Update Item" onClick={addItem}></i>
                        }
                    </div>
                    <div className="showItems">
                        {
                            items.map((elem)=>{
                                return(
                                    <div className="eachItem" key={elem.id}>
                                        <h3>
                                         {elem.name}
                                        </h3>
                                        <i className="far fa-trash-alt add-btn" title="Delete Item" id="delete" onClick={()=>deleteItem(elem.id)}></i>
                                        <i class="far fa-edit add-btn" title="Edit Item"  onClick={()=>editItem(elem.id)}></i>
                                    </div> 
                                )
                            })
                        }
            
                    </div>
                    {
                       !items.length ? <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="No Data"><span>CHECK LIST</span></button>
                    </div> : <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>
                    } 
                </div>
            </div>
        </>
    )
}

export default Todo;