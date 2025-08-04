import type { User } from "@/interfaces"
import type { IServidor } from "@/feature/Frequencia/interfaces"
import { toast } from "sonner"
import { api } from "@/api/axios"

export default function useListOfServidores(
    servidores: IServidor[] | null, 
    search: string, 
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
    const storedUser = JSON.parse(localStorage.getItem('user')!) as User

    const filterServidores = (): IServidor[] | undefined => {
        if (servidores) {
            let filteredListOfServidores = servidores

            if (search) {
                filteredListOfServidores = filteredListOfServidores?.filter((servidor) => {
                    return servidor.nome.includes(search)
                })
            }
            return filteredListOfServidores
        }
    }

    const historyLogsArchive = async (user: string, nome: string, setor: string) => {
        try {
            await api.post("/historico-logs", {
                mensagem: `O usuario de nome ${user} arquivou o servidor ${nome} do setor ${setor}`,
                nome: nome,
                acao: "Arquivar"
            })
        } catch (error) {
            console.log('Erro ao criar o log', error)
        }
    }

    const handleArchiveServidor = async (id: number) => {
        try {
            setIsLoading(true)

            const response = await api.patch(`/servidores/${id}/arquivar`)
            const { servidor_arquivado } = await response.data as { mensagem: string, servidor_arquivado: { nome: string, setor: string } }

            await historyLogsArchive(storedUser.nome, servidor_arquivado.nome, servidor_arquivado.setor)

            toast.success('Servidor arquivado com sucesso')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } catch (error) {
            console.error("Error ao arquivar servidor", error)
            toast.error('Não foi possível arquivar o servidor')
        } finally {
            setIsLoading(false)
        }
    }

    const historyLogsUnarchive = async (user: string, nome: string, setor: string) => {
        try {
            await api.post("/historico-logs", {
                mensagem: `O usuario de nome ${user} desarquivou o servidor ${nome} do setor ${setor}`,
                nome: nome,
                acao: "Desarquivar"
            })
        } catch (error) {
            console.log('Erro ao criar o log', error)
        }
    }

    const handleActiveServidor = async (id: number) => {
        try {
            setIsLoading(true)

            const response = await api.patch(`/servidores/${id}/atualizar-status`)
            const { servidor_ativado } = response.data as { mensagem: string, servidor_ativado: { nome: string, setor: string } }

            await historyLogsUnarchive(storedUser.nome, servidor_ativado.nome, servidor_ativado.setor)

            toast.success('Servidor desarquivado com sucesso')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } catch (error) {
            console.error("Error ao desarquivar servidor", error)
            toast.error('Não foi possível desarquivar o servidor')
        } finally {
            setIsLoading(false)
        }
    }

    return {
        handleActiveServidor,
        handleArchiveServidor,
        filterServidores
    }
}