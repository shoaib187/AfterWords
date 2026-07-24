import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createRecipient,
  listRecipients,
  getRecipient,
  updateRecipient,
  deleteRecipient,
} from '../../utils/apis/recipient/api';
import { useAuth } from '../../configs/authContext/authContext';

export const useRecipients = (params = {}) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ['recipients', params],
    queryFn: () => listRecipients(token, params),
    enabled: !!token,
  });
};

export const useRecipient = id => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ['recipient', id],
    queryFn: () => getRecipient(id, token),
    enabled: !!token && !!id,
  });
};

export const useCreateRecipient = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  return useMutation({
    mutationFn: ({ payload }) => createRecipient(payload, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recipients'],
      });
    },
  });
};

export const useUpdateRecipient = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({ id, payload }) => updateRecipient(id, payload, token),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['recipients'],
      });

      queryClient.invalidateQueries({
        queryKey: ['recipient', variables.id],
      });
    },
  });
};

export const useDeleteRecipient = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  return useMutation({
    mutationFn: ({ id }) => deleteRecipient(id, token),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['recipients'],
      });

      queryClient.removeQueries({
        queryKey: ['recipient', variables.id],
      });
    },
  });
};
