import React from "react";
import styled from "styled-components";
import { numberFormat } from "./numberFormat";
import { Button } from "./Button";
import { P } from "./P";
import { Arrow } from "./Arrow";
import { VerticalBar } from "./VerticalBar";
import { CartButtons } from "./CartButtons";
import { useNavigate } from "react-router-dom";
import { SUCCESS_PAYMENT_LINK } from "../constants/Global";
import LoadingGif from "../../assets/loading.gif";
import { setGlobalState, useGlobalState } from "../state";

export const CartInfo = ({ cart, increaseQ, decreaseQ, removeFromCart }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setGlobalState("isLoading", true);
    setTimeout(() => {
      setGlobalState("isLoading", false);
      navigate(SUCCESS_PAYMENT_LINK);
    }, 2000);
  };
  return (
    <>
      {cart.map((item, i) => (
        <DetailColumn key={item.name}>
          <P>
            {item.name} <VerticalBar /> {item.quantity} x ₹{item.price}{" "}
            <Arrow /> ₹{numberFormat(item.price * item.quantity)}
          </P>

          <CartButtons
            increaseQ={() => increaseQ(i)}
            decreaseQ={() => decreaseQ(i)}
            removeFromCart={() => removeFromCart(i)}
          />
        </DetailColumn>
      ))}
      <CheckoutButton onClick={() => handleClick()}>Checkout</CheckoutButton>
    </>
  );
};
const DetailColumn = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 5px 0;
  width: 95%;
  border-bottom: 1px solid black;
`;

const CheckoutButton = styled(Button).attrs(() => ({
  backgroundColor: "#795EFF",
}))`
  margin-top: 15px;
  margin-bottom: 15px;
`;
