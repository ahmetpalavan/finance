import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '~/lib/hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.categories.$post>;
type RequestType = InferRequestType<typeof client.api.categories.$post>['json'];

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories.$post({ json });
      return response.json();
    },
    onSuccess: () => {
      toast.success('Category created');
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
