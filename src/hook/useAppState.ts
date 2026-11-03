import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

function useAppState() {
  const appState = useRef(AppState.currentState);
  const [isComeback, setIsComeback] = useState(false);

  useEffect(() => {
    const subScription = AppState.addEventListener('change', nextAppState => {
      // 현재 실행중인 앱의 상태 변화를 감지하여 콜백함수 실행
      if (
        appState.current?.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // 현재 상태가 백그라운드 였다가 다음상태가 활성화 상태일 경우 (백그라운드에서 돌아옴)
        setIsComeback(true);
      }

      if (appState.current?.match(/active/) && nextAppState === 'background') {
        // 현재 상태가 활성화 였다가 다음상태가 백그라운드 상태일 경우 (백그라운드 상태로 진입)
        setIsComeback(false);
      }

      // 현재 상태 변경
      appState.current = nextAppState;
    });

    return () => {
      subScription.remove();
    };
  }, []);

  return {isComeback};
}

export default useAppState;
