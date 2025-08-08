import React from "react";
import Button from "@/shared/Button";
import useListOfEstagiarios from "../hooks/useListOfEstagiarios";
import type { IEstagiario, IServidor } from "@/interfaces";

type ListOfEstagiariosProps = {
    estagiarios: IEstagiario[] | null
    filterOptions: { checkbox: string, search: string }
    setIsModalOpen: React.Dispatch<React.SetStateAction<{
        servidor: IServidor | null,
        estagiario: IEstagiario | null,
        modal: boolean,
        action: string | null
    }>>
}

export default function ListOfEstagiarios({ estagiarios, filterOptions, setIsModalOpen }: ListOfEstagiariosProps) {
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
            {filterEstagiarios()?.map((estagiario) => (
                <div key={estagiario.id} className="flex flex-col justify-between gap-2.5 bg-gray-100 text-slate-900 p-3 rounded">
                    <div>
                        <h3 className="text-2xl font-medium">{estagiario.nome}</h3>
                        <p className="text-lg text-slate-700">{estagiario.setor}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            className="rounded-full text-sm text-sky-950 border-sky-950 border-2 px-4 py-1.5 cursor-pointer tracking-wider font-bold uppercase hover:text-sky-100 hover:bg-sky-950 ease-in duration-200"
                            onClick={() => {
                                if (checkbox === 'ativos') {
                                    handleArchiveEstagiario(estagiario.id!)
                                    return
                                }
                                handleActiveEstagiario(estagiario.id!)
                            }}
                        >
                            {checkbox === 'ativos' ? (
                                <p>{(isLoading.load && isLoading.id === estagiario.id && isLoading.action === 'arquivar') ? 'Arquivando' : 'Arquivar'}</p>
                            ) : (
                                <p>{(isLoading.load && isLoading.id === estagiario.id && isLoading.action === 'desarquivar') ? 'Desarquivando' : 'Desarquivar'}</p>
                            )}
                        </Button>

                        {checkbox === 'ativos' && (
                            <>
                                <Button
                                    className="rounded-full text-sm text-sky-950 border-sky-950 border-2 px-4 py-1.5 cursor-pointer tracking-wider font-bold uppercase hover:text-sky-100 hover:bg-sky-950 ease-in duration-200"
                                    onClick={() => setIsModalOpen({ servidor: null, estagiario: estagiario, modal: true, action: null })}
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