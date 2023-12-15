import axios, { all } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import '../index.css'
import Card from 'react-bootstrap/Card'
// Fetch all Dishes on the frontend 
export const Home = () => {
    const [allDishes, setAllDishes] = useState([])
    const [someDishes, setSomeDishes] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [finalOrder, setFinalOrder] = useState([]);
    const [pages, setPages] = useState([]);
    const [allLen, setAllLen] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    const someLen = 6;


    // for (let i = 0; i < len ; i++) {

    // }

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
                const res2 = await axios.get("/someOrders");
                console.log(res.data);
                setAllDishes(res.data);
                setSomeDishes(res2.data);

                setAllLen(res.data.length)
                let numOfPages = Math.floor(res.data.length / someLen);
                console.log("num of pages : ", numOfPages)
                let pagesArr = [];
                for (let i = 0; i < numOfPages; i++) {
                    pagesArr.push(i + 1);
                }


                setPages(pagesArr)
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


    const fetchSomeData = async (offset) => {
        setPageNum(offset+1)
        try {
            const res = await axios.get(`/orders/6/${someLen * offset}`);
            setSomeDishes(res.data)
            console.log("Res : ", res.data);
        } catch (error) {
            console.log(error);
        }
        console.log(someLen * offset)
    }
    return (
        <div className='HomeCont'>
            <h3>Page : {pageNum}</h3>
            <div className='dishContainer'>
                {someDishes.map((el) => {
                    return (
    //                     <div key={el._id} className='dish'>
    //                         <h4><span>Dish : </span>{el.title}</h4>
    //                         {/* <h4>{el._id}</h4> */}
    //                         <img src={el.image}
    //     alt="Description of the image"
    //     style={{ width: '257px', height: '200px' }}
    //   />
    //                         <p><span>Description : </span>{el.description}</p>
    //                         <div className='Quantity'>



    //                         </div>
    //                         <button onClick={() => check(el._id)} className='butns'>Add</button>

    //                     </div>
                      <div key={el._id} className='dish'>
                           <Card style={{ width: '22rem',border:"none" }} className="hove mb-4">
                                <Card.Img variant="top" className='cd' src={el.image}  style={{ width: '257px', height: '200px' }}/>

                                <div className="card_body">
                                    <div className="upper_data d-flex justify-content-between align-items-center">
                                        <h4 className='mt-2'>{el.title}</h4>
                                        <p><span>Description : </span>{el.description}</p>
                                        <span>5&nbsp;★</span>
                                    </div>

                                    <div className="lower_data d-flex  justify-content-between">
                                    </div>


                                    <div className="extra"></div>

                                    <div className="last_data d-flex justify-content-between align-items-center">
                                        <p>1175 + order placed from here recently</p>
                                        <img src={"https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp"} className="laimg" alt="" />
                                        <div className='Quantity'>
                                            
                                        </div>
                                         <button onClick={() => check(el._id)} className='butns'>Add</button>
                                    </div>
                                </div>

                            </Card>

                        </div>
                    )
                })}

            </div>
            <div className='pagination-btns'>
                <h3>Pages </h3>
                {pages.map((el) => {
                    return <button key={el} onClick={() => fetchSomeData(el - 1)} >{el}</button>
                })}
            </div>
        </div>
    )
}
