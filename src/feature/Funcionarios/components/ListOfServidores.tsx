import React from "react";
import Button from "@/shared/Button";
import type { IServidor } from "@/feature/Frequencia/interfaces";
import { api } from "@/api/axios";
import { toast } from "sonner";
import type { User } from "@/interfaces";

type ListOfServidoresProps = {
    servidores: IServidor[] | null
    filterOptions: { checkbox: string, search: string }
}

export default function ListOfServidores({ servidores, filterOptions }: ListOfServidoresProps) {
    const storedUser = JSON.parse(localStorage.getItem('user')!) as User
    const [isLoading, setIsLoading] = React.useState(false)
    const { checkbox, search } = filterOptions

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

    return (
        <div className="grid grid-cols-3 gap-4 max-h-[624px] overflow-y-scroll rounded">
            {filterServidores()?.map(({ id, nome, setor }) => (
                <div key={id} className="flex flex-col justify-between gap-2.5 bg-gray-100 text-slate-900 p-3 rounded">
                    <div>
                        <h3 className="text-2xl font-medium">{nome}</h3>
                        <p className="text-lg text-slate-700">{setor}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            className="rounded-full text-sm text-sky-950 border-sky-950 border-2 px-4 py-1.5 cursor-pointer tracking-wider font-bold uppercase hover:text-sky-100 hover:bg-sky-950 ease-in duration-200"
                            onClick={() => {
                                if (checkbox === 'ativos') {
                                    handleArchiveServidor(id)
                                    return
                                }
                                handleActiveServidor(id)
                            }}
                        >
                            {checkbox === 'ativos' ? (
                                <p>{isLoading ? 'Arquivando' : 'Arquivar'}</p>
                            ) : (
                                <p>{isLoading ? 'Desarquivando' : 'Desarquivar'}</p>
                            )}
                        </Button>

                        {checkbox === 'ativos' && (
                            <>
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
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}