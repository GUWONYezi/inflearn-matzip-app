import DrawerButton from '@/components/DrawerButton';
import {colors} from '@/constants/colors';
import React, {useRef} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import MapView, {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {useUserLocation} from '@/hook/useUserLocation';
import {numbers} from '@/constants/numbers';
import {usePermission} from '@/hook/usePermission';
import Toast from 'react-native-toast-message';
import Config from 'react-native-config';

function MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const mapRef = useRef<MapView | null>(null);

  // 권한 체크
  usePermission('LOCATION');

  // 사용자 현재 위치
  const {userLocation, isUserLoactionError} = useUserLocation();

  // 좌표 이동 메서드
  const moveMapView = (coordinate: LatLng) => {
    mapRef.current?.animateToRegion({
      ...coordinate, // 좌표 정보
      // Delta : 지도의 확대 정도
      ...numbers.INITIAL_DELTA,
    });
  };

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

  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, {top: inset.top + 10}]}
        color={colors.WHITE}
      />
      <MapView
        googleMapId="eb0fcfac2758f3a9ae8f66dd"
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        region={{
          ...userLocation,
          // Delta : 지도의 확대 정도
          ...numbers.INITIAL_DELTA,
        }}
      />
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <FontAwesome6
            name="location-crosshairs"
            iconStyle="solid"
            size={25}
            color={colors.WHITE}
          />
        </Pressable>
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
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 45,
    width: 45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
  },
});

export default MapHomeScreen;
