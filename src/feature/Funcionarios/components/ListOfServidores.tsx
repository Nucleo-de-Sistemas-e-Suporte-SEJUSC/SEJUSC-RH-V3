import Button from "@/shared/Button";
import type { IServidor } from "@/feature/Frequencia/interfaces";

type ListOfServidoresProps = {
    servidores: IServidor[] | null
    filterOptions: { checkbox: string, search: string }
}

export default function ListOfServidores({ servidores, filterOptions }: ListOfServidoresProps) {
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
                        >
                            {checkbox === 'ativos' ? 'Arquivar' : 'Desarquivar'}
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