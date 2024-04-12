import { Note } from "@/constants/Note";
import { useQuery } from "@tanstack/react-query";
import useAuthenticatedFetch from "./useAuthenticatedFetch";

const useGetNote = (noteId: string) => {
  const authenticatedFetch = useAuthenticatedFetch();
  const { data: note, isPending, isError  } = useQuery<Note>({
    queryKey: ["note", noteId], 
    queryFn: async () => {
      return await authenticatedFetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/notes/" + noteId);
    }
  });

  return { note, isLoading: isPending, isError};
}

export default useGetNote;