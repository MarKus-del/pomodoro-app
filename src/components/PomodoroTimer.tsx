import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import { Button } from './Button';
import { Timer } from './Timer';

type PomodoroProps = {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
};

export function PomodoroTimer({ pomodoroTime }: PomodoroProps): JSX.Element {
  const [mainTimer, setMainTimer] = useState(pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
  }, [working]);

  useInterval(
    () => {
      setMainTimer(mainTimer - 1);
    },
    timeCounting ? 1000 : null,
  );

  const configWork = () => {
    setTimeCounting(true);
    setWorking(true);
  };

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTimer={mainTimer} />

      <div className="controls">
        <Button text="Work" onClick={configWork} />
        <Button
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
        />
      </div>

      <div className="details">
        <p>asf</p>
      </div>
    </div>
  );
}
