import Input from "@/shared/Input";
import { Select } from "@/shared/Select";

export default function FormCreateServidor() {
    return (
        <div>
            <h1 className="text-4xl text-sky-950 font-semibold pb-8">Criar Servidor</h1>
            <form className="flex flex-col gap-6">
                <Input
                    id="nome"
                    label="Nome Completo*"
                    placeholder="Yuri Odilon Nogueira Moura"
                />
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="grow">
                            <Input
                                id="matricula"
                                label="Matrícula"
                                placeholder="123.456-7 A"
                            />
                        </div>
                        <div className="grow">
                            <Input
                                id="cpf"
                                label="CPF*"
                                placeholder="123.456.789-01"
                                required
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
                            />
                        </div>
                        <div className="grow">
                            <Input
                                id="naturalidade"
                                label="Naturalidade*"
                                placeholder="Manaus/AM"
                                required
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
                            />
                        </div>
                        <div className="grow">
                            <Input
                                id="carteiraProfissional"
                                label="Carteira Profissional*"
                                placeholder='123456/AM'
                                required
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
                            />
                        </div>
                        <div className="grow">
                            <Input
                                id="setor"
                                label="Setor*"
                                placeholder='ASCOM'
                                required
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
                                ]}
                                required
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
                            />
                        </div>
                        <div className="grow">
                            <Input
                                id="data_admissao"
                                label="Data de Admissao*"
                                type="date"
                                required
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
                            />
                        </div>
                        <div className="grow">
                            <Input
                                id="nome_pai"
                                label="Nome do Pai"
                                placeholder="José Alves Neto"
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
                            />
                        </div>
                        <div className="grow">
                            <Input
                                id="servicoMilitar"
                                label="Serviço Militar"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="grow">
                            <Input
                                id="vencimentoOuSalario"
                                label="Vencimento ou Salário*"
                                placeholder='2400'
                            />
                        </div>
                        <div className="grow">
                            <Input
                                id="data_posse"
                                label="Data da Posse"
                                type="date"
                                required
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}