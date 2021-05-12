import "./App.scss";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Drag from "./components/drag/Drag"
import Library from "./components/library/Library"
import {Color} from "./reducer/index"

const Appwrap = styled.div`
display:flex;
`

const App = () => {
 
  return (
    <Appwrap>
      <Color>
        <Library></Library>
        <Drag></Drag>
        <div className="setting">

        </div>
      </Color>
    </Appwrap>
  );
};

export default App;
