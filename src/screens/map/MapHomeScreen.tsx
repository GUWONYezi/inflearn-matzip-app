import CustomMarker from '@/components/common/CustomMarker';
import DrawerButton from '@/components/common/DrawerButton';
import MapIconButton from '@/components/map/MapIconButton';
import MarkerModal from '@/components/map/MarkerModal';
import {colors} from '@/constants/colors';
import {numbers} from '@/constants/numbers';
import useGetMarkers from '@/hook/queries/useGetMarkers';
import useModal from '@/hook/useModal';
import {useMoveMapView} from '@/hook/useMoveMapView';
import {usePermission} from '@/hook/usePermission';
import {useUserLocation} from '@/hook/useUserLocation';
import {MapStackParamList} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

type Navigation = StackNavigationProp<MapStackParamList>;

function MapHomeScreen() {
  //#region 기본값
  const navigation = useNavigation<Navigation>();
  const inset = useSafeAreaInsets();
  // 권한 체크
  usePermission('LOCATION');
  //#endregion

  //#region 사용자 변수
  // 사용자 현재 위치
  const {userLocation, isUserLoactionError} = useUserLocation();

  // 사용자가 지도에서 선택한 위치 정보
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();

  // 지도 이동 hook
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();

  // 마커 목록 조회 정보
  const {data: markers = []} = useGetMarkers();

  // 클릭한 마커ID
  const [markerId, setMarkerId] = useState<number>(0);

  // 마커 모달
  const markerModal = useModal();
  //#endregion

  //#region 이벤트 핸들러
  // 하단 좌표 이동 버튼 핸들러
  const handlePressUserLocation = () => {
    if (isUserLoactionError) {
      // 에러가 있을 경우: 위치 권한을 허용해주세요.
      Toast.show({
        type: 'error',
        text1: '위치 권한을 허용해주세요.',
        position: 'bottom',
      });
      return;
    }

    moveMapView(userLocation);
  };

  // 추가 버튼 클릭 이벤트 핸들러
  const handlePressAddPost = () => {
    if (!selectLocation) {
      Alert.alert(
        '추가할 위치를 선택해주세요',
        '지도를 길게 누르면 위치가 선택됩니다.',
      );
      return;
    }

    navigation.navigate('AddLocation', {location: selectLocation});

    setSelectLocation(null);
  };

  // 마커 클릭 이벤트
  const handlePressMarker = (coordinate: LatLng, id: number) => {
    moveMapView(coordinate);
    setMarkerId(id);
    markerModal.show();
  };
  //#endregion

  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, {top: inset.top + 10}]}
        color={colors.WHITE}
      />
      <MapView
        googleMapId={Config.GOOGLE_MAP_ID}
        ref={mapRef}
        style={styles.container}
        region={{
          ...userLocation,
          // Delta : 지도의 확대 정도
          ...numbers.INITIAL_DELTA,
        }}
        provider={PROVIDER_GOOGLE}
        onRegionChangeComplete={
          //마지막 확대 정도가 변경됨
          handleChangeDelta
        }
        onLongPress={({nativeEvent}) =>
          // 꾹 누를 경우, 선택 장소에 마커 표시
          setSelectLocation(nativeEvent.coordinate)
        }>
        {markers.map(({id, color, score, ...coordinate}) => (
          <CustomMarker
            key={id}
            color={color}
            score={score}
            coordinate={coordinate}
            onPress={() => handlePressMarker(coordinate, id)}
          />
        ))}
        {selectLocation && <Marker coordinate={selectLocation} />}
      </MapView>
      <View style={styles.buttonList}>
        <MapIconButton name="plus" onPress={handlePressAddPost} />
        <MapIconButton
          name="location-crosshairs"
          onPress={handlePressUserLocation}
        />
      </View>

      <MarkerModal
        markerId={markerId}
        isVisible={markerModal.isVisible}
        hide={markerModal.hide}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1,
  },
});

export default MapHomeScreen;
