import styled from 'styled-components';

export const CaptchaWrapper = styled.div`
.rnc {
  display: flex;
  flex-direction: column;
  width: 99%;
  max-width: 255px;
  background-color: transparent !important;
  border-radius: 6px;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px #ecf1f5;
  margin-bottom: 15px;
}

.rnc-row {
  display: flex;
  align-items: stretch;
  margin: 0 0 10px 0;
}

.rnc-column-button {
  display: flex;

  background-color: rgb(255, 255, 255);

  flex-direction: column;
  justify-content: space-between;
  margin: 0 0 0 10px;
}

.rnc-canvas {
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  padding-left: 10px;
}

.rnc-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 16px;
  background: transparent !important;
  color: inherit;
  border: none;
  padding: 0;
  width: 25px;
  height: 20px;
  box-sizing: border-box;
  border-radius: 4px;
}

.rnc-button svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
}

.rnc-input {
  border: none;
  padding: 10px 6px !important;
  font-size: inherit;
  font-family: inherit;
  border-style: solid !important;
  border-width: 1px !important;
  overflow: hidden;
  min-width: 0%;
  border-radius: 6px;
  border-color: rgba(0, 0, 0, 0.23) !important;
}
`