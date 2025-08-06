import React from "react";
import Input from "@/shared/Input";
import { Select } from "@/shared/Select";
import Button from "@/shared/Button";
import { api } from "@/api/axios";
import { toast } from "sonner";
import type { IServidor } from "@/feature/Frequencia/interfaces";

type Entrada = '' | '08:00'
type Saida = '' | '14:00' | '17:00'

interface CreateServidor {
    nome: string
    setor: string
    cargo: string
    horario: string
    entrada: Entrada
    saida: Saida
}

type FormCreateEstagiarioProps = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<{employee: IServidor | null, modal: boolean}>>
}

export default function FormCreateEstagiario({ setIsModalOpen }: FormCreateEstagiarioProps) {
    const [formValues, setFormValues] = React.useState<CreateServidor>({
        nome: '',
        setor: '',
        cargo: '',
        horario: '',
        entrada: '',
        saida: '',
    })

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            await api.post('/estagiarios', {
                nome: formValues.nome,
                setor: formValues.setor,
                cargo: 'ESTAGIÁRIO',
                horario: `${formValues.entrada}-${formValues.saida}`,
                entrada: formValues.entrada,
                saida: formValues.saida
            })
            toast.success("Estagiário cadastrado com sucesso!");
            setFormValues({
                nome: '',
                setor: '',
                cargo: '',
                horario: '',
                entrada: '',
                saida: ''
            });
        } catch (error) {
            console.log('Erro ao cadastrar estagiário:', error)
            toast.error("Não foi possível realizar o cadastro");
        }
    }

    return (
        <div>
            <h1 className="text-4xl text-sky-950 font-semibold pb-8">Criar Estagiário</h1>
            <form className="flex flex-col gap-10">
                <div className="flex flex-col gap-6">
                    <Input
                        id="nome"
                        label="Nome Completo*"
                        placeholder="Yuri Odilon Nogueira Moura"
                        onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, nome: currentTarget.value.toUpperCase() }))}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex gap-4">
                            <div className="grow">
                                <Input
                                    id="setor"
                                    label="Setor*"
                                    placeholder='ASCOM'
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, setor: currentTarget.value.toUpperCase() }))}
                                />
                            </div>
                            <div className="grow">
                                <Input
                                    id="cargo"
                                    label="Cargo*"
                                    required
                                    defaultValue='Estagiário'
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="grow">
                                <Select
                                    id="entrada"
                                    label="Entrada*"
                                    optionLabel='selecione uma opção'
                                    options={[
                                        { label: '08:00', value: '08:00' },
                                        { label: '11:00', value: '11:00' },
                                    ]}
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, entrada: currentTarget.value as Entrada }))}
                                />
                            </div>
                            <div className="grow">
                                <Select
                                    id="saida"
                                    label="Saida*"
                                    optionLabel='selecione uma opção'
                                    options={[
                                        { label: '14:00', value: '14:00' },
                                        { label: '17:00', value: '17:00' },
                                    ]}
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, saida: currentTarget.value as Saida }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button
                        onClick={handleSubmit}
                    >
                        Cadastrar Estagiário
                    </Button>
                    <Button
                        onClick={() => setIsModalOpen({employee: null, modal: false})}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    )
}