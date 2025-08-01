import React from "react"
import Header from "@/shared/Header"
import ListOfServidores from "@/feature/Funcionarios/components/ListOfServidores"
import ListOfEstagiarios from "@/feature/Funcionarios/components/ListOfEstagiarios"
import FilterFields from "@/feature/Funcionarios/components/FilterFields"
import type { IEstagiario, IServidor } from "@/feature/Frequencia/interfaces"
import { api } from "@/api/axios"

export default function FuncionariosPage() {
    const [selectedEmployee, setSelectedEmployee] = React.useState('servidores')
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
            <Header
                label='Lista de Funcionários'
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
            />
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
        </main>
    )
}