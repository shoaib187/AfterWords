import { useQuery } from '@tanstack/react-query';
import { getDashboardStats, getMe } from '../../utils/apis/user/api';
import { useAuth } from '../../configs/authContext/authContext';

export const useUser = () => {
  const { token } = useAuth();
  const query = useQuery({
    queryKey: ['me'],
    queryFn: () => getMe(token),
    enabled: !!token,
  });

  return {
    user: query.data?.data?.user || null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useDashboardStats = () => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => getDashboardStats(token),
    enabled: !!token,
  });
};
