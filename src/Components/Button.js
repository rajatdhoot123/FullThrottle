import React from "react";
import styled from "styled-components";
const Button = ({ children = null, onClick, ...props }) => (
  <ButtonWrapper>
    <button onClick={onClick} {...props} className="btn primary">
      {children}
    </button>
  </ButtonWrapper>
);

const ButtonWrapper = styled.div`
  button:disabled,
  button[disabled] {
    background-color: grey;
    box-shadow: none;
    color: white;
    &:hover {
      background-color: grey;
      box-shadow: none;
    }
  }
  .btn {
    box-sizing: border-box;
    appearance: none;
    background-color: transparent;
    border: 2px solid #e74c3c;
    border-radius: 0.6em;
    color: #e74c3c;
    cursor: pointer;
    display: flex;
    align-self: center;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    margin: 20px;
    padding: 1.2em 2.8em;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    &:hover,
    &:focus {
      color: #fff;
      outline: 0;
    }
  }

  .primary {
    border-color: #3498db;
    color: #fff;
    box-shadow: 0 0 40px 40px #3498db inset, 0 0 0 0 #3498db;
    transition: all 150ms ease-in-out;

    &:hover {
      background-color: dimgray;
      box-shadow: 0 0 10px 0 #3498db inset, 0 0 10px 4px #3498db;
    }
  }
`;

export default Button;
