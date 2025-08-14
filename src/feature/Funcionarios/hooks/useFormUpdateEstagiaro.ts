import React from "react";
import type { IEstagiario, User } from "@/interfaces";
import { api } from "@/api/axios";
import { toast } from "sonner";

export default function useFormUpdateEstagiaro(estagiario: IEstagiario | null) {
  const storedUser = JSON.parse(localStorage.getItem("user")!) as User;

  const historyLogsUpdate = async (
    user: string,
    nome: string,
    setor: string
  ) => {
    try {
      await api.post("/historico-logs", {
        mensagem: `O usuario de nome ${user} atualizou o servidor ${nome} do setor ${setor}`,
        nome: nome,
        acao: "Atualizar",
      });
    } catch (error) {
      console.log("Erro ao criar o log", error);
    }
  };

  const formatedDate = (data_criacao: string) => {
    if (!data_criacao) {
      return "";
    }

    const dataObjeto = new Date(data_criacao);
    const dia = String(dataObjeto.getUTCDate()).padStart(2, "0");
    const mes = String(dataObjeto.getUTCMonth() + 1).padStart(2, "0");
    const ano = dataObjeto.getUTCFullYear();

    return `${ano}-${mes}-${dia}`;
  };

  const [formValues, setFormValues] = React.useState<IEstagiario>({
    nome: estagiario?.nome! || "",
    setor: estagiario?.setor! || "",
    cargo: "",
    horario: "",
    horario_entrada: estagiario?.horario_entrada! || "",
    horario_saida: estagiario?.horario_saida! || "",
    feriasinicio: formatedDate(estagiario?.feriasinicio!),
    feriasfinal: formatedDate(estagiario?.feriasfinal!),
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const tempPayload = {
        nome: formValues.nome,
        setor: formValues.setor,
        cargo: "ESTAGIÁRIO",
        horario: `${formValues.horario_entrada}-${formValues.horario_saida}`,
        entrada: formValues.horario_entrada,
        saida: formValues.horario_saida,
        feriasinicio: formValues.feriasinicio,
        feriasfinal: formValues.feriasfinal,
      };

      const payload = Object.fromEntries(
        Object.entries(tempPayload).filter(([_, value]) => {
          if (value === null || value === undefined || value === "") {
            return false;
          }

          if (Array.isArray(value) && value.length === 0) {
            return false;
          }

          return true;
        })
      );

      await historyLogsUpdate(
        storedUser.nome,
        payload.nome as string,
        payload.setor as string
      );

      await api.put(`/estagiarios/${estagiario?.id}`, payload);
      toast.success("Estagiário atualizado com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log("Erro ao atualizar estagiário:", error);
      toast.error("Não foi possível realizar a atualização");
    }
  };

  return {
    handleSubmit,
    setFormValues,
    formValues,
  };
}
