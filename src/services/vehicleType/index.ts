import C from './constant';
import { useQuery } from '@tanstack/react-query';
import http from '@/configs/http-client';
import { Vehicle } from './type';

export const useGetVehicleTypes = ({ enabled = true } = {}) => {
  return useQuery<HttpResponse<Array<Vehicle>>>({
    queryKey: [C.VEHICLE],
    queryFn: () => {
      return http.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/vehicle/types`
      );
    },
    enabled,
  });
};
