/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import { secondsToTime } from '../utils/SecondToTime';
import { Button } from './Button';
import { Timer } from './Timer';

const bellStart = require('../sounds/bell-start.mp3');
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

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
  cycles,
}: PomodoroProps): JSX.Element {
  const [mainTimer, setMainTimer] = useState(pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCycleQtdManager] = useState(cycles - 1);

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkinkTime, setFullWorkinkTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTimer(mainTimer - 1);
      if (working) setFullWorkinkTime(fullWorkinkTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTimer(pomodoroTime);
    audioStartWorking.play();
  }, [setTimeCounting, setWorking, setResting, setMainTimer, pomodoroTime]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTimer(longRestTime);
      } else {
        setMainTimer(shortRestTime);
      }

      audioStartWorking.play();
    },
    [
      setTimeCounting,
      setWorking,
      setResting,
      setMainTimer,
      longRestTime,
      shortRestTime,
    ],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTimer > 0) return;

    if (working && cyclesQtdManager > 0) {
      configureRest(false);
      setCycleQtdManager(cyclesQtdManager - 1);
    } else if (working && cyclesQtdManager <= 0) {
      configureRest(true);
      setCycleQtdManager(cycles);
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTimer,
    cyclesQtdManager,
    numberOfPomodoros,
    completedCycles,
    configureRest,
    setCycleQtdManager,
    configureWork,
    cycles,
  ]);

  return (
    <div className="pomodoro">
      <h2>Você está: {working ? 'Trabalhando' : 'Descansando'}</h2>
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
        <p>Ciclos concluídos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsToTime(fullWorkinkTime)}</p>
        <p>Pomodoros concluídos: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}
