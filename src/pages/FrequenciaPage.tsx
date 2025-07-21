import React from "react"
import Header from "@/feature/Frequencia/components/Header"
import { api } from "@/api/axios"
import { Square } from "lucide-react"
import Input from "@/shared/Input"

interface Setor {
    id: number
    quantidade: number
    setor: string
}

interface Servidor {
    id: number
    cargo: string
    nome: string
    setor: string
}

export default function FrequenciaPage() {
    const [selectedEmployee, setSelectedEmployee] = React.useState('servidores')
    const [filterOptions, setFilterOptions] = React.useState({
        checkbox: 'setores',
        search: ''
    })
    const { checkbox, search } = filterOptions

    const [setor, setSetor] = React.useState<{
        setores: Setor[] | null
    }>({
        setores: null,
    })
    const { setores } = setor

    const [servidor, setServidor] = React.useState<{
        servidores: Servidor[] | null
    }>({
        servidores: null,
    })
    const { servidores } = servidor

    if (checkbox === 'setores') {
        React.useEffect(() => {
            const fetchListOfSetores = async () => {
                try {
                    const response = await api.get('/buscar_setor')
                    const { setores } = response.data

                    setSetor((prevState) => ({
                        ...prevState,
                        setores: [...setores],
                    }))
                } catch (error) {
                    console.log(error)
                }
            }
            fetchListOfSetores()
        }, [checkbox])
    }

    if (checkbox === 'servidores') {
        React.useEffect(() => {
            const fetchListOfServidores = async () => {
                try {
                    const response = await api.get('/servidores')
                    const { servidores } = response.data

                    setServidor((prevState) => ({
                        ...prevState,
                        servidores: [...servidores],
                    }))
                } catch (error) {
                    console.log(error)
                }
            }
            fetchListOfServidores()
        }, [checkbox])
    }

    const filterSetores = () => {
        let filteredListOfSetores: Setor[] | null | undefined = setores

        if (search) {
            filteredListOfSetores = filteredListOfSetores?.filter((setor) => {
                return setor.setor.includes(search)
            })
        } 
        
        return filteredListOfSetores
    }

    const filteredSetores = filterSetores()

    return (
        <main className="flex flex-col gap-5 py-5 max-w-[1200px] max-h-[900px]">
            <Header
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
            />

            <div className="flex justify-between bg-slate-300 py-4 px-2 rounded *:font-medium">
                <div>
                    <h3>Selecione o mês:</h3>
                </div>

                <div className="flex gap-6">
                    <div>
                        <label
                            className="flex flex-row-reverse items-center gap-2"
                        >
                            Setores
                            <input
                                type="radio"
                                name='filterOptions'
                                checked={checkbox === 'setores'}
                                value='setores'
                                onChange={({ currentTarget }) => setFilterOptions((prevFilters) => ({ ...prevFilters, checkbox: currentTarget.value }))}
                            />
                        </label>
                    </div>

                    <div>
                        <label
                            className="flex flex-row-reverse items-center gap-2"
                        >
                            Servidores
                            <input
                                type="radio"
                                name='filterOptions'
                                checked={checkbox === 'servidores'}
                                value='servidores'
                                onChange={({ currentTarget }) => setFilterOptions((prevFilters) => ({ ...prevFilters, checkbox: currentTarget.value }))}
                            />
                        </label>
                    </div>
                </div>
            </div>

            <Input
                id="search"
                placeholder="Pesquise por um Setor"
                value={search}
                onChange={({ currentTarget }) => setFilterOptions((prevFilters) => ({
                    ...prevFilters, search: currentTarget.value.toUpperCase()}
                ))}
            />

            <div className="rounded overflow-x-hidden shadow-md">
                <table className="text-center text-slate-700 w-full table-fixed">
                    {checkbox === 'setores' && (
                        <thead className="bg-sky-950 text-slate-200 uppercase text-xl tracking-wider">
                            <tr className="*:px-2 *:py-2">
                                <th scope="col">Setor</th>
                                <th scope="col">Funcionários</th>
                                <th scope="col">Selecionar</th>
                            </tr>
                        </thead>
                    )}

                    {checkbox === 'servidores' && (
                        <thead className="bg-sky-950 text-slate-200 uppercase text-xl tracking-wider">
                            <tr className="*:px-2 *:py-2">
                                <th scope="col">Nome</th>
                                <th scope="col">Cargo</th>
                                <th scope="col">Setor</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                    )}

                    <tbody className="bg-slate-100 divide-y divide-gray-300">
                        {checkbox === 'setores' && filteredSetores?.map(({ id, setor, quantidade }) => (
                            <tr key={id} className="*:px-6 *:py-4 *:text-lg">
                                <td className="max-w-[120px] truncate whitespace-nowrap overflow-hidden" title={setor}>
                                    {setor}
                                </td>
                                <td>{quantidade}</td>
                                <td className="flex justify-center">
                                    <Square />
                                </td>
                            </tr>
                        ))}

                        {checkbox === 'servidores' && servidores?.map(({ id, cargo, nome, setor }) => (
                            <tr key={id} className="*:px-6 *:py-4 *:text-lg">
                                <td>{nome}</td>
                                <td>{cargo}</td>
                                <td className="max-w-[120px] truncate whitespace-nowrap overflow-hidden" title={setor}>
                                    {setor}
                                </td>
                                <td className="flex justify-center">
                                    <Square />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}