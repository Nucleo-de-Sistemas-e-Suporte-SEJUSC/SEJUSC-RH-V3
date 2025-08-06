import type { IEstagiario } from "@/feature/Frequencia/interfaces";
import type { User } from "@/interfaces";
import { api } from "@/api/axios";
import { toast } from "sonner";

export default function useListOfEstagiarios(
    estagiarios: IEstagiario[] | null,
    search: string,
    setIsLoading: React.Dispatch<React.SetStateAction<{ id: number | null, load: boolean, action: string | null }>>
) {
    const storedUser = JSON.parse(localStorage.getItem('user')!) as User

    const filterEstagiarios = (): IEstagiario[] | undefined => {
        if (estagiarios) {
            let filteredListOfEstagiarios = estagiarios

            if (search) {
                filteredListOfEstagiarios = filteredListOfEstagiarios?.filter((estagiario) => {
                    return estagiario.nome.includes(search)
                })
            }
            return filteredListOfEstagiarios
        }
    }

    const historyLogsArchive = async (user: string, nome: string, setor: string) => {
        try {
            await api.post("/historico-logs", {
                mensagem: `O usuario de nome ${user} arquivou o estagiário ${nome} do setor ${setor}`,
                nome: nome,
                acao: "Arquivar"
            })
        } catch (error) {
            console.log('Erro ao criar o log', error)
        }
    }

    const handleArchiveEstagiario = async (id: number) => {
        try {
            setIsLoading({ id: id, load: true, action: 'arquivar' })

            const response = await api.patch(`/estagiarios/${id}/arquivar`)
            const { estagiario_arquivado } = await response.data as { mensagem: string, estagiario_arquivado: { nome: string, setor: string } }

            await historyLogsArchive(storedUser.nome, estagiario_arquivado.nome, estagiario_arquivado.setor)

            toast.success('Estagiário arquivado com sucesso')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } catch (error) {
            console.error("Error ao arquivar estagiário", error)
            toast.error('Não foi possível arquivar o estagiário')
        } finally {
            setIsLoading({ id: null, load: false, action: null })
        }
    }

    const historyLogsUnarchive = async (user: string, nome: string, setor: string) => {
        try {
            await api.post("/historico-logs", {
                mensagem: `O usuario de nome ${user} desarquivou o estagiário ${nome} do setor ${setor}`,
                nome: nome,
                acao: "Desarquivar"
            })
        } catch (error) {
            console.log('Erro ao criar o log', error)
        }
    }

    const handleActiveEstagiario = async (id: number) => {
        try {
            setIsLoading({ id: id, load: true, action: 'desarquivar' })

            const response = await api.patch(`/estagiarios/${id}/atualizar-status`)
            const { estagiario_ativado } = response.data as { mensagem: string, estagiario_ativado: { nome: string, setor: string } }

            await historyLogsUnarchive(storedUser.nome, estagiario_ativado.nome, estagiario_ativado.setor)

            toast.success('Estagiário desarquivado com sucesso')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } catch (error) {
            console.error("Error ao desarquivar estagiário", error)
            toast.error('Não foi possível desarquivar o estagiário')
        } finally {
            setIsLoading({ id: null, load: false, action: null })
        }
    }

    return {
        handleArchiveEstagiario,
        handleActiveEstagiario,
        filterEstagiarios
    }
}