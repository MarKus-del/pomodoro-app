import React from 'react';
import { secondsToMinutes } from '../utils/SecondsToMinutes';

type TimerProps = {
  mainTimer: number;
};

export function Timer({ mainTimer }: TimerProps): JSX.Element {
  return <div className="timer">{secondsToMinutes(mainTimer)}</div>;
}
