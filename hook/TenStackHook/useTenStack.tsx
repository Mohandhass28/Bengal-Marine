import { useQuery } from "@tanstack/react-query";

const useTenStack = <T, P>({
  endpoint,
  pram,
  key,
  refetch,
  id,
}: {
  endpoint: string;
  pram: P;
  key: string;
  refetch?: boolean;
  id?: number | string;
}) => {
  const query = useQuery<T>({
    queryKey: [key, id],

    enabled: refetch,
  });

  return query;
};

export default useTenStack;
