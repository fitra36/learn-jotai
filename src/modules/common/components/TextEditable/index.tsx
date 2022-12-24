import clsx from 'clsx';
import type { FC } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import useKeyPress from '@/hooks/useKeyPress';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { measureWidthText } from '@/utils';

import styles from './index.module.scss';

type TProps = {
  text: string;
  onSetText: (text: string, cancelSetText: () => void) => void;
};

const TextEditable: FC<TProps> = ({ text, onSetText }) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);
  const [inputWidth, setInputWidth] = useState<string | number>('100%');

  // sync text and input value
  useEffect(() => {
    setInputValue(text);
  }, [text]);

  const wrapperRef = useRef(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const enter = useKeyPress('Enter');
  const esc = useKeyPress('Escape');

  const handleMeasureInputWidth = (textInput: string) => {
    const inputText = textInput;
    const textWidth = measureWidthText(textRef, inputText);

    setInputWidth(textWidth);
  };

  // prevent delay update width
  useEffect(() => {
    handleMeasureInputWidth(text);
  }, [isInputActive]);

  const handleOnInput = useCallback(
    (e: any) => {
      const inputText = e.currentTarget.value;

      handleMeasureInputWidth(inputText);
    },
    [handleMeasureInputWidth]
  );

  // for cancel the text input changes
  const cancelSetText = useCallback(() => {
    setInputValue(text);
  }, [setInputValue, text]);

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      onSetText(inputValue, cancelSetText);
      setIsInputActive(false);
      setInputValue(text);
    }
  });

  const onEnter = useCallback(() => {
    if (enter) {
      const textValue = inputValue.trim();

      if (!textValue) {
        setInputValue(text);
      }

      onSetText(inputValue, cancelSetText);
      setIsInputActive(false);
    }
  }, [enter, inputValue, onSetText, cancelSetText]);

  const onEsc = useCallback(() => {
    if (esc) {
      setInputValue(text);
      setIsInputActive(false);
    }
  }, [esc, text]);

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and close the editor
      onEnter();
      // if Escape is pressed, revert the text and close the editor
      onEsc();
    }
  }, [onEnter, onEsc, isInputActive]); // watch the Enter and Escape key presses

  const handleInputChange = useCallback(
    (event: any) => {
      const { value } = event.target;
      // sanitize the input a little
      setInputValue(value);
    },
    [setInputValue]
  );

  const handleSpanClick = useCallback(() => {
    setIsInputActive(true);
  }, [setIsInputActive]);

  return (
    <span className="inline-flex items-center" ref={wrapperRef}>
      <div
        className={clsx({ hidden: isInputActive }, 'relative inline w-full')}
      >
        <span
          ref={textRef}
          onClick={handleSpanClick}
          className={clsx({
            [styles.text_editable_copy__active as string]: !isInputActive,
            [styles.text_editable_copy__hidden as string]: isInputActive,
          })}
        >
          {text}
        </span>
      </div>
      <input
        ref={inputRef}
        style={{ width: inputWidth }}
        value={inputValue}
        onChange={handleInputChange}
        onInput={handleOnInput}
        className={clsx(styles.text_editable_input, {
          [styles.text_editable_input__active as string]: isInputActive,
          [styles.text_editable_input__hidden as string]: !isInputActive,
        })}
      />
    </span>
  );
};

export default TextEditable;
