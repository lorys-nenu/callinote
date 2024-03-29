import { Note } from "@/constants/Note";
import { useQuery } from "@tanstack/react-query";

const useGetNotes = () => {
  const { data: notes, isPending, isError  } = useQuery<Note[]>({
    queryKey: ["notes"], 
    queryFn: async () => {
      const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/notes");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      return response.json();
    }
  });

  return { notes, isLoading: isPending, isError};
}

export default useGetNotes;