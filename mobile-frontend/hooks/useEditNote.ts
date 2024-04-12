import { Note } from "@/constants/Note";
import { useUser } from "@/stores/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthenticatedFetch from "./useAuthenticatedFetch";

/***
 * This hook is used to edit a note
 * @param note The note to edit
 * @returns The editNote function
 * @example
 * const { editNote } = useEditNote();
 * editNote({title: "New title", content: "New content", id: 1});
 * @returns void
 * @throws Error if the user is not logged in
 * @throws Error if the request fails
 */

const useEditNote = (noteId: Note["id"]) => {
  const user = useUser().user;
  const authenticatedFetch = useAuthenticatedFetch();

  const putNote = async (note: unknown) => {
    if (!user) {
      throw new Error("User not logged in");
    }

    const noteObject = note as Note;

    const response = await authenticatedFetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/notes/" + noteId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...noteObject, userId: user.id}),
    });

    return response.json();
  }

  const queryClient = useQueryClient();
  const { mutate } = useMutation<Note>({
    mutationFn: (newNote) => putNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notes"]});
    }
  });

  return { editNote: mutate };
}

export default useEditNote;