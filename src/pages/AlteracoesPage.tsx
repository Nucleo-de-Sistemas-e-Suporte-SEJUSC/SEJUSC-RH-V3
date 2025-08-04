import React from "react";
import { api } from "@/api/axios";
import FilterFields from "@/feature/Alteracoes/components/FilterFields";

interface IHistorico {
    id: number
    nome: string
    mensagem: string
    acao: string
    data_criacao: string
}

export default function AlteracoesPage() {
    const [logs, setLogs] = React.useState<IHistorico[] | null>(null)
    const [filterOptions, setFilterOptions] = React.useState({
        checkbox: 'Arquivar',
        search: ''
    })
    const { checkbox, search } = filterOptions

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/historico-logs')
                setLogs(response.data.historico)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const filterLogs = (): IHistorico[] | undefined => {
        if (logs) {
            let filteredListOfLogs = logs

            if (checkbox) {
                filteredListOfLogs = filteredListOfLogs?.filter((log) => {
                    return log.acao === checkbox
                })
            }

            if (search) {
                filteredListOfLogs = filteredListOfLogs?.filter((log) => {
                    return log.mensagem.includes(search)
                })
            }

            return filteredListOfLogs
        }
    }

    return (
        <main className="flex flex-col gap-5 py-5 pr-10 max-h-[824px]">
            <h1 className="text-4xl text-sky-950 font-semibold pb-8">Histórico de Alterações</h1>
            <FilterFields
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
            />
            <section className="flex flex-col gap-4 bg-gray-100 p-4 overflow-y-scroll rounded">
                {filterLogs()?.map(({ id, mensagem }) => (
                    <div className="bg-slate-300 p-3 rounded" key={id}>
                        <p className="font-medium text-lg">
                            {mensagem}
                        </p>
                    </div>
                ))}
            </section>
        </main>
    )
}