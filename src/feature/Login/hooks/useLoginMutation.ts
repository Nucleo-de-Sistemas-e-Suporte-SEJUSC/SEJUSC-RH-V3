import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { type NavigateFunction } from "react-router";
import { toast } from "sonner";

import type { User } from "@/interfaces";

import loginApi from "../api/loginApi";

interface UseLoginMutationProps {
  login: (user: User) => void;
  navigate: NavigateFunction;
}

export const useLoginMutation = ({
  login,
  navigate,
}: UseLoginMutationProps) => {
  return useMutation({
    mutationFn: (values: { matricula: string; password: string }) =>
      loginApi(values),
    onSuccess: (response) => {
      const user = response as User;
      const storedUser = {
        nome: user.nome,
        role: user.role,
        cargo: user.cargo,
      };

      localStorage.setItem("user", JSON.stringify(storedUser));
      toast.success("Usuário autenticado!");
      login(storedUser);
      navigate("/dashboard");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const { response } = error;
        if (response?.status === 404) {
          toast.error("Error 404", { description: "Usuário não encontrado." });
          return;
        }
        if (response?.status === 401) {
          toast.error("Error 401", { description: "Usuário não autorizado." });
          return;
        }
        toast.error("Error HTTP", {
          description:
            response?.data?.message ||
            "Não foi possível se conectar ao servidor.",
        });
      }
    },
  });
};
