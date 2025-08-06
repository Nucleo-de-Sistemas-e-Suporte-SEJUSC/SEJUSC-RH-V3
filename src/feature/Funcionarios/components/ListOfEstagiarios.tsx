import React from "react";
import Button from "@/shared/Button";
import type { IEstagiario } from "@/feature/Frequencia/interfaces";
import useListOfEstagiarios from "../hooks/useListOfEstagiarios";

type ListOfEstagiariosProps = {
    estagiarios: IEstagiario[] | null
    filterOptions: { checkbox: string, search: string }
}

export default function ListOfEstagiarios({ estagiarios, filterOptions }: ListOfEstagiariosProps) {
    const { checkbox, search } = filterOptions
    const [isLoading, setIsLoading] = React.useState<{ id: number | null, load: boolean, action: string | null }>({
        id: null,
        load: false,
        action: null
    })

    const {
        handleArchiveEstagiario,
        handleActiveEstagiario,
        filterEstagiarios
    } = useListOfEstagiarios(estagiarios, search, setIsLoading)

    return (
        <div className="grid grid-cols-3 gap-4 max-h-[624px] overflow-y-scroll rounded">
            {filterEstagiarios()?.map(({ id, nome, setor }) => (
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
                                    handleArchiveEstagiario(id)
                                    return
                                }
                                handleActiveEstagiario(id)
                            }}
                        >
                            {checkbox === 'ativos' ? (
                                <p>{(isLoading.load && isLoading.id === id && isLoading.action === 'arquivar') ? 'Arquivando' : 'Arquivar'}</p>
                            ) : (
                                <p>{(isLoading.load && isLoading.id === id && isLoading.action === 'desarquivar') ? 'Desarquivando' : 'Desarquivar'}</p>
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