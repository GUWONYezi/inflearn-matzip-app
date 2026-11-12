import {useState} from 'react';

function useModal() {
  // 모달 show 여부
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // 모달 show/hide 함수
  const hide = () => {
    setIsVisible(false);
  };
  const show = () => {
    setIsVisible(true);
  };

  return {isVisible, show, hide};
}

export default useModal;
