import axios from 'axios';
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const UpdateOrder = () => {

  const location = useLocation();
  const [id, setId] = useState(null)
  const [newServing, setNewServing] = useState(0)
  const [orderToUpdate, setOrderToUpdate] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const id = location.pathname.split("/")[2];
    setId(id)
    const fetchFinalOrder = async () => {
      try {
        const res = await axios.get("/finalOrder");
        const order = res.data.filter((el) => el._id == id);
        console.log(order[0])
        setOrderToUpdate(order[0])
      } catch (error) {
        console.log(error)
      }
    }
    fetchFinalOrder();
  }, [])


  const updateServing = async () => {
    if (newServing > 0) {
      try {
        const res = await axios.put(`/updateOrder/${id}`, { newServing });
        alert("Updated the order")
        navigate("/finalOrder");
        console.log(res);
      } catch (error) {
        console.log("Error in updating : ", error)
      }
      console.log("newServing : ", newServing)
    }
    else return alert("Check again")
  }
  console.log(id)
  return (
    <div>
      <h2>Your order which is going to get updated : </h2>
      <div className='prevOrder'>
        <h4><span>Name :</span>  {orderToUpdate.title}</h4>
        <h4><span>Current Serving : </span>{orderToUpdate.quantity}</h4>
      </div>
      <div>Update your Order : </div>
      <input placeholder='update the servings' value={newServing} onChange={(e) => setNewServing(e.target.value)} type='number' />
      <button onClick={updateServing}>Update Serving</button>
    </div>
  )
}
