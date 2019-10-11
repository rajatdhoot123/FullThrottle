import React from "react";
import styled from "styled-components"
import { FlexDiv, MarginX } from "./CssComponets"


const DisplayInfo = ({
    info: { interestRate = null, principal = {}, monthlyPayment = {} }
  }) => {
    return (
      <InfoWrapper>
        Info
        <FlexDiv className="info-text-wrapper" justifyContent="space-between">
          <div>
            <strong>Intrest Rate</strong>
          </div>
          <div>{interestRate}</div>
        </FlexDiv>
        <FlexDiv className="info-text-wrapper" justifyContent="space-between">
          <div>
            <strong>Monthly Payment</strong>
          </div>
          <FlexDiv>
            <FlexDiv>
              {monthlyPayment.amount && (
                <>
                  <MarginX>Amount</MarginX>
                  <div>{monthlyPayment.amount}</div>
                </>
              )}
            </FlexDiv>
            <FlexDiv>
              {monthlyPayment.currency && (
                <>
                  <MarginX>Currency</MarginX>
                  <div>{monthlyPayment.currency}</div>
                </>
              )}
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
        <FlexDiv className="info-text-wrapper" justifyContent="space-between">
          <div>
            <strong>Principal</strong>
          </div>
          <FlexDiv>
            <FlexDiv>
              {principal.amount && (
                <>
                  <MarginX>Amount</MarginX> <div>{principal.amount}</div>
                </>
              )}
            </FlexDiv>
            <FlexDiv>
              {principal.currency && (
                <>
                  <MarginX>Currency</MarginX>
                  <div>{principal.currency}</div>
                </>
              )}
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
      </InfoWrapper>
    );
  };

  const InfoWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 1px solid grey;
  padding: 30px;
  border-radius: 6px;

  .info-text-wrapper {
    padding: 0.5rem;
  }
`;

  export default DisplayInfo;