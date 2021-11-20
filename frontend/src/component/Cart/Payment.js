import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import "./Payment.css";
import { createOrder, clearErrors } from "../../actions/orderAction"
import { flushCart } from "../../actions/cartAction";

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert()

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    user: user.id,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const method1 = () => {
      order.paymentInfo = {
          status: "esewa-pending"
      }
       //add "paid at" after verification
      history.push("/payment/online")
  }
  const method2 = () => {
    try{order.paymentInfo = {
        status: "cod-pending"
    }
    //paid at has to be changed accordingly
  
    dispatch(createOrder(order))  
    dispatch(flushCart())    
    history.push("/success")
  }catch(error){
    alert.error("There's some issues while processing the order")
    }   
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />     
    <div className="main">
      <h2> Choose Your Method of Payment</h2>
    </div>
    <CheckoutSteps activeStep={2} />
	<div class="container">
	   <div class="column">
	     <img src="https://www.nepalitimes.com/wp-content/uploads/2021/07/Esewa-Remittance-Payment.png" alt="image1" onClick={method1} />
	   </div>
	   <div class="column">
	     <img src="https://thumbs.dreamstime.com/b/cash-delivery-rubber-stamp-grunge-design-dust-scratches-effects-can-be-easily-removed-clean-crisp-look-color-82598247.jpg" alt="image1" onClick={method2}/>
	   </div>
	</div>
    </Fragment>
  );
};

export default Payment;