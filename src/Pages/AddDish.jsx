import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const AddDish = () => {
    const location = useLocation();
    const [dish, setDish] = useState({})
    const id = location.pathname.split("/")[2];
    const [quantity, setQuantity] = useState(0)
    const currDate = Date().toString();

    const handleAdd = async (title) => {
        if (quantity <= 0) return alert("Atleast 1 serving should be there")
        try {
            const res = await axios.post("/addDish", {
                id: id,
                title: title,
                quantity: quantity,
                currDate
            })
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        alert("Dish Added")
    }

    useEffect(() => {
        console.log("fetching single order")
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`/SingleOrder/${id}`);
                console.log(res.data[0]);
                setDish(res.data[0]);
            } catch (error) {
                console.log("Error in single orders in AddDish PAGE : ", error)
            }
        }
        fetchOrders();

    }, [])
    return (
        <div>
            {dish.title != undefined &&
                <div key={dish._id} className='dish'>
                    <h4>{dish.title}</h4>
                    <p>{dish.description}</p>
                    <div className='Quantity'>

                        <p>Quantity : {quantity}</p>
                        <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                        <button onClick={() => {

                            if (quantity == 0) {
                                return alert("Inappropriate Quantity")
                            }
                            setQuantity((prev) => prev - 1)
                        }}>-</button>
                        {/* <button>-</button> */}

                    </div>
                    <button onClick={() => handleAdd(dish.title)}>Add</button>

                </div>
            }
        </div >
    )
}
