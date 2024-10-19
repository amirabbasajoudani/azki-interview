import C from './constant';
import { useQuery } from '@tanstack/react-query';
import http from '@/configs/http-client';
import { Company } from './type';

export const useGetCompanies = ({ enabled = true } = {}) => {
  return useQuery<HttpResponse<Array<Company>>>({
    queryKey: [C.COMPANY],
    queryFn: () => {
      return http.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/third/companies`
      );
    },
    enabled,
  });
};
