import useSetApiDataForTen from "../useSetApiDataForTen";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useTenStackMutate = <P extends object>({
  invalidateQueriesKey,
  endpoint,
}: {
  invalidateQueriesKey: string;
  endpoint: string;
}) => {
  const queryClient = useQueryClient();

  const { SetFunction } = useSetApiDataForTen<P>({
    endpoint,
  });

  const mutation = useMutation({
    mutationFn: SetFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [invalidateQueriesKey] });
    },
  });

  return mutation;
};

export default useTenStackMutate;
