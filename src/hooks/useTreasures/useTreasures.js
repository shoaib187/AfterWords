import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createTreasure,
  listTreasures,
  getTreasure,
  updateTreasure,
  deleteTreasure,
} from '../../utils/apis/treasures/api';
import { useAuth } from '../../configs/authContext/authContext';

export const useTreasures = (params = {}) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ['treasures', params],
    queryFn: () => listTreasures(token, params),
    enabled: !!token,
  });
};

export const useTreasure = id => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ['treasure', id],
    queryFn: () => getTreasure(id, token),
    enabled: !!token && !!id,
  });
};

export const useCreateTreasure = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }) => createTreasure(formData, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['treasures'],
      });
      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
      queryClient.invalidateQueries({
        queryKey: ['dashboard-stats'],
      });
    },
    onError: error => {
      throw error;
    },
  });
};

export const useUpdateTreasure = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({ id, payload }) => updateTreasure(id, payload, token),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['treasures'],
      });

      queryClient.invalidateQueries({
        queryKey: ['treasure', variables.id],
      });
    },
  });
};

export const useDeleteTreasure = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({ id }) => deleteTreasure(id, token),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['treasures'],
      });

      queryClient.removeQueries({
        queryKey: ['treasure', variables.id],
      });
    },
    onError: error => {
      throw error;
    },
  });
};
