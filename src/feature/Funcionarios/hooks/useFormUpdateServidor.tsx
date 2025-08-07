import React from "react";
import { api } from "@/api/axios";
import { toast } from "sonner";
import type { IServidor, IUpdateServidor } from "@/interfaces";

export default function useFormUpdateServidor(employee: IServidor | null) {
    const formatedDate = (data_criacao: string) => {
        if (!data_criacao) {
            return '';
        }

        const dataObjeto = new Date(data_criacao);
        const dia = String(dataObjeto.getUTCDate()).padStart(2, '0');
        const mes = String(dataObjeto.getUTCMonth() + 1).padStart(2, '0');
        const ano = dataObjeto.getUTCFullYear();

        return `${ano}-${mes}-${dia}`;
    };

    const [formValues, setFormValues] = React.useState<IUpdateServidor>({
        nome: employee?.nome!,
        setor: employee?.setor!,
        matricula: employee?.matricula!,
        cargo: employee?.cargo!,
        horario: '',
        horarioentrada: employee?.horarioentrada!,
        horariosaida: employee?.horariosaida!,
        sexo: employee?.sexo!,
        estado_civil: employee?.estado_civil!,
        naturalidade: employee?.naturalidade!,
        nacionalidade: employee?.nacionalidade!,
        identidade: employee?.identidade!,
        titulo_eleitor: employee?.titulo_eleitor!,
        cpf: employee?.cpf!,
        pis: employee?.pis!,
        endereco: employee?.endereco!,
        nome_pai: employee?.nome_pai!,
        nome_mae: employee?.nome_mae!,
        servico_militar: employee?.servico_militar!,
        carteira_profissional: employee?.carteira_profissional!,
        descanso_semanal: employee?.descanso_semanal!,
        vencimento_ou_salario: employee?.vencimento_ou_salario!,
        data_nascimento: formatedDate(employee?.data_nascimento!),
        data_Admissao: formatedDate(employee?.data_Admissao!),
        data_posse: formatedDate(employee?.data_posse!),
        inicio_atividades: formatedDate(employee?.inicio_atividades!),
        data_desligamento: formatedDate(employee?.data_desligamento!),
        beneficiarios: [
            { nome: '', parentesco: '', data_nascimento: '' }
        ]
    })

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const tempPayload = {
                nome: formValues.nome,
                setor: formValues.setor,
                matricula: formValues.matricula,
                cargo: formValues.cargo,

                horario: (formValues.horarioentrada && formValues.horariosaida)
                    ? `${formValues.horarioentrada}-${formValues.horariosaida}`
                    : '',

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

                beneficiarios: (formValues.beneficiarios || []).filter(b =>
                    b.nome !== '' && b.parentesco !== '' && b.data_nascimento !== ''
                )
            };

            const payload = Object.fromEntries(
                Object.entries(tempPayload).filter(([_, value]) => {
                    if (value === null || value === undefined || value === '') {
                        return false;
                    }

                    if (Array.isArray(value) && value.length === 0) {
                        return false;
                    }

                    return true;
                })
            );

            await api.patch(`/servidores/${employee?.id}`, payload)
            toast.success("Servidor atualizado com sucesso!");
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } catch (error) {
            console.log('Erro ao atualizar servidor:', error)
            toast.error("Não foi possível realizar a atualização");
        }
    }

    const handleChange = (index: number, field: string, value: string) => {
        setFormValues((prevData) => {
            const beneficiariosArray = prevData.beneficiarios || [];

            const updated = [...beneficiariosArray];
            updated[index] = {
                ...updated[index],
                [field]: value
            };

            return {
                ...prevData,
                beneficiarios: updated
            };
        });
    };

    const handleAddBeneficiario = () => {
        setFormValues((prevData) => ({
            ...prevData,
            beneficiarios: [
                ...(prevData.beneficiarios || []),
                { nome: '', parentesco: '', data_nascimento: '' }
            ]
        }));
    };

    return {
        handleSubmit,
        handleChange,
        handleAddBeneficiario,
        setFormValues,
        formValues
    }
}