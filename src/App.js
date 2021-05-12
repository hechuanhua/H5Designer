import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Drag from "./components/drag/Drag"
import Library from "./components/library/Library"
import { PageContext } from "./reducer/index"

const AppWrap = styled.div`
display:flex;
`

const App = () => {

  return (
    <AppWrap>
      <PageContext>
        <Library></Library>
        <Drag></Drag>
        <div className="setting">

        </div>
      </PageContext>
    </AppWrap>
  );
};

export default App;
