import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note } from "@/constants/Note";

const postTodo = async () => {
  const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({title: "New note", content: "New note content"}),
  });

  return response.json();
}

const useAddNote = () => {
  const queryClient = useQueryClient();
  const {mutate} = useMutation<Note>({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notes"]});
    }
  });

  return { addNote: mutate };
}

export default useAddNote;