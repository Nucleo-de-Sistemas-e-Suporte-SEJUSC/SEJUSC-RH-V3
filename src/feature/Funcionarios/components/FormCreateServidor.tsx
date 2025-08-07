import React from "react";
import Input from "@/shared/Input";
import { Select } from "@/shared/Select";
import Button from "@/shared/Button";
import { api } from "@/api/axios";
import { toast } from "sonner";
import type { IServidor } from "@/interfaces";

type Entrada = '' | '08:00'
type Saida = '' | '14:00' | '17:00'
type Sexo = '' | 'MASCULINO' | 'FEMININO' | 'OUTRO'
type EstadoCivil = '' | 'SOLTEIRO' | 'CASADO' | 'DIVORCIADO' | 'VIUVO'

type FormCreateServidorProps = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<{employee: IServidor | null, modal: boolean}>>
}

export default function FormCreateServidor({ setIsModalOpen }: FormCreateServidorProps) {
    const [formValues, setFormValues] = React.useState<IServidor>({
        nome: '',
        setor: '',
        matricula: '',
        cargo: '',
        horario: '',
        horarioentrada: '',
        horariosaida: '',
        data_nascimento: '',
        sexo: '',
        estado_civil: '',
        naturalidade: '',
        nacionalidade: '',
        identidade: '',
        titulo_eleitor: '',
        cpf: '',
        pis: '',
        data_admissao: '',
        endereco: '',
        nome_pai: '',
        nome_mae: '',
        servico_militar: '',
        carteira_profissional: '',
        data_posse: ''
    })

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            await api.post('/criar/servidores', {
                nome: formValues.nome,
                setor: formValues.setor,
                matricula: formValues.matricula,
                cargo: formValues.cargo,
                horario: `${formValues.horarioentrada}-${formValues.horariosaida}`,
                entrada: formValues.horarioentrada,
                saida: formValues.horariosaida,
                data_nascimento: formValues.data_nascimento,
                sexo: formValues.sexo,
                estado_civil: formValues.estado_civil,
                naturalidade: formValues.naturalidade,
                nacionalidade: formValues.nacionalidade,
                identidade: formValues.identidade,
                titulo_eleitor: formValues.titulo_eleitor,
                cpf: formValues.cpf,
                pis: formValues.pis,
                data_admissao: formValues.data_admissao,
                endereco: formValues.endereco,
                nome_pai: formValues.nome_pai,
                nome_mae: formValues.nome_mae,
                servico_militar: formValues.servico_militar,
                carteira_profissional: formValues.carteira_profissional,
                data_posse: formValues.data_posse
            })
            toast.success("Servidor cadastrado com sucesso!");
            setFormValues({
                nome: '',
                setor: '',
                matricula: '',
                cargo: '',
                horario: '',
                horarioentrada: '',
                horariosaida: '',
                data_nascimento: '',
                sexo: '',
                estado_civil: '',
                naturalidade: '',
                nacionalidade: '',
                identidade: '',
                titulo_eleitor: '',
                cpf: '',
                pis: '',
                data_admissao: '',
                endereco: '',
                nome_pai: '',
                nome_mae: '',
                servico_militar: '',
                carteira_profissional: '',
                data_posse: ''
            });
        } catch (error) {
            console.log('Erro ao cadastrar servidor:', error)
            toast.error("Não foi possível realizar o cadastro");
        }
    }

    return (
        <div>
            <h1 className="text-4xl text-sky-950 font-semibold pb-8">Criar Servidor</h1>
            <form className="flex flex-col gap-10">
                <div className="flex flex-col gap-6">
                    <Input
                        id="nome"
                        label="Nome Completo*"
                        placeholder="Yuri Odilon Nogueira Moura"
                        onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, nome: currentTarget.value.toUpperCase() }))}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-4">
                            <div className="grow">
                                <Input
                                    id="matricula"
                                    label="Matrícula"
                                    placeholder="123.456-7 A"
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, matricula: currentTarget.value }))}
                                />
                            </div>
                            <div className="grow">
                                <Input
                                    id="cpf"
                                    label="CPF*"
                                    placeholder="123.456.789-01"
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, cpf: currentTarget.value }))}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="grow">
                                <Input
                                    id="identidade"
                                    label="Identidade*"
                                    placeholder='1234567-8'
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, identidade: currentTarget.value.toUpperCase() }))}
                                />
                            </div>
                            <div className="grow">
                                <Input
                                    id="naturalidade"
                                    label="Naturalidade*"
                                    placeholder="Manaus/AM"
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, naturalidade: currentTarget.value.toUpperCase() }))}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-4">
                            <div className="grow">
                                <Input
                                    id="nacionalidade"
                                    label="Nacionalidade*"
                                    placeholder="Brasileira"
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, nacionalidade: currentTarget.value }))}
                                />
                            </div>
                            <div className="grow">
                                <Input
                                    id="carteira_profissional"
                                    label="Carteira Profissional*"
                                    placeholder='123456/AM'
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, carteira_profissional: currentTarget.value }))}
                                />

                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="grow">
                                <Select
                                    id="sexo"
                                    label="Sexo*"
                                    optionLabel='selecione uma opção'
                                    options={[
                                        { label: 'MASCULINO', value: 'MASCULINO' },
                                        { label: 'FEMININO', value: 'FEMININO' },
                                        { label: 'OUTRO', value: 'OUTRO' }
                                    ]}
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, sexo: currentTarget.value as Sexo }))}
                                />
                            </div>
                            <div className="grow">
                                <Select
                                    id="estado_civil"
                                    label="Estado Civil*"
                                    optionLabel='selecione uma opção'
                                    options={[
                                        { label: 'SOLTEIRO', value: 'solteiro' },
                                        { label: 'CASADO', value: 'casado' },
                                        { label: 'DIVORCIADO', value: 'divorcido' },
                                        { label: 'VIUVO', value: 'viuvo' },
                                    ]}
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, estado_civil: currentTarget.value as EstadoCivil }))}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex gap-4">
                            <div className="grow">
                                <Input
                                    id="titulo_eleitor"
                                    label="Título de Eleitor*"
                                    placeholder='123456789012'
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, titulo_eleitor: currentTarget.value }))}
                                />
                            </div>
                            <div className="grow">
                                <Input
                                    id="setor"
                                    label="Setor*"
                                    placeholder='ASCOM'
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, setor: currentTarget.value.toUpperCase() }))}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="grow">
                                <Select
                                    id="horarioentrada"
                                    label="Entrada*"
                                    optionLabel='selecione uma opção'
                                    options={[
                                        { label: '08:00', value: '08:00' },
                                    ]}
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, horarioentrada: currentTarget.value as Entrada }))}
                                />
                            </div>
                            <div className="grow">
                                <Select
                                    id="horariosaida"
                                    label="Saida*"
                                    optionLabel='selecione uma opção'
                                    options={[
                                        { label: '14:00', value: '14:00' },
                                        { label: '17:00', value: '17:00' },
                                    ]}
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, horariosaida: currentTarget.value as Saida }))}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex gap-4">
                            <div className="grow">
                                <Input
                                    id="data_nascimento"
                                    label="Data do Nascimento*"
                                    type="date"
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, data_nascimento: currentTarget.value }))}
                                />
                            </div>
                            <div className="grow">
                                <Input
                                    id="data_admissao"
                                    label="Data de Admissao*"
                                    type="date"
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, data_admissao: currentTarget.value }))}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="grow">
                                <Input
                                    id="endereco"
                                    label="Endereço*"
                                    placeholder="Avenida dos Testes, 456, Bairro da Interface, São Paulo-SP"
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, endereco: currentTarget.value }))}
                                />
                            </div>
                            <div className="grow">
                                <Input
                                    id="nome_pai"
                                    label="Nome do Pai"
                                    placeholder="José Alves Neto"
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, nome_pai: currentTarget.value.toUpperCase() }))}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex gap-4">
                            <div className="grow">
                                <Input
                                    id="nome_mae"
                                    label="Nome da Mãe*"
                                    placeholder='Francisca Marlene'
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, nome_mae: currentTarget.value.toUpperCase() }))}
                                />
                            </div>
                            <div className="grow">
                                <Input
                                    id="servico_militar"
                                    label="Serviço Militar"
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, servico_militar: currentTarget.value }))}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="grow">
                                <Input
                                    id="cargo"
                                    label="Cargo*"
                                    placeholder='Assessor I'
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, cargo: currentTarget.value.toUpperCase() }))}
                                />
                            </div>
                            <div className="grow">
                                <Input
                                    id="data_posse"
                                    label="Data da Posse"
                                    type="date"
                                    required
                                    onChange={({ currentTarget }) => setFormValues((prevValues) => ({ ...prevValues, data_posse: currentTarget.value }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button
                        onClick={handleSubmit}
                    >
                        Cadastrar Servidor
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