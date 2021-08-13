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

export function PomodoroTimer({
  pomodoroTime,
  shortRestTime,
  longRestTime,
}: PomodoroProps): JSX.Element {
  const [mainTimer, setMainTimer] = useState(pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working]);

  useInterval(
    () => {
      setMainTimer(mainTimer - 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTimer(pomodoroTime);
  };

  const configureRest = (long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);

    if (long) {
      setMainTimer(longRestTime);
    } else {
      setMainTimer(shortRestTime);
    }
  };

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTimer={mainTimer} />

      <div className="controls">
        <Button text="Work" onClick={configureWork} />
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
        />
        <Button text="Rest" onClick={() => configureRest(false)} />
      </div>

      <div className="details">
        <p>asf</p>
      </div>
    </div>
  );
}
