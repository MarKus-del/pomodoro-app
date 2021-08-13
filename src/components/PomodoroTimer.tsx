import React from 'react';
import { useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import { Button } from './Button';
import { Timer } from './Timer';

type PomodoroProps = {
  defaultPomodoroTimer: number;
};

export function PomodoroTimer({
  defaultPomodoroTimer,
}: PomodoroProps): JSX.Element {
  const [mainTimer, setMainTimer] = useState(defaultPomodoroTimer);

  useInterval(() => {
    setMainTimer(mainTimer - 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTimer={mainTimer} />
      <Button text="teste" onClick={() => console.log(1)} />
    </div>
  );
}
