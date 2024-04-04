import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note } from "@/constants/Note";
import { useUser } from "@/stores/user";

const useAddNote = () => {
  const user = useUser().user;

  const postTodo = async () => {
    if (!user) {
      throw new Error("User not logged in");
    }

    const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title: "New note", HTMLcontent: "New note content", userId: user.id}),
    });

    return response.json();
  }

  const queryClient = useQueryClient();
  const { mutate } = useMutation<Note>({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notes"]});
    }
  });

  return { addNote: mutate };
}

export default useAddNote;