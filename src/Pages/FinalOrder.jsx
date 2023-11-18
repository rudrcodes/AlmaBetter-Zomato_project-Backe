import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const FinalOrder = () => {
    // Get the final made order here from the myOrders table with date so it shows which date is the order from 

    const convertDateMade = (dateMade) => {
        var date = dateMade.split(/[ 'T']/);
        // var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
        let newDate = date[0].split("-");
        let t = new Date(newDate[0], newDate[1], newDate[2])
        const finalDate = t.toString();
        console.log(finalDate)
        console.log(finalDate.length)
        const currDate = Date().toString();
        console.log("currDate : ", currDate)

        return finalDate.slice();
        // return d;
    }
    const [finalOrder, setFinalOrder] = useState([]);
    useEffect(() => {

        const fetchFinalOrder = async () => {
            try {
                const res = await axios.get("/finalOrder");
                const currDate = Date().slice(0, 11);
                const newArr = res.data.filter((el) => el.dateMade.slice(0, 11) == currDate);
                console.log("New Arr : ", newArr)
                console.log(res.data)
                setFinalOrder(newArr)
            } catch (error) {
                console.log(error)
            }
        }
        fetchFinalOrder();
    }, [])
    const navigate = useNavigate();

    const UpdateOrder = async (id) => {
        // There are multiple orders having same id , in that case store the dishes details in the localStorage to 
        navigate(`/updateOrder/${id}`)
        // Update the serving 
        // Update order ke loye naya route bnana hoga 
        // alert('Update Order')
        // try {
        //     const res = await axios.put("/updateOrder/" + id, newData)
        //     console.log("Order deleted : ", res)
        // } catch (error) {
        //     console.log("Error in deleting order : ", error)
        // }

        // window.location.reload();
    }
    const DeleteOrder = async (id) => {
        //Delete the order
        try {
            const res = await axios.delete("/deleteOrder/" + id)
            console.log("Order deleted : ", res)
        } catch (error) {
            console.log("Error in deleting order : ", error)
        }
        alert('Deleted the Order, please do refresh to see the changes.')

        // window.location.reload();
    }
    return (
        <div>

            <div>Active Order List 🍽️ : </div>
            Total Orders : {finalOrder.length}
            {finalOrder.length > 0 && finalOrder.map((dish) => {
                if (Date().toString().slice(0, 11) == dish.dateMade.slice(0, 11))
                    return <div key={dish._id + Math.random() * 1000} className='dish'>
                        <h4>{dish.title}</h4>
                        <p><span className='span-data'> Servings</span> : {dish.quantity}</p>
                        <p> <span className='span-data'> Date Ordered : </span> {dish.dateMade.slice(0, 11)}</p>
                        {Date().toString().slice(0, 11) !== dish.dateMade.slice(0, 11) && <div>Old Order</div>}
                        {Date().toString().slice(0, 11) == dish.dateMade.slice(0, 11) && <div><span className='span-data'> Status : </span>Active order 🍽️</div>}

                        <div className='finalOrderBtns'>
                            {Date().toString().slice(0, 11) == dish.dateMade.slice(0, 11) && <button onClick={() => UpdateOrder(dish._id)}>Update Order</button>}
                            {Date().toString().slice(0, 11) == dish.dateMade.slice(0, 11) && <button onClick={() => DeleteOrder(dish._id)}>Delete Order</button>}

                        </div>
                    </div>
            })

            }
        </div>
    )
}
