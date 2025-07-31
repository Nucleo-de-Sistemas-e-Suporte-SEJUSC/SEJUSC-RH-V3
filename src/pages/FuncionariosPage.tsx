import React from "react"
import Header from "@/shared/Header"
import Input from "@/shared/Input"

export default function FuncionariosPage() {
    const [selectedEmployee, setSelectedEmployee] = React.useState('servidores')
    const [search, setSearch] = React.useState('')

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
                onChange={({ currentTarget }) => setSearch(currentTarget.value)}
            />
        </main>
    )
}