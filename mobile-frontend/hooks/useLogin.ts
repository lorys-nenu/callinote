import { useState } from "react";
import { User } from "@/constants/User";
import { useAuth } from "@/stores/auth";
import { useUser } from "@/stores/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMMKVString } from "react-native-mmkv";

type LoginData = {
  email: string;
  password: string;
};

const useLogin = () => {
  const [, setToken] = useMMKVString("token");
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const { setUser } = useUser();
  const queryClient = useQueryClient();

  const login = async (loginData: LoginData) => {
    const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (response.status === 401) {
      setError("Invalid credentials");
      return;
    }

    if (!response.ok) {
      throw new Error(`Fetch request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  };

  const { mutateAsync } = useMutation<{user: User, token: string}, Error, LoginData>({
    mutationFn: login,
    onMutate: () => {
      setError(null);
    },
    onSuccess: (data) => {
      if (!data) return;
      setToken(data.token);
      signIn(data.token);
      setUser(data.user);
      queryClient.setQueryData(["authUser"], data);
    },
  });

  return { login: mutateAsync, error };
}

export default useLogin;
