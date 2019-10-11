import React, { useState, useEffect } from "react";
import Range from "./Slider";
import styled from "styled-components";
import Select from "react-select";
import { calculateLoan } from "./api";
import Button from "./Button";
import Spinner from "./Spinners";
import { FlexDiv, MarginX } from "./CssComponets";
import DisplayInfo from "./Info";

const MonthDropDown = ({ month, onChange }) => {
  const Months = (min, max) => {
    let monthArray = [];
    for (let i = min; i < max; i++) {
      monthArray.push({ value: i, label: i });
    }
    return monthArray;
  };

  const handleChange = selectedMonth => {
    onChange(selectedMonth);
  };

  return (
    <SelectWrapper
      value={month}
      onChange={handleChange}
      options={Months(6, 24)}
    />
  );
};

const LoanAmount = ({ setState }) => {
  const [amount, setAmount] = useState(500);

  useEffect(() => {
    setState(prevState => ({ ...prevState, amount: String(amount) }));
  }, [amount]);

  const handleRangeChange = range => {
    setAmount(range);
  };

  const handleChange = e => {
    const amount = e.target.value;
    if (amount > 5000) {
      return null;
    }
    setAmount(amount);
  };
  return (
    <div>
      <div>Amount</div>
      <Input onChange={handleChange} value={amount} />
      {Number(amount) < 500 && (
        <div>{"Number should be greater or equal to 500"}</div>
      )}

      <Range
        value={amount}
        min={500}
        max={5000}
        onRangeChange={handleRangeChange}
      />
    </div>
  );
};

const LoanMonth = ({ setState }) => {
  const [month, setMonth] = useState({ value: 6, label: 6 });
  useEffect(() => {
    setState(prevState => ({ ...prevState, month: String(month.value) }));
  }, [month]);
  const handleRangeChange = range => {
    setMonth({ value: range, label: range });
  };
  const handleChange = month => {
    setMonth(month);
  };
  return (
    <div>
      <div>Month</div>
      <DropDownWrapper>
        <MonthDropDown onChange={handleChange} month={month} />
      </DropDownWrapper>
      <Range
        min={6}
        max={24}
        value={month.value}
        onRangeChange={handleRangeChange}
      />
    </div>
  );
};

const Monetary = () => {
  const [state, setState] = useState({
    amount: "",
    month: "",
    data: {}
  });

  useEffect(() => {
    setState(prevState => {
      const infoObj = {};
      Object.entries(localStorage).forEach(info => {
        infoObj[info[0]] = JSON.parse(info[1]);
      });
      return {
        ...prevState,
        data: infoObj
      };
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const getDetails = () => {
    if (state.data[`${state.month}-${state.amount}`]) {
      return;
    }
    setLoading(true);
    calculateLoan({ month: state.month, amount: state.amount })
      .then(({ data: { interestRate, monthlyPayment, principal } }) => {
        setLoading(false);
        localStorage.setItem(
          `${state.month}-${state.amount}`,
          JSON.stringify({
            interestRate,
            monthlyPayment,
            principal
          })
        );
        setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            [`${state.month}-${state.amount}`]: {
              interestRate,
              monthlyPayment,
              principal
            }
          }
        }));
      })
      .catch(err => setLoading(false));
  };

  const handleHistoryClick = info => {
    const value = info.split("-");
    setState(prevState => ({
      ...prevState,
      amount: value[1],
      month: value[0]
    }));
  };
  return (
    <FlexDiv>
      <WrapperDiv width="70%">
        <MarginTop>
          <FlexDiv>
            <MarginX unit="1rem">
              <LoanAmount setState={setState} />
            </MarginX>
            <MarginX unit="1rem">
              <LoanMonth setState={setState} />
            </MarginX>
          </FlexDiv>
          <FlexDiv>
            <Button
              disabled={
                Number(state.amount) < 500 || Number(state.amount) > 5000
              }
              onClick={getDetails}
            >
              Get Loan
            </Button>
          </FlexDiv>
          {loading && <Spinner />}

          {!!state.data[`${state.month}-${state.amount}`] && (
            <DisplayInfo info={state.data[`${state.month}-${state.amount}`]} />
          )}
        </MarginTop>
      </WrapperDiv>
      <WrapperDiv backgroundColor="aliceblue" width="30%">
        <HistoryWrapper>
          <div className="history-text">History</div>
          {Object.keys(state.data).map(info => (
            <div
              key={info}
              onClick={handleHistoryClick.bind(null, info)}
              className={`clickable history-text ${
                String(info.split("-")[0]) === String(state.month) &&
                String(info.split("-")[1]) === String(state.amount)
                  ? "blue-color"
                  : ""
              }`}
            >
              <div className="text-wrapper">
                <div>Month</div>
                <div>{info.split("-")[0]}</div>
              </div>
              <div className="text-wrapper">
                <div>Amount</div>
                <div>{info.split("-")[1]}</div>
              </div>
            </div>
          ))}
        </HistoryWrapper>
      </WrapperDiv>
    </FlexDiv>
  );
};

const HistoryWrapper = styled.div`
  .history-text {
    box-shadow: 0px 1px 0px #edeff1;
    padding: 0.5rem;
    height: 54px;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 6px;
  }

  .blue-color {
    background-color: cornflowerblue;
  }

  .clickable {
    cursor: pointer;
  }

  .text-wrapper {
    padding: 1rem;
  }
`;

const WrapperDiv = styled.div`
  background-color: ${props => props.backgroundColor || "initial"};
  width: ${props => props.width || "50%"};
  display: flex;
  justify-content: center;
}
`;

const Input = styled.input`
  padding: 13px 12px 13px 12px;
  height: 48px;
  background: #ffffff;
  border: 01px solid #cfcfcf;
  font-size: 18px;
  outline: none;
  box-sizing: border-box;
  border-radius: 6px;
  color: #1c1c1c;
`;

const DropDownWrapper = styled.div`
  width: 214px;
`;

const SelectWrapper = styled(Select)`
  height: 48px;
`;

const MarginTop = styled.div`
  margin-top: 10%;
`;

export default Monetary;
