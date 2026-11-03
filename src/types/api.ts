import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';

// axios 에러 타입 정의
type ResponseError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;

// MutationOptions 커스텀 타입 생성 (mutationFn은 hook에서 각각 지정해주기 때문에 필요 없음(제외))
// TData: 뮤테이션 함수의 실행 결과로 반환되는 값의 타입
// ResponseError: axios 실행 에러
// TVariables: 뮤테이션 함수에 전달하는 인자의 타입
type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, unknown>,
  'mutationFn'
>;

type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  'queryKey'
>;

export type {ResponseError, UseMutationCustomOptions, UseQueryCustomOptions};
