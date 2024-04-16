import { useQuery } from "@tanstack/react-query";
import useAuthenticatedFetch from "./useAuthenticatedFetch";
import { User } from "@/constants/User";

const useGetProfile = () => {
  const authenticatedFetch = useAuthenticatedFetch();
  const { data: user, isLoading, isError  } = useQuery<User>({
    queryKey: ["profile"], 
    queryFn: async () => {
      return await authenticatedFetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/me");
    },
  });

  return { user, loading: isLoading, error: isError};
}

export default useGetProfile;