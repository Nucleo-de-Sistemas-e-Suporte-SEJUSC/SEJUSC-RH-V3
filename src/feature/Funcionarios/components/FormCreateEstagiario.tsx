import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Input from "@/shared/Input";
import { Select } from "@/shared/Select";
import Button from "@/shared/Button";
import { api } from "@/api/axios";
import type { IEstagiario, IServidor } from "@/interfaces";

// Schema e tipo de dados definidos acima
const estagiarioSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome completo é obrigatório.")
    .transform((val) => val.toUpperCase()),
  setor: z
    .string()
    .min(1, "O setor é obrigatório.")
    .transform((val) => val.toUpperCase()),
  cargo: z.literal("ESTAGIÁRIO").default("ESTAGIÁRIO"), // Cargo padrão
  entrada: z.enum(["08:00", "11:00"], {
    message: "Selecione o horário de entrada.",
  }),
  saida: z.enum(["14:00", "17:00"], {
    message: "Selecione o horário de saída.",
  }),
});

type EstagiarioFormData = z.infer<typeof estagiarioSchema>;

type FormCreateEstagiarioProps = {
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{
      servidor: IServidor | null;
      estagiario: IEstagiario | null;
      modal: boolean;
      action: string | null;
    }>
  >;
};

export default function FormCreateEstagiario({
  setIsModalOpen,
}: FormCreateEstagiarioProps) {
  // 1. Inicializa o React Hook Form com o Zod Resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EstagiarioFormData>({
    resolver: zodResolver(estagiarioSchema),
    defaultValues: {
      nome: "",
      setor: "",
      cargo: "ESTAGIÁRIO",
      entrada: "08:00", // Valor padrão opcional
      saida: "14:00", // Valor padrão opcional
    },
  });

  // 2. Função de submit tipada que só será executada com dados válidos
  const onSubmit: SubmitHandler<EstagiarioFormData> = async (data) => {
    try {
      await api.post("/estagiarios", {
        nome: data.nome,
        setor: data.setor,
        cargo: data.cargo,
        horario: `${data.entrada}-${data.saida}`,
        entrada: data.entrada,
        saida: data.saida,
      });
      toast.success("Estagiário cadastrado com sucesso!");
      reset(); // Limpa o formulário
    } catch (error) {
      console.log("Erro ao cadastrar estagiário:", error);
      toast.error("Não foi possível realizar o cadastro");
    }
  };

  // Componente auxiliar para exibir mensagens de erro
  const ErrorMessage = ({ message }: { message?: string }) => {
    return message ? (
      <p className="text-red-600 text-sm mt-1">{message}</p>
    ) : null;
  };

  return (
    <div>
      <h1 className="text-4xl text-sky-950 font-semibold pb-8">
        Criar Estagiário
      </h1>
      {/* 3. Liga o formulário ao handleSubmit */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div>
            <Input
              id="nome"
              label="Nome Completo*"
              placeholder="YURI ODILON NOGUEIRA MOURA"
              {...register("nome")}
            />
            <ErrorMessage message={errors.nome?.message} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                id="setor"
                label="Setor*"
                placeholder="ASCOM"
                {...register("setor")}
              />
              <ErrorMessage message={errors.setor?.message} />
            </div>
            <div>
              <Input
                id="cargo"
                label="Cargo*"
                readOnly
                defaultValue="Estagiário"
                {...register("cargo")}
              />
              <ErrorMessage message={errors.cargo?.message} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Select
                id="entrada"
                label="Entrada*"
                optionLabel="selecione uma opção"
                options={[
                  { label: "08:00", value: "08:00" },
                  { label: "11:00", value: "11:00" },
                ]}
                {...register("entrada")}
              />
              <ErrorMessage message={errors.entrada?.message} />
            </div>
            <div>
              <Select
                id="saida"
                label="Saída*"
                optionLabel="selecione uma opção"
                options={[
                  { label: "14:00", value: "14:00" },
                  { label: "17:00", value: "17:00" },
                ]}
                {...register("saida")}
              />
              <ErrorMessage message={errors.saida?.message} />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit">Cadastrar Estagiário</Button>
          <Button
            type="button"
            onClick={() =>
              setIsModalOpen({
                servidor: null,
                estagiario: null,
                modal: false,
                action: null,
              })
            }
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
