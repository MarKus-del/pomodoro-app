import React from 'react';
import { secondsToTime } from '../utils/SecondsToTimer';

type TimerProps = {
  mainTimer: number;
};

export function Timer({ mainTimer }: TimerProps): JSX.Element {
  return <div className="timer">{secondsToTime(mainTimer)}</div>;
}
