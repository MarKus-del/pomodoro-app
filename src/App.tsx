import React from 'react';
import { PomodoroTimer } from './components/PomodoroTimer';

function App(): JSX.Element {
  return (
    <div>
      <PomodoroTimer defaultPomodoroTimer={3660} />
    </div>
  );
}

export default App;
