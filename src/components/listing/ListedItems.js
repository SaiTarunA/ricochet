import React from "react";
import { Button } from "./Button";
import { AddButton, SubtractButton } from "./AddSubtractButton";
import { P } from "./P";
import { lightGray } from "./GlobalStyles";
import styled from "styled-components";
import { trimTitle } from "../helpers/TextHelper";

export const ListedItems = ({
  items,
  increaseCount,
  decreaseCount,
  addToCart,
}) => (
  <Wrapper>
    {items.map((item, i) => (
      <Column key={item.name}>
        <H4>{trimTitle(item.name)}</H4>
        <P>₹{item.price}</P>

        {!item.inCart && (
          <COUNTER_DIV>
            <AddButton onClick={() => increaseCount(i)} />
            <SPAN>{item.quantity}</SPAN>
            <SubtractButton onClick={() => decreaseCount(i)} />
          </COUNTER_DIV>
        )}

        <IMG src={item.src} alt={item.name} />
        {!item.inCart && (
          <Button onClick={() => addToCart(i)}>Add to Cart</Button>
        )}
        {item.inCart && <P>Added!</P>}
      </Column>
    ))}
  </Wrapper>
);
const Column = styled.article`
  display: flex;
  flex-flow: column;
  align-items: center;
  border: 0.5px solid #999999;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  padding: 12px 20px;
  border-radius: 10px;
  margin: 8px;
`;
const Wrapper = styled.div`
  max-width: 1100px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
`;
const IMG = styled.img`
  padding: 10px;
  width: 150px;
  height: 150px;
  object-fit: cover;
`;
const H4 = styled.h4`
  padding: 5px 0;
  font-size: 18px;
`;

const SPAN = styled.span`
  margin: auto 0;
`;

const COUNTER_DIV = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;
