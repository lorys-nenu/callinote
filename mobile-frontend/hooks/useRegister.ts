import { useState } from 'react';
import { User } from './../constants/User';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from '@/stores/user';
import { useAuth } from '@/stores/auth';
import { useMMKVString } from 'react-native-mmkv';

type RegistrationData = {
  email: string;
  password: string;
  name?: string;
};

const useRegister = () => {
  const [, setToken] = useMMKVString("token");
  const [error, setError] = useState<string | null>(null);
  const {signIn} = useAuth();
  const {setUser} = useUser();
  const queryClient = useQueryClient();

  const register = async (registrationData: RegistrationData) => {
    const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });

    if (!response.ok) {
      setError("Registration failed");
    }

    if (response.status === 409) {
      setError("User already exists");
    }

    return response.json();
  };

  const { mutateAsync } = useMutation<{user: User, token: string}, Error, RegistrationData>({
    mutationFn: register,
    onMutate: () => {
      setError(null);
    },
    onSuccess: (data) => {
      if (!data) return;
      setToken(data.token);
      signIn(data.token);
      setUser(data.user);
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    }
  });

  return { register: mutateAsync, error };
};

export default useRegister;