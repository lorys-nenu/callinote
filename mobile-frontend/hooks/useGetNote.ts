import { Note } from "@/constants/Note";
import { useQuery } from "@tanstack/react-query";

const useGetNote = (noteId: string) => {
  const { data: note, isPending, isError  } = useQuery<Note>({
    queryKey: ["note", noteId], 
    queryFn: async () => {
      const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/notes/" + noteId);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      return response.json();
    }
  });

  return { note, isLoading: isPending, isError};
}

export default useGetNote;