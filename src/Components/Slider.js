import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Range = ({onRangeChange, min = 0, max = 100, value}) => {
  const [range, setRange] = useState(value);

  useEffect(() => {
    onRangeChange(range)
  },[range])

  const updateRange = e => {
    const value = e.target.value;
    setRange(value);
  };
  return (
    <div>
      <RangeWrapper
        id="range"
        type="range"
        value={value}
        min={min}
        max={max}
        step="2"
        onChange={updateRange}
      />
    </div>
  );
};

const RangeWrapper = styled.input`
  -webkit-appearance: none;
  outline: none;
  background: lightblue;
  height: 6px;
  width: 200px;
  border-radius: 5px;
`;

export default Range;
