import {baseUrl} from '@/api/axios';
import CustomButton from '@/components/common/CustomButton';
import PreviewImageList from '@/components/common/PreviewImageList';
import {colors} from '@/constants/colors';
import useGetPost from '@/hook/queries/useGetPost';
import {FeedStackParamList} from '@/types/navigation';
import {getDateWithSeparator} from '@/utils/date';
import Ionicons from '@react-native-vector-icons/ionicons';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = StackScreenProps<FeedStackParamList, 'FeedDetail'>;

function FeedDetailScreen({route}: Props) {
  const {id} = route.params;
  const inset = useSafeAreaInsets();
  const {data: post, isPending, isError} = useGetPost(id); // 포스트 상세 정보 get

  if (isPending || isError) {
    // 데이터가 아직 준비되지 않았거나 에러가 났다면 빈값 return
    return <></>;
  }

  return (
    <>
      {/* 헤더 영역 */}
      <View style={[styles.header, {top: inset.top}]}>
        <Ionicons name="chevron-back" size={30} color={colors.WHITE} />
        <Ionicons name="ellipsis-vertical" size={30} color={colors.WHITE} />
      </View>
      <ScrollView>
        {/* 이미지 영역 */}
        <View style={styles.imageContainer}>
          {post.imageUris.length > 0 && (
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === 'ios' ? baseUrl.ios : baseUrl.android
                }/${post.imageUris[0].uri}`,
              }}
              resizeMode="cover"
            />
          )}
          {post.imageUris.length === 0 && (
            <View style={styles.emptyImageContainer}>
              <Text adjustsFontSizeToFit numberOfLines={1}>
                No Image
              </Text>
            </View>
          )}
        </View>
        {/* 바디 영역 */}
        <View style={styles.contentsContainer}>
          {/* 주소 영역 */}
          <View style={styles.addressContainer}>
            <Ionicons name="location" size={10} color={colors.GRAY_500} />
            <Text
              style={styles.addressText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {post.address}
            </Text>
          </View>
          {/* 타이틀 영역 */}
          <Text style={styles.titleText}>{post.title}</Text>
          {/* 내용 영역 */}
          <View style={styles.infoContainer}>
            {/* 날짜 & 평점 */}
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>방문날짜</Text>
                <Text style={styles.infoColumnValueText}>
                  {getDateWithSeparator(post.date, '.')}
                </Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>평점</Text>
                <Text style={styles.infoColumnValueText}>{post.score}</Text>
              </View>
            </View>
            {/* 마커색상 */}
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>마커색상</Text>
                <View
                  style={[styles.markerColor, {backgroundColor: post.color}]}
                />
              </View>
            </View>
          </View>
          {/* 설명 영역 */}
          <Text style={styles.descriptionText}>{post.description}</Text>
        </View>
        {/* 이미지 리스트 영역 */}
        {post.imageUris.length > 0 && (
          <View style={styles.imageContentsContainer}>
            <PreviewImageList imageUris={post.imageUris} />
          </View>
        )}
      </ScrollView>

      {/* 하단 영역 */}
      <View style={[styles.bottomContainer, {paddingBottom: inset.bottom}]}>
        <CustomButton
          size="small"
          label={<Ionicons name="star" size={25} color={colors.WHITE} />}
          style={{paddingHorizontal: 5}}
        />
        <CustomButton size="small" label="위치보기" style={{width: '50%'}} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    zIndex: 1,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
  },
  imageContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContentsContainer: {
    paddingVertical: 15,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  emptyImageContainer: {
    height: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GRAY_200,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  contentsContainer: {
    padding: 20,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  addressContainer: {
    gap: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 12,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  infoContainer: {
    marginVertical: 20,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoColumnKeyText: {
    color: colors.BLACK,
  },
  infoColumnValueText: {
    color: colors.PINK_700,
  },
  markerColor: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  descriptionText: {
    color: colors.BLACK,
    lineHeight: 25,
    fontSize: 16,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_200,
    gap: 5,
  },
});

export default FeedDetailScreen;
