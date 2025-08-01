import React from "react"
import Header from "@/shared/Header"
import Input from "@/shared/Input"
import type { IEstagiario, IServidor } from "@/feature/Frequencia/interfaces"
import { api } from "@/api/axios"
import ListOfServidores from "@/feature/Funcionarios/components/ListOfServidores"
import ListOfEstagiarios from "@/feature/Funcionarios/components/ListOfEstagiarios"

export default function FuncionariosPage() {
    const [selectedEmployee, setSelectedEmployee] = React.useState('servidores')
    const [search, setSearch] = React.useState('')
    const [employees, setEmployees] = React.useState<{
        servidores: IServidor[] | null,
        estagiarios: IEstagiario[] | null
    }>({
        servidores: null,
        estagiarios: null
    })

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [servidoresRes, estagiariosRes] = await Promise.all([
                    api.get('/servidores'),
                    api.get('/estagiarios')
                ])
                setEmployees((prev) => ({
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

    return (
        <main className="flex flex-col gap-5 py-5 pr-10">
            <Header
                label='Lista de Funcionários'
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
            />
            <Input
                id="search"
                placeholder={`Pesquise por um ${selectedEmployee === 'servidores' ? 'Servidor' : 'Estagiário'}`}
                value={search}
                onChange={({ currentTarget }) => setSearch(currentTarget.value.toUpperCase())}
            />
            {selectedEmployee === 'servidores' ? (
                <ListOfServidores
                    servidores={employees.servidores}
                    search={search}
                />
            ) : (
                <ListOfEstagiarios
                    estagiarios={employees.estagiarios}
                    search={search}
                />
            )}
        </main>
    )
}