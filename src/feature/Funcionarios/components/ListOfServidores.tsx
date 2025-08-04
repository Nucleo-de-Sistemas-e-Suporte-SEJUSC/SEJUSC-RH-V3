import React from "react";
import Button from "@/shared/Button";
import type { IServidor } from "@/feature/Frequencia/interfaces";
import useListOfServidores from "../hooks/useListOfServidores";

type ListOfServidoresProps = {
    servidores: IServidor[] | null
    filterOptions: { checkbox: string, search: string }
}

export default function ListOfServidores({ servidores, filterOptions }: ListOfServidoresProps) {
    const { checkbox, search } = filterOptions
    const [isLoading, setIsLoading] = React.useState(false)

    const {
        handleActiveServidor,
        handleArchiveServidor,
        filterServidores
    } = useListOfServidores(servidores, search, setIsLoading)

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