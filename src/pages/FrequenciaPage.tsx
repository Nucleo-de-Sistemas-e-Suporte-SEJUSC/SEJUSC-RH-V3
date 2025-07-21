import React from "react"
import Header from "@/feature/Frequencia/components/Header"
import { api } from "@/api/axios"
import { Square } from "lucide-react"

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
    })
    const { checkbox } = filterOptions
    const [requestState, setRequestState] = React.useState<{
        setores: Setor[] | null
        loading: boolean | null
        error: boolean | null
    }>({
        setores: null,
        loading: true,
        error: null
    })
    const { setores, loading } = requestState

    React.useEffect(() => {
        const fetchListOfSetores = async () => {
            try {
                const response = await api.get('/buscar_setor')
                const { setores } = response.data

                setRequestState((prevState) => ({
                    ...prevState,
                    setores: [...setores],
                    loading: false,
                }))
            } catch (error) {
                setRequestState((prevState) => ({
                    ...prevState,
                    loading: false,
                }))
            }
        }
        fetchListOfSetores()
    }, [])

    if (loading) return <p className="text-2xl ">Buscando setores...</p>

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

            <div className="rounded overflow-x-hidden shadow-md">
                <table className="text-center text-slate-700 w-full table-fixed">
                    <thead className="bg-sky-950 text-slate-200 uppercase text-xl tracking-wider">
                        <tr className="*:px-2 *:py-2">
                            <th scope="col">Setor</th>
                            <th scope="col">Funcionários</th>
                            <th scope="col">Selecionar</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-100 divide-y divide-gray-300">
                        {setores?.map(({ id, setor, quantidade }) => (
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
                    </tbody>
                </table>
            </div>
        </main>
    )
}