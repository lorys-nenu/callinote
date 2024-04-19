import { useState, useEffect } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardWillShow = (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
    };

    const keyboardWillHide = () => {
      setKeyboardHeight(0);
    };

    const keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      keyboardWillShow
    );
    const keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      keyboardWillHide
    );

    return () => {
      keyboardWillHideSub.remove();
      keyboardWillShowSub.remove();
    };
  }, []);

  return keyboardHeight;
};
