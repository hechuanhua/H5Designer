import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { LayoutConfig } from '../../typings/LayoutData'

const TimerBox = styled.div`
`;

const Timer = (props: { config: LayoutConfig }) => {
  const { initValue } = props.config
  const [time, setTime] = useState(initValue as number)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((n) => {
        const newTime = Number(n) + 1
        return newTime
      })
    }, 1000)
    return () => { clearInterval(timer) }
  }, [])
  return (
    <TimerBox>
      {time}
    </TimerBox>
  );
};


export default Timer
