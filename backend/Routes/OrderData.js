const express = require('express')
const router = express.Router();
const Order = require('../models/Orders');


router.post('/orderData', async (req, res) => {
  try {
    const { order_data, email, order_date } = req.body;
    console.log("📩 Received Order:", { email, order_date, order_data });

    const formattedData = order_data.map(item => ({
      ...item,
      order_date
    }));

    console.log("🧾 Formatted Order Data to Save:", formattedData);

    let existingOrder = await Order.findOne({ email });
    console.log("📦 Existing Order Found:", existingOrder ? "Yes" : "No");

    if (existingOrder) {
      existingOrder.order_data.push(...formattedData);
      await existingOrder.save();
      console.log("✅ Order appended to existing user");
    } else {
      await Order.create({
        email,
        order_data: formattedData
      });
      console.log("✅ New order created");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Error processing order:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});




router.post('/myorderData', async (req, res) => {
  try {
    const {email} = req.body;
    let myData=await Order.findOne({email});
    if(!myData){
      return res.status(400).json({success:false,error:'No orders found'});
    }
    res.json({orderData:myData.order_data});
  } catch (error) {
    console.error('Error fetching order data',error.message);
    res.status(500).json({ success:false,error: error.message});
  }
});

module.exports = router;