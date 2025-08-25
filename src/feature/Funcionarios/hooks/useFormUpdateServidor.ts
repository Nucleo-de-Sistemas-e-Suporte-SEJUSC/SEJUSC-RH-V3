import React from "react";
import { toast } from "sonner";

import { api } from "@/api";
import type { IServidor, IUpdateServidor, User } from "@/interfaces";

export default function useFormUpdateServidor(servidor: IServidor | null) {
  const storedUser = JSON.parse(localStorage.getItem("user")!) as User;

  const historyLogsUpdate = async (
    user: string,
    nome: string,
    setor: string,
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

  const formatedDate = (data_criacao: string | null | undefined) => {
    if (!data_criacao) {
      return "";
    }

    const dataObjeto = new Date(data_criacao);
    const dia = String(dataObjeto.getUTCDate()).padStart(2, "0");
    const mes = String(dataObjeto.getUTCMonth() + 1).padStart(2, "0");
    const ano = dataObjeto.getUTCFullYear();

    return `${ano}-${mes}-${dia}`;
  };

  const [formValues, setFormValues] = React.useState<IUpdateServidor>({
    nome: servidor?.nome || "",
    setor: servidor?.setor || "",
    matricula: servidor?.matricula || "",
    cargo: servidor?.cargo || "",
    horario: "",
    horarioentrada: servidor?.horarioentrada || "",
    horariosaida: servidor?.horariosaida || "",
    sexo: servidor?.sexo || "",
    estado_civil: servidor?.estado_civil || "",
    naturalidade: servidor?.naturalidade || "",
    nacionalidade: servidor?.nacionalidade || "",
    identidade: servidor?.identidade || "",
    titulo_eleitor: servidor?.titulo_eleitor || "",
    cpf: servidor?.cpf || "",
    pis: servidor?.pis || "",
    endereco: servidor?.endereco || "",
    nome_pai: servidor?.nome_pai || "",
    nome_mae: servidor?.nome_mae || "",
    servico_militar: servidor?.servico_militar || "",
    carteira_profissional: servidor?.carteira_profissional || "",
    descanso_semanal: servidor?.descanso_semanal || "",
    vencimento_ou_salario: servidor?.vencimento_ou_salario || "",
    data_nascimento: formatedDate(servidor?.data_nascimento),
    data_Admissao: formatedDate(servidor?.data_Admissao),
    data_posse: formatedDate(servidor?.data_posse),
    inicio_atividades: formatedDate(servidor?.inicio_atividades),
    data_desligamento: formatedDate(servidor?.data_desligamento),
    beneficiarios: [{ nome: "", parentesco: "", data_nascimento: "" }],
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const tempPayload = {
        nome: formValues.nome,
        setor: formValues.setor,
        matricula: formValues.matricula,
        cargo: formValues.cargo,

        horario:
          formValues.horarioentrada && formValues.horariosaida
            ? `${formValues.horarioentrada}-${formValues.horariosaida}`
            : "",

        horarioentrada: formValues.horarioentrada,
        horariosaida: formValues.horariosaida,
        sexo: formValues.sexo,
        estado_civil: formValues.estado_civil,
        naturalidade: formValues.naturalidade,
        nacionalidade: formValues.nacionalidade,
        identidade: formValues.identidade,
        titulo_eleitor: formValues.titulo_eleitor,
        cpf: formValues.cpf,
        pis: formValues.pis,
        endereco: formValues.endereco,
        nome_pai: formValues.nome_pai,
        nome_mae: formValues.nome_mae,
        servico_militar: formValues.servico_militar,
        carteira_profissional: formValues.carteira_profissional,
        descanso_semanal: formValues.descanso_semanal,
        vencimento_ou_salario: formValues?.vencimento_ou_salario,
        data_nascimento: formValues.data_nascimento,
        data_Admissao: formValues.data_Admissao,
        data_posse: formValues.data_posse,
        inicio_atividades: formValues.inicio_atividades,
        data_desligamento: formValues.data_desligamento,

        beneficiarios: (formValues.beneficiarios || []).filter(
          (b) =>
            b.nome !== "" && b.parentesco !== "" && b.data_nascimento !== "",
        ),
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
        }),
      );

      await historyLogsUpdate(
        storedUser.nome,
        payload.nome as string,
        payload.setor as string,
      );

      await api.patch(`/servidores/${servidor?.id}`, payload);
      toast.success("Servidor atualizado com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log("Erro ao atualizar servidor:", error);
      toast.error("Não foi possível realizar a atualização");
    }
  };

  const handleChange = (index: number, field: string, value: string) => {
    setFormValues((prevData) => {
      const beneficiariosArray = prevData.beneficiarios || [];

      const updated = [...beneficiariosArray];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return {
        ...prevData,
        beneficiarios: updated,
      };
    });
  };

  const handleAddBeneficiario = () => {
    setFormValues((prevData) => ({
      ...prevData,
      beneficiarios: [
        ...(prevData.beneficiarios || []),
        { nome: "", parentesco: "", data_nascimento: "" },
      ],
    }));
  };

  return {
    handleSubmit,
    handleChange,
    handleAddBeneficiario,
    setFormValues,
    formValues,
  };
}
