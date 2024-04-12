import { Note } from "@/constants/Note";
import { useQuery } from "@tanstack/react-query";
import useAuthenticatedFetch from "./useAuthenticatedFetch";

const useGetNotes = () => {
  const authenticatedFetch = useAuthenticatedFetch();
  const { data: notes, isPending, isError  } = useQuery<Note[]>({
    queryKey: ["notes"], 
    queryFn: async () => {
      const response = await authenticatedFetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/notes");
      return response;
    }
  });

  const sortedNotes = notes?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

  return { 
    notes: sortedNotes, 
    isLoading: isPending, 
    isError
  };
}

export default useGetNotes;