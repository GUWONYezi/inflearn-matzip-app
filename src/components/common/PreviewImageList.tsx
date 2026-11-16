import {baseUrl} from '@/api/axios';
import {colors} from '@/constants/colors';
import {ImageUri} from '@/types/domain';
import {FeedStackParamList} from '@/types/navigation';
import Ionicons from '@react-native-vector-icons/ionicons';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import {Image, Platform, Pressable, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (uri: String) => void;
  showDeleteButton?: boolean;
}

function PreviewImageList({
  imageUris,
  onDelete,
  showDeleteButton = false,
}: PreviewImageListProps) {
  const navigation = useNavigation<NavigationProp<FeedStackParamList>>();
  const route = useRoute<RouteProp<FeedStackParamList>>();

  const handlePressImage = (index: number) => {
    navigation.navigate('ImageZoom', {id: route.params?.id, index: index});
  };

  return (
    <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
      {imageUris.map(({uri}, index) => {
        return (
          <Pressable
            key={uri}
            style={styles.imageContainer}
            onPress={() => handlePressImage(index)}>
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === 'ios' ? baseUrl.ios : baseUrl.android
                }/${uri}`,
              }}
              resizeMode="cover"
            />
            {showDeleteButton && (
              <Pressable
                style={styles.deleteButton}
                onPress={() => onDelete?.(uri)}>
                <Ionicons name="close" size={15} color={colors.WHITE} />
              </Pressable>
            )}
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
