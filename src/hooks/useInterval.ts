import { useEffect, useRef } from 'react';

export function useInterval<C extends CallableFunction>(
  callbak: C,
  delay: number | null,
): void {
  const savedCallback = useRef<C>();

  useEffect(() => {
    savedCallback.current = callbak;
  }, [callbak]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
