import React from "react"
import Header from "@/feature/Frequencia/components/Header"
import { api } from "@/api/axios"
import { Square, SquareCheck } from "lucide-react"
import FilterFields from "@/feature/Frequencia/components/FilterFields"
import { listOfMonths } from "@/feature/constants"
import type { IFilterOptions } from "@/interfaces"
import { toast } from "sonner"

interface SetorServidor {
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

interface Estagiario {
    id: number
    nome: string
    setor: string
}

interface SetorEstagiario {
    id: number
    lotacao: string
    quantidade: number
}

export default function FrequenciaPage() {
    const data = new Date()
    const actualMonth = data.getMonth()

    const [selectedSetores, setSelectedSetores] = React.useState<SetorServidor[]>([])

    const [selectedEmployee, setSelectedEmployee] = React.useState('servidores')
    const [filterOptions, setFilterOptions] = React.useState<IFilterOptions>({
        checkbox: 'setores',
        search: '',
        month: listOfMonths[actualMonth]
    })
    const { checkbox, search } = filterOptions

    const [servidor, setServidor] = React.useState<{
        setores: SetorServidor[] | null,
        servidores: Servidor[] | null
    }>({
        setores: null,
        servidores: null
    })

    const [estagiario, setEstagiario] = React.useState<{
        setores: SetorEstagiario[] | null,
        estagiarios: Estagiario[] | null
    }>({
        setores: null,
        estagiarios: null
    })

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedEmployee === 'servidores') {
                    const [setoresRes, servidoresRes] = await Promise.all([
                        api.get('/buscar_setor'),
                        api.get('/servidores')
                    ])
                    setServidor((prev) => ({
                        ...prev,
                        setores: [...setoresRes.data.setores],
                        servidores: [...servidoresRes.data.servidores]
                    }))
                }

                if (selectedEmployee === 'estagiarios') {
                    const [setoresRes, estagiariosRes] = await Promise.all([
                        api.get('/setor/estagiarios'),
                        api.get('/estagiarios'),
                    ])
                    setEstagiario((prev) => ({
                        ...prev,
                        setores: [...setoresRes.data.setores],
                        estagiarios: estagiariosRes.data.estagiarios
                    }))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [selectedEmployee])

    React.useEffect(() => {
        const resetCheckbox = () => {
            setFilterOptions((prevFilters) => ({
                ...prevFilters,
                checkbox: 'setores'
            }))
        }
        resetCheckbox()
    }, [selectedEmployee])

    const listOfSetores = (setor: SetorServidor) => {
        const isSetorAlreadySelected = selectedSetores.some(({ id }) => id === setor.id)

        if (isSetorAlreadySelected) {
            setSelectedSetores((prevSetores) =>
                prevSetores.filter(({ id }) => id !== setor.id)
            )
            return
        }

        setSelectedSetores((prevSetores) => {
            if (prevSetores.length >= 10) {
                toast.warning('Máximo permitido é 10 setores ou funcionários selecionados')
                return [...prevSetores.slice(1), setor]
            }

            return [...prevSetores, setor]
        })
    }

    const filterSetoresServidor = (): SetorServidor[] | undefined => {
        if (servidor.setores) {
            let filteredListOfSetores = servidor.setores

            if (search) {
                filteredListOfSetores = filteredListOfSetores?.filter((setor) => {
                    return setor.setor.includes(search)
                })
            }
            return filteredListOfSetores
        }
    }

    const filterSetoresEstagiario = (): SetorEstagiario[] | undefined => {
        if (estagiario.setores) {
            let filteredListOfSetores = estagiario.setores

            if (search) {
                filteredListOfSetores = filteredListOfSetores?.filter((setor) => {
                    return setor.lotacao.includes(search)
                })
            }
            return filteredListOfSetores
        }
    }

    const filterServidores = (): Servidor[] | undefined => {
        if (servidor.servidores) {
            let filteredListOfServidores = servidor.servidores

            if (search) {
                filteredListOfServidores = filteredListOfServidores?.filter((servidor) => {
                    return servidor.nome.includes(search)
                })
            }
            return filteredListOfServidores
        }
    }

