import React from 'react';
import { PomodoroTimer } from './components/PomodoroTimer';

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTime={30}
        shortRestTime={15}
        longRestTime={30}
        cycles={4}
      />
    </div>
  );
}

export default App;
