import ImageCarousel from '@/components/ImageCarousel';
import useGetPost from '@/hook/queries/useGetPost';
import {FeedStackParamList} from '@/types/navigation';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = StackScreenProps<FeedStackParamList, 'ImageZoom'>;

function ImageZoomScreen({route}: Props) {
  const {id, index} = route.params;
  const {data: post} = useGetPost(id);

  return <ImageCarousel images={post?.imageUris ?? []} pressedIndex={index} />;
}

const styles = StyleSheet.create({});

export default ImageZoomScreen;
