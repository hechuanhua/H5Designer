
import { useSelector, shallowEqual } from 'react-redux';

import { RootState } from 'typings/LayoutData';

const useEqualSelector: UseEqualSelector = selector => {
  return useSelector(selector, shallowEqual);
};

type UseEqualSelector = <T>(selector: (state: RootState) => T) => T;

export default useEqualSelector;