    const filterEstagiario = (): Estagiario[] | undefined => {
        if (estagiario.estagiarios) {
            let filteredListOfServidores = estagiario.estagiarios

            if (search) {
                filteredListOfServidores = filteredListOfServidores?.filter((estagiario) => {
                    return estagiario.nome.includes(search)
                })
            }
            return filteredListOfServidores
        }
    }

    return (
        <main className="flex flex-col gap-5 py-5 max-h-[842px] pr-10">
            <Header
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
            />

            <FilterFields
                selectedEmployee={selectedEmployee}
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
            />

            <div className="rounded overflow-x-hidden shadow-md">
                <table className="text-center text-slate-700 w-full table-fixed">
                    {(selectedEmployee === 'servidores' && checkbox === 'setores') && (
                        <thead className="bg-sky-950 text-slate-200 uppercase text-xl tracking-wider">
                            <tr className="*:px-2 *:py-2">
                                <th scope="col">Setor</th>
                                <th scope="col">Funcionários</th>
                                <th scope="col">Selecionar</th>
                            </tr>
                        </thead>
                    )}
                    {(selectedEmployee === 'servidores' && checkbox === 'servidores') && (
                        <thead className="bg-sky-950 text-slate-200 uppercase text-xl tracking-wider">
                            <tr className="*:px-2 *:py-2">
                                <th scope="col">Nome</th>
                                <th scope="col">Cargo</th>
                                <th scope="col">Setor</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                    )}

                    {(selectedEmployee === 'estagiarios' && checkbox === 'setores') && (
                        <thead className="bg-sky-950 text-slate-200 uppercase text-xl tracking-wider">
                            <tr className="*:px-2 *:py-2">
                                <th scope="col">Setor</th>
                                <th scope="col">Funcionários</th>
                                <th scope="col">Selecionar</th>
                            </tr>
                        </thead>
                    )}
                    {(selectedEmployee === 'estagiarios' && checkbox === 'estagiarios') && (
                        <thead className="bg-sky-950 text-slate-200 uppercase text-xl tracking-wider">
                            <tr className="*:px-2 *:py-2">
                                <th scope="col">Nome</th>
                                <th scope="col">Setor</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                    )}

                    <tbody className="bg-slate-100 divide-y divide-gray-300">
                        {(selectedEmployee === 'servidores' && checkbox === 'setores') && filterSetoresServidor()?.map((setor) => (
                            <tr key={setor.id} className="*:px-6 *:py-4 *:text-lg">
                                <td className="max-w-[120px] truncate whitespace-nowrap overflow-hidden" title={setor.setor}>
                                    {setor.setor}
                                </td>
                                <td>{setor.quantidade}</td>
                                <td className="flex justify-center">
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => listOfSetores(setor)}
                                    >
                                        {selectedSetores.some(({ id }) => id === setor.id) ? <SquareCheck /> : <Square />}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {(selectedEmployee === 'servidores' && checkbox === 'servidores') && filterServidores()?.map(({ id, cargo, nome, setor }) => (
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

                        {(selectedEmployee === 'estagiarios' && checkbox === 'setores') && filterSetoresEstagiario()?.map(({ id, lotacao, quantidade }) => (
                            <tr key={id} className="*:px-6 *:py-4 *:text-lg">
                                <td className="max-w-[120px] truncate whitespace-nowrap overflow-hidden" title={lotacao}>
                                    {lotacao}
                                </td>
                                <td>{quantidade}</td>
                                <td className="flex justify-center">
                                    <Square />
                                </td>
                            </tr>
                        ))}
                        {(selectedEmployee === 'estagiarios' && checkbox === 'estagiarios') && filterEstagiario()?.map(({ id, nome, setor }) => (
                            <tr key={id} className="*:px-6 *:py-4 *:text-lg">
                                <td>{nome}</td>
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