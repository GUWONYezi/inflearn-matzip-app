import useGetInfinitePosts from '@/hook/queries/useGetInfinitePosts';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FeedItem from './FeedItem';

function FeedList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();

  // 새로고침 여부
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // 끝에 닿았을 때 다음 페이지 get
  const handleEndReached = () => {
    // 다음 페이지가 있고 다음 페이지를 가져오는 중이 아닐 때
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // 새로고침 이벤트
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      onRefresh={handleRefresh}
      refreshing={isRefreshing}
      scrollIndicatorInsets={{right: 1}}
      indicatorStyle="black"
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedList;
