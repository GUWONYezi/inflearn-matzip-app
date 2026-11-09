import {baseUrl} from '@/api/axios';
import {colors} from '@/constants/colors';
import {ImageUri} from '@/types/domain';
import Ionicons from '@react-native-vector-icons/ionicons';
import React from 'react';
import {Image, Platform, Pressable, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (uri: String) => void;
}

function PreviewImageList({imageUris, onDelete}: PreviewImageListProps) {
  return (
    <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
      {imageUris.map(({uri}) => {
        return (
          <Pressable key={uri} style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === 'ios' ? baseUrl.ios : baseUrl.android
                }/${uri}`,
              }}
              resizeMode="cover"
            />
            <Pressable
              style={styles.deleteButton}
              onPress={() => onDelete?.(uri)}>
              <Ionicons name="close" size={15} color={colors.WHITE} />
            </Pressable>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 15,
    paddingHorizontal: 15,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.BLACK,
  },
});

export default PreviewImageList;
