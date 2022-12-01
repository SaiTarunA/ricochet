import React from "react";
import styled from "styled-components";
import { Button } from "./Button";

import { AddButton, SubtractButton } from "./AddSubtractButton";

export const CartButtons = ({ increaseQ, decreaseQ, removeFromCart }) => (
  <DIV>
    <AddButton onClick={increaseQ} />
    <SubtractButton onClick={decreaseQ} />
    <RemoveButton onClick={removeFromCart}>Remove</RemoveButton>
  </DIV>
);
const RemoveButton = styled(Button)`
  padding: 5px 10px;
  background-color: #57c1ff;
`;

const DIV = styled.div`
  display: flex;
`;
