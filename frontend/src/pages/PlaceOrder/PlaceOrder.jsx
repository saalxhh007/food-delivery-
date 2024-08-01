import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    }
    if (getTotalCartAmount === 0) {
      navigate("/cart");
    }
  }, [token]);
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onchangeHandler}
            type="text"
            placeholder="First Name"
            value={data.firstName}
          />
          <input
            required
            name="lastName"
            onChange={onchangeHandler}
            type="text"
            placeholder="Last Name"
            value={data.lastName}
          />
        </div>
        <input
          name="email"
          onChange={onchangeHandler}
          type="email"
          placeholder="Email Adress"
          value={data.email}
        />
        <input
          name="street"
          onChange={onchangeHandler}
          type="text"
          placeholder="Street"
          value={data.street}
        />
        <div className="multi-fields">
          <input
            name="city"
            onChange={onchangeHandler}
            type="text"
            placeholder="City"
            value={data.city}
          />
          <input
            required
            name="state"
            onChange={onchangeHandler}
            type="text"
            placeholder="State"
            value={data.state}
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onchangeHandler}
            type="text"
            placeholder="Zip Code"
            value={data.zipcode}
          />
          <input
            required
            name="country"
            onChange={onchangeHandler}
            type="text"
            placeholder="Country"
            value={data.country}
          />
        </div>
        <input
          required
          name="phone"
          onChange={onchangeHandler}
          type="text"
          placeholder="Phone"
          value={data.phone}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2} $</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2} $
              </b>
            </div>
          </div>
          <button type="submit">CHECKOUT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
