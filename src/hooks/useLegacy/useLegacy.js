import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createLegacyGift,
  listLegacyGifts,
  getLegacyGift,
  updateLegacyGift,
  deleteLegacyGift,
} from '../../utils/apis/legacy/api';
import { useAuth } from '../../configs/authContext/authContext';

export const useLegacyGifts = (params = {}) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ['legacy-gifts', params],
    queryFn: () => listLegacyGifts(token, params),
    enabled: !!token,
  });
};

export const useLegacyGift = id => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ['legacy-gift', id],
    queryFn: () => getLegacyGift(id, token),
    enabled: !!token && !!id,
  });
};

export const useCreateLegacyGift = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({ payload }) => createLegacyGift(payload, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['legacy-gifts'],
      });
    },
  });
};

export const useUpdateLegacyGift = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({ id, payload }) => updateLegacyGift(id, payload, token),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['legacy-gifts'],
      });

      queryClient.invalidateQueries({
        queryKey: ['legacy-gift', variables.id],
      });
    },
  });
};

export const useDeleteLegacyGift = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({ id }) => deleteLegacyGift(id, token),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['legacy-gifts'],
      });

      queryClient.removeQueries({
        queryKey: ['legacy-gift', variables.id],
      });
    },
  });
};
