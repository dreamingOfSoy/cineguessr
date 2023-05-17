import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  useRef,
} from 'react';
import GameContext from './game-context';

export type ContextDefaults = {
  input: string;
  handleSetInput: Function;
  setSubmit: Function;
  submit: boolean;
};

const contextDefaults = {
  input: '',
  handleSetInput: (key: string) => {},
  setSubmit: () => {},
  submit: false,
};

const InputContext = React.createContext<ContextDefaults>(contextDefaults);

type Props = {
  children: React.ReactNode;
};

export const InputContextProvider = ({ children }: Props) => {
  const [input, setInput] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(false);
  const inputStateRef = useRef<string>('');

  // When the handleSetInput callback is called from another function
  // we cannot access the state from this context from the callback,
  // so to get around this we can save the state in a ref which will
  // update each time the state updates, and this will give us access
  // instead.
  inputStateRef.current = input;

  const gameContext = useContext(GameContext);
  const { handleSetGuess } = gameContext;

  const handleSetInput = (key: string) => {
    if (key === 'Backspace') {
      return setInput(prevState => prevState.slice(0, -1));
    }

    if (key === 'Spacebar') {
      return setInput(prevState => (prevState += ' '));
    }

    if (key === 'Enter') {
      handleSetGuess(inputStateRef.current);
      setInput('');
      return setSubmit(true);
    }

    setInput(prevState => (prevState += key));
  };

  const contextValue = {
    input,
    handleSetInput,
    setSubmit,
    submit,
  };

  return (
    <InputContext.Provider value={contextValue}>
      {children}
    </InputContext.Provider>
  );
};

export default InputContext;
