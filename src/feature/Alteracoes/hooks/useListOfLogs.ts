import React from "react"
import type { IHistorico } from "../interfaces"
import { api } from "@/api/axios"

export default function useListOfLogs(checkbox: string, search: string) {
    const [logs, setLogs] = React.useState<IHistorico[] | null>(null)

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

    const formatedDate = (data_criacao: string) => {
        if (!data_criacao) {
            return '';
        }

        const dataObjeto = new Date(data_criacao);

        const dia = String(dataObjeto.getUTCDate()).padStart(2, '0');
        const mes = String(dataObjeto.getUTCMonth() + 1).padStart(2, '0');
        const ano = dataObjeto.getUTCFullYear();

        return `${dia}/${mes}/${ano}`
    };

    return {
        filterLogs,
        formatedDate
    }
}