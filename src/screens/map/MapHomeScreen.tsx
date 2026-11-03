import DrawerButton from '@/components/DrawerButton';
import {colors} from '@/constants/colors';
import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useUserLocation} from '@/hook/useUserLocation';
import {numbers} from '@/constants/numbers';
import {usePermission} from '@/hook/usePermission';
import Toast from 'react-native-toast-message';
import CustomMarker from '@/components/CustomMarker';
import Config from 'react-native-config';
import {useMoveMapView} from '@/hook/useMoveMapView';
import MapIconButton from '@/components/MapIconButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '@/types/navigation';

type Navigation = StackNavigationProp<MapStackParamList>;

function MapHomeScreen() {
  const navigation = useNavigation<Navigation>();

  const inset = useSafeAreaInsets();

  // 권한 체크
  usePermission('LOCATION');

  // 사용자 현재 위치
  const {userLocation, isUserLoactionError} = useUserLocation();

  // 사용자가 지도에서 선택한 위치 정보
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();

  // 지도 이동 hook
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();

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
  };

  // 마커 클릭 이벤트
  const handlePressMarker = (coordinate: LatLng) => {
    moveMapView(coordinate);
  };

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
        {[
          {
            id: 1,
            color: colors.PINK_400,
            score: 3,
            coordinate: {
              latitude: 37.5516032365118,
              longitude: 126.98989626020192,
            },
          },
          {
            id: 2,
            color: colors.YELLOW_400,
            score: 5,
            coordinate: {
              latitude: 37.5416032365118,
              longitude: 126.97989626020192,
            },
          },
        ].map(marker => (
          <CustomMarker
            key={marker.id}
            color={marker.color}
            score={marker.score}
            coordinate={marker.coordinate}
            onPress={() => handlePressMarker(marker.coordinate)}
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
