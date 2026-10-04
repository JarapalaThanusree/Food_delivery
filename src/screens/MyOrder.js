import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { post } from '../api'

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const response = await post("/myorderData", { email: localStorage.getItem('userEmail') });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("Fetched order data: ", data);
      setOrderData(data.orderData);
    } catch (error) {
      console.error("Error fetching order data: ", error);
    }
  };

  useEffect(() => {
    fetchMyOrder()
  }, [])

  return (
    <div>
      <Navbar />

      <div className='container'>
        <div className='row'>
          {orderData.length > 0 ? [...orderData].reverse().map((item, index) => (
            <div key={index} className='col-12 col-md-6 col-lg-3'>
              <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <div className='container w-100 p-0' style={{ height: "38px" }}>
                    <span className='m-1'>{item.qty}</span>
                    <span className='m-1'>{item.size}</span>
                    <span className='m-1'>{item.order_date}</span>
                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                      ₹{item.price * item.qty}/-
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )) : <div>No orders found.</div>}
        </div>
      </div>

      <Footer />
    </div>
  );
}
