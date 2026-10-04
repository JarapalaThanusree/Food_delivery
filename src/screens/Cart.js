import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer.js'
import { post } from '../api'
import DeleteIcon from "@mui/icons-material/Delete";
import "../screens/Cart.css";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="container mt-3">
        <h3 className="text-center fs-3 fst-italic">Your Cart</h3>
        <hr />
        <div className="m-5 w-10 text-center fs-5 fst-italic">
          Oops!! Cart is Empty
        </div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    try {
      let userEmail = localStorage.getItem("userEmail");
      let response = await post("/orderData", {
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log("Order placed successfully: ", responseData);
        dispatch({ type: "DROP" })
      }
      else {
        console.error("Failed to place order: ", response.statusText);
      }
    } catch (error) {
      console.error("Error placing order: ", error.message)
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price * food.qty, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>S.no</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price * food.qty}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
        <div ><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='checkout-button' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
}
