import './App.css'
import { Routes, Route, Link } from "react-router-dom"
import { Home } from './Pages/Home'
import { UpdateOrder } from './Pages/UpdateOrder'
import { AddDish } from './Pages/AddDish'
import { FinalOrder } from './Pages/FinalOrder'
function App() {

  return (
    <>
      <h1>🥟Order something for yourself dawg 😋</h1>
      <button className='home-btn'>
        <Link to="/">
          Home
        </Link>
      </button>
      <button className='home-btn'>
        <Link to="/finalOrder">
          Final Order List
        </Link>
      </button>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/createOrder' element={<div>createOrder</div>} /> */}
        <Route path='/addDish/:id' element={<AddDish />} />
        <Route path='/updateOrder/:id' element={<UpdateOrder />} />
        <Route path='/finalOrder' element={<FinalOrder />} />
      </Routes>

    </>
  )
}

export default App
