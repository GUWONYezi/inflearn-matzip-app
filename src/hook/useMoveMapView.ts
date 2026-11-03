import {numbers} from '@/constants/numbers';
import {useRef, useState} from 'react';
import MapView, {Region, LatLng} from 'react-native-maps';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

// 지도 이동 hook
function useMoveMapView() {
  const mapRef = useRef<MapView | null>(null);

  // 마지막 확대 정도
  const [regionDelta, setRegionDelta] = useState<Delta>(numbers.INITIAL_DELTA);

  // 좌표 이동 메서드
  const moveMapView = (coordinate: LatLng, delta?: Delta) => {
    mapRef.current?.animateToRegion({
      ...coordinate, // 좌표 정보
      // Delta : 지도의 확대 정도
      ...(delta ?? regionDelta),
    });
  };

  //마지막 확대 정도가 변경 이벤트
  const handleChangeDelta = (region: Region) => {
    const {latitudeDelta, longitudeDelta} = region;

    setRegionDelta({latitudeDelta, longitudeDelta});
  };

  return {mapRef, moveMapView, handleChangeDelta};
}

export {useMoveMapView};
