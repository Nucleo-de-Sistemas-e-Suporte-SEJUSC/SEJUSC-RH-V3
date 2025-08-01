import React from "react"
import Header from "@/shared/Header"
import Input from "@/shared/Input"
import Button from "@/shared/Button"
import type { IEstagiario, IServidor } from "@/feature/Frequencia/interfaces"
import { api } from "@/api/axios"

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

    const filterServidores = (): IServidor[] | undefined => {
        if (employees.servidores) {
            let filteredListOfServidores = employees.servidores

            if (search) {
                filteredListOfServidores = filteredListOfServidores?.filter((servidor) => {
                    return servidor.nome.includes(search)
                })
            }
            return filteredListOfServidores
        }
    }

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
            <div className="grid grid-cols-3 gap-4 max-h-[624px] overflow-y-scroll rounded">
                {filterServidores()?.map(({ nome, setor }) => (
                    <div className="flex flex-col gap-2.5 bg-gray-100 text-slate-900 p-3 rounded">
                        <div>
                            <h3 className="text-2xl font-medium">{nome}</h3>
                            <p className="text-lg text-slate-700">{setor}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                className="rounded-full text-sm text-sky-950 border-sky-950 border-2 px-4 py-1.5 cursor-pointer tracking-wider font-bold uppercase hover:text-sky-100 hover:bg-sky-950 ease-in duration-200"
                            >
                                Arquivar
                            </Button>
                            <Button
                                className="rounded-full text-sm text-sky-950 border-sky-950 border-2 px-4 py-1.5 cursor-pointer tracking-wider font-bold uppercase hover:text-sky-100 hover:bg-sky-950 ease-in duration-200"
                            >
                                Atualizar
                            </Button>
                            <Button
                                className="rounded-full text-sm text-sky-950 border-sky-950 border-2 px-4 py-1.5 cursor-pointer tracking-wider font-bold uppercase hover:text-sky-100 hover:bg-sky-950 ease-in duration-200"
                            >
                                Anexar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}