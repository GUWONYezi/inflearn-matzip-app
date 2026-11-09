import {colors} from '@/constants/colors';
import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomMarker from './CustomMarker';

interface MarkerColorInputProps {
  color: string;
  onChangeColor: (value: string) => void;
  score: number;
}

// 마커 색상 선택용 컴포넌트
function MarkerColorInput({
  color,
  onChangeColor,
  score,
}: MarkerColorInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>마커선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {[
            // 마커 색상 배열
            colors.PINK_400,
            colors.BLUE_400,
            colors.YELLOW_400,
            colors.GREEN_400,
            colors.PURPLE_400,
          ].map(selectColor => {
            return (
              // 색상별 마커 나열
              <Pressable
                key={selectColor}
                style={[
                  styles.markerBox,
                  color === selectColor && styles.pressedMarker,
                ]}
                onPress={() => onChangeColor(selectColor)}>
                <CustomMarker color={selectColor} score={score} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: 15,
  },
  markerInputScroll: {
    flexDirection: 'row',
    gap: 20,
  },
  markerLabel: {
    marginBottom: 15,
    color: colors.GRAY_700,
  },
  markerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: colors.GRAY_100,
  },
  pressedMarker: {
    borderWidth: 2,
    borderColor: colors.RED_500,
  },
});

export default MarkerColorInput;
