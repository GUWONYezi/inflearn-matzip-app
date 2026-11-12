import {getPosts} from '@/api/post';
import {queryKeys} from '@/constants/keys';
import {ResponseError} from '@/types/api';
import {Post} from '@/types/domain';
import {InfiniteData, QueryKey, useInfiniteQuery} from '@tanstack/react-query';
import {UseInfiniteQueryOptions} from 'node_modules/@tanstack/react-query/build/legacy';

// 포스트 목록 무한스크롤 조회
function useGetInfinitePosts(
  queryOptions?: UseInfiniteQueryOptions<
    Post[],
    ResponseError,
    InfiniteData<Post[], number>,
    QueryKey,
    number
  >,
) {
  // useQuery와 비슷하지만 무한 스크롤 페이지를 구현할 수 있도록 페이지 기능이 추가된 쿼리
  return useInfiniteQuery({
    queryFn: ({pageParam}) => getPosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfinitePosts;
