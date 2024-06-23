import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { removeEmptyFieldsFromObject, axiosInstance } from '@lib/helper';


export const BO_USERS_URL = '/v1/admin/users';
export const BO_USERS_QUERY_KEY = 'bo-users-list';

// export const useBOUsersFetch = (allParams) => {
//   const request = removeEmptyFieldsFromObject(allParams);
//
//   const { data, isLoading } = useQuery({
//     queryKey: [BO_USERS_QUERY_KEY, request],
//     queryFn:
//       async () => (await axiosInstance.post(`${BO_USERS_URL}/fetch`, request)).data,
//     keepPreviousData: true,
//   });
//
//   const { results, totalPages, totalResults } = data || {};
//
//   const users = useMemo(() => {
//     return results || [];
//   }, [results]);
//
//   return {
//     users,
//     totalPages,
//     totalResults,
//     usersIsLoading: isLoading,
//   }
// };

//
// export const useBOUserDeleteMutation = () => {
//   const queryClient = useQueryClient();
//
//   return useMutation({
//     mutationFn: async (data) =>
//       await axiosInstance.delete(BO_USERS_URL, { data }),
//     onSuccess: async () => {
//       await queryClient.invalidateQueries({ queryKey: [BO_USERS_QUERY_KEY] });
//       await queryClient.invalidateQueries({ queryKey: [BO_USER_QUERY_KEY] });
//     },
//   });
// };
