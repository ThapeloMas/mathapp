import React from "react";
import styled from "styled-components";

const Switch = ({ onChange, checked }) => {
  return (
    <StyledWrapper>
      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            onChange(); 
          }}
        />
        <div className="slider">
          <span>On</span>
          <span>Off</span>
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`

  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 100px;
    height: 2em;
  }


  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    color: #000;
    font-weight: 600;
    border-radius: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "On";
    height: 90%;
    width: 48%;
    left: 2%;
    border-radius: 20px;
    background-color: white;
    color: green;
    display: grid;
    align-content: center;
    justify-content: center;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2),
      0 -1px 0 0 rgba(0, 0, 0, 0.1) inset,
      0 -1.31em 1.31em -1.31em rgba(0, 0, 0, 0.3) inset,
      0 0 1px 0 rgba(0, 0, 0, 0.1);
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15);
    transition: 0.4s;
  }

  .slider:after {
    content: "";
    position: absolute;
    top: -7px;
    left: -7px;
    right: -7px;
    bottom: -7px;
    border-radius: 1.71em;
    background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.06),
      rgba(0, 0, 0, 0.1)
    );
    z-index: -1;
  }

  .switch input:checked + .slider {
    background-color: #21f3a3;
    color: #fff;
  }

  .switch input:checked + .slider:before {
    content: "Off";
    transform: translateX(100%);
    color: red;
  }

  .switch input {
    display: none;
  }
`;

export default Switch;
