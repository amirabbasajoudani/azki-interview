import C from './constant';
import { useQuery } from '@tanstack/react-query';
import http from '@/configs/http-client';
import { Discount } from './type';

export const useGetThirdDiscount = ({ enabled = true } = {}) => {
  return useQuery<HttpResponse<Array<Discount>>>({
    queryKey: [C.DISCOUNT],
    queryFn: () => {
      return http.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/third/third-discounts`
      );
    },
    enabled,
  });
};
