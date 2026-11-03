import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import useAppState from './useAppState';

function useUserLocation() {
  // 사용자 위치
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });

  // 사용자가 백그라운드에서 돌아왔을 때, 다시 위치를 불러오기 위해 사용
  const {isComeback} = useAppState();

  // 위치 찾기 에러 여부
  const [isUserLoactionError, setIsUserLoactionError] = useState<boolean>();

  // 현재 사용자 위치 가져오기
  useEffect(() => {
    if (!isComeback) {
      return;
    }

    Geolocation.getCurrentPosition(
      info => {
        setUserLocation(info.coords);
        setIsUserLoactionError(false);
      },
      () => {
        //에러일 경우
        setIsUserLoactionError(true);
      },
      {
        enableHighAccuracy: true, // 높은 정확도 설정
      },
    );
  }, [isComeback]);

  return {userLocation, isUserLoactionError};
}

export {useUserLocation};
