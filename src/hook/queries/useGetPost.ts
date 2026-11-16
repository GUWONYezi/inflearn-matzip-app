import {getPost} from '@/api/post';
import {queryKeys} from '@/constants/keys';
import {UseQueryCustomOptions} from '@/types/api';
import {Post} from '@/types/domain';
import {useQuery} from '@tanstack/react-query';

function useGetPost(id?: number, queryOptions?: UseQueryCustomOptions<Post>) {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: Boolean(id), // id가 있을 때만 쿼리 실행
    ...queryOptions,
  });
}

export default useGetPost;
