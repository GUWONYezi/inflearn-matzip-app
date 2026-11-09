import {colors} from '@/constants/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface ImageInputProps {
  onChange: () => void;
}

// 이미지 업로드용 컴포넌트
function ImageInput({onChange}: ImageInputProps) {
  return (
    <Pressable
      style={pressed => [
        pressed && styles.imageInputPressed,
        styles.imageInput,
      ]}
      onPress={onChange}>
      {/* 카메라 아이콘 */}
      <Ionicons name="camera-outline" size={20} color={colors.GRAY_500} />
      <Text style={styles.inputText}>사진추가</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageInput: {
    borderWidth: 1.5,
    borderStyle: 'dotted',
    borderColor: colors.GRAY_500,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  imageInputPressed: {
    opacity: 0.5,
  },
  inputText: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
});

export default ImageInput;
