import React from "react"
import Header from "@/shared/Header"
import ListOfServidores from "@/feature/Funcionarios/components/ListOfServidores"
import ListOfEstagiarios from "@/feature/Funcionarios/components/ListOfEstagiarios"
import FilterFields from "@/feature/Funcionarios/components/FilterFields"
import type { IEstagiario, IServidor } from "@/feature/Frequencia/interfaces"
import { api } from "@/api/axios"
import Button from "@/shared/Button"
import Input from "@/shared/Input"

export default function FuncionariosPage() {
    const [selectedEmployee, setSelectedEmployee] = React.useState('servidores')
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [filterOptions, setFilterOptions] = React.useState({
        checkbox: 'ativos',
        search: ''
    })
    const [archivedEmployees, setArchivedEmployees] = React.useState<{
        servidores: IServidor[] | null,
        estagiarios: IEstagiario[] | null
    }>({
        servidores: null,
        estagiarios: null
    })
    const [activeEmployees, setActiveEmployees] = React.useState<{
        servidores: IServidor[] | null,
        estagiarios: IEstagiario[] | null
    }>({
        servidores: null,
        estagiarios: null
    })
    const { checkbox } = filterOptions

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [servidoresRes, estagiariosRes] = await Promise.all([
                    api.get('/servidores'),
                    api.get('/estagiarios')
                ])
                setActiveEmployees((prev) => ({
                    ...prev,
                    servidores: [...servidoresRes.data.servidores],
                    estagiarios: [...estagiariosRes.data.estagiarios]
                }))
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedEmployee === 'servidores') {
                    const response = await api.get(`/${selectedEmployee}/arquivados`)
                    const employee = response.data[selectedEmployee]
                    setArchivedEmployees((prev) => ({
                        ...prev,
                        servidores: [...employee],
                    }))
                    return
                }
                const response = await api.get(`/${selectedEmployee}/arquivados`)
                const employee = response.data[selectedEmployee]
                setArchivedEmployees((prev) => ({
                    ...prev,
                    estagiarios: [...employee],
                }))
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [selectedEmployee])

    return (
        <main className="flex flex-col gap-5 py-5 pr-10">
            {isModalOpen ? (
                <div>
                    <h1 className="text-4xl text-sky-950 font-semibold pb-8">Criar Servidor</h1>
                    <form className="flex flex-col gap-4">
                        <Input
                            id="nome"
                            label="Nome Completo*"
                            placeholder="Yuri Odilon Nogueira Moura"
                        />
                        <div className="flex gap-4">
                            <Input
                                id="matricula"
                                label="Matrícula*"
                                placeholder="123.456-7 A"
                            />
                            <Input
                                id="cpf"
                                label="CPF*"
                                placeholder="123.456.789-01"
                            />
                            <Input
                                id="identidade"
                                label="Identidade*"
                            />
                            <Input
                                id="naturalidade"
                                label="Naturalidade*"
                                placeholder="Manaus/AM"
                            />
                            <Input
                                id="nacionalidade"
                                label="Nacionalidade*"
                                placeholder="Brasileira"
                            />
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="flex justify-between">
                        <Header
                            label='Lista de Funcionários'
                            selectedEmployee={selectedEmployee}
                            setSelectedEmployee={setSelectedEmployee}
                        />
                        <div className="self-center">
                            <Button
                                onClick={() => setIsModalOpen(true)}
                            >
                                {selectedEmployee === 'servidores' ? 'CRIAR SERVIDOR' : 'CRIAR ESTAGIÁRIO'}
                            </Button>
                        </div>
                    </div>
                    <FilterFields
                        selectedEmployee={selectedEmployee}
                        filterOptions={filterOptions}
                        setFilterOptions={setFilterOptions}
                    />

                    {selectedEmployee === 'servidores' ? (
                        <ListOfServidores
                            servidores={checkbox === 'ativos' ? activeEmployees.servidores : archivedEmployees.servidores}
                            filterOptions={filterOptions}
                        />
                    ) : (
                        <ListOfEstagiarios
                            estagiarios={checkbox === 'ativos' ? activeEmployees.estagiarios : archivedEmployees.estagiarios}
                            filterOptions={filterOptions}
                        />
                    )}
                </>
            )}
        </main>
    )
}