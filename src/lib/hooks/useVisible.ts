import { useState } from 'react';

interface Handle {
  show: () => void;
  hide: () => void;
  set: (value: boolean) => void;
}

const useVisible = (defaultValue = false): [boolean, Handle] => {
  const [visible, setVisible] = useState(defaultValue);

  const handle: Handle = {
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    },
    set: (value: boolean) => {
      setVisible(value);
    },
  };

  return [visible, handle];
};



export default useVisible;
