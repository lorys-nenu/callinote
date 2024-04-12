import { useMutation, useQueryClient } from "@tanstack/react-query";

type RegistrationData = {
  email: string;
  password: string;
  name?: string;
};

const useRegister = (registrationData: RegistrationData) => {
  const queryClient = useQueryClient();

  const register = async () => {
    const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });

    return response.json();
  };

  const { mutate } = useMutation<RegistrationData>({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    }
  });

  return { register: mutate };
};

export default useRegister;