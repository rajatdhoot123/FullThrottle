import React from "react";
import styled from "styled-components";

const Spinner = () => (
  <SpinnerWrapper>
    <div className="loader"></div>

  </SpinnerWrapper>
);

const SpinnerWrapper = styled.div`
.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default Spinner;
