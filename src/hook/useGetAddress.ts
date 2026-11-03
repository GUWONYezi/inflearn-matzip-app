import axios from 'axios';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';
import {LatLng} from 'react-native-maps';

// 역 지오코딩으로 지도 위치를 사람이 읽을 수 있는 주소로 변환하기
function useGetAddress(location: LatLng) {
  const {latitude, longitude} = location;
  const [result, setResult] = useState('');

  useEffect(() => {
    (async () => {
      try {
        // 역 지오코딩 API 요청
        const {data} = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address&language=ko&key=${Config.GOOGLE_MAP_API_KEY}`,
        );

        // 결과
        const address = data.results.length
          ? data.results[0].formatted_address
          : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`; // 주소 결과가 없을 경우 지도 위치 출력

        setResult(address);
      } catch (error) {
        setResult('주소를 알 수 없습니다.');
      }
    })();
  }, [latitude, longitude]);

  return result;
}

export {useGetAddress};
