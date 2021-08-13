import React from 'react';

type ButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
};

export function Button({ text, onClick, className }: ButtonProps): JSX.Element {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
}
