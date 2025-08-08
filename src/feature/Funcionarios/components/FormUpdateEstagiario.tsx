import React from "react";
import Input from "@/shared/Input";
import { Select } from "@/shared/Select";
import Button from "@/shared/Button";
import type { IEstagiario, IServidor } from "@/interfaces";
import useFormUpdateEstagiaro from "../hooks/useFormUpdateEstagiaro";

type Entrada = '' | '08:00' | '11:00'
type Saida = '' | '14:00' | '17:00'

type FormUpdateEstagiarioProps = {
    isModalOpen: {
        servidor: IServidor | null,
        estagiario: IEstagiario | null,
        modal: boolean
    }
    setIsModalOpen: React.Dispatch<React.SetStateAction<{
        servidor: IServidor | null,
        estagiario: IEstagiario | null,
        modal: boolean,
        action: string | null
    }>>
}

export default function FormUpdateEstagiario({ isModalOpen, setIsModalOpen }: FormUpdateEstagiarioProps) {
    const { estagiario } = isModalOpen

    const {
        handleSubmit,
        setFormValues,
        formValues
    } = useFormUpdateEstagiaro(estagiario)

    return (
        <div>
            <h1 className="text-4xl text-sky-950 font-semibold pb-8">Atualizar Estagiário</h1>
            <form className="flex flex-col gap-10">
                <div className="flex flex-col gap-6">
                    <Input
                        id="nome"
                        label="Nome Completo*"
                        placeholder="Yuri Odilon Nogueira Moura"
                        value={formValues.nome}
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
                                    value={formValues.setor}
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
                                    value={formValues.horario_entrada}
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, horario_entrada: currentTarget.value as Entrada }))}
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
                                    value={formValues.horario_saida}
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, horario_saida: currentTarget.value as Saida }))}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex gap-4">
                            <div className="grow">
                                <Input
                                    id="Férias InÍcio"
                                    label="Data do Nascimento*"
                                    type="date"
                                    required
                                    value={formValues.feriasinicio}
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, feriasinicio: currentTarget.value }))}
                                />
                            </div>
                            <div className="grow">
                                <Input
                                    id="Férias Final"
                                    label="Data do Nascimento*"
                                    type="date"
                                    required
                                    value={formValues.feriasfinal}
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, feriasfinal: currentTarget.value }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button
                        onClick={handleSubmit}
                    >
                        Atualizar Estagiário
                    </Button>
                    <Button
                        onClick={() => setIsModalOpen({ servidor: null, estagiario: null, modal: false, action: null })}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    )
}