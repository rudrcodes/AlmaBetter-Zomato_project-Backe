import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Fetch all Dishes on the frontend 
export const Home = () => {
    const [allDishes, setAllDishes] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [finalOrder, setFinalOrder] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        //* Fetch the final order list as well to check if we order the same thong again then we'll tell them that it's already there
        const fetchFinalOrder = async () => {
            try {
                const res = await axios.get("/finalOrder");
                console.log("Final order List : ", res.data)
                const currDate = Date().slice(0, 11);
                console.log(currDate);
                const newArr = res.data.filter((el) => el.dateMade.slice(0, 11) == currDate);
                console.log("New Arr : ", newArr)
                setFinalOrder(newArr)
            } catch (error) {
                console.log(error)
            }
        }
        fetchFinalOrder();


        console.log("fetching")
        const fetchOrders = async () => {
            try {
                const res = await axios.get("/allOrders");
                console.log(res.data);
                setAllDishes(res.data);
            } catch (error) {
                console.log("Error in fetchin all orders in HOME PAGE : ", error)
            }
        }
        fetchOrders();

    }, [])

    const check = (id) => {
        //After clicking on add btn we will check if the dish is already present in the finalOrder list or not
        //If the dish will be there we will tell them to just update the servings of the dish instead of ordering new one
        console.log(finalOrder)

        const exits = finalOrder.filter((el) => el._id == id);
        console.log(exits)
        if (exits.length > 0) {
            return alert("The dish is already present in your finalOrder list , do make updations there only instead of ordering a new one")
        }


        navigate(`/addDish/${id}`)
    }
    return (
        <div className='dishContainer'>
            {allDishes.map((el) => {
                return (
                    <div key={el._id} className='dish'>
                        <h4><span>Dish : </span>{el.title}</h4>
                        {/* <h4>{el._id}</h4> */}
                        <p><span>Description : </span>{el.description}</p>
                        <div className='Quantity'>



                        </div>
                        <button onClick={() => check(el._id)}>Add</button>

                    </div>
                )
            })}
        </div>
    )
}
