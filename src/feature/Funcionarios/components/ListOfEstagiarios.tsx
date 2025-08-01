import Button from "@/shared/Button";
import type { IEstagiario } from "@/feature/Frequencia/interfaces";

type ListOfEstagiariosProps = {
    estagiarios: IEstagiario[] | null
    search: string
}

export default function ListOfEstagiarios({ estagiarios, search }: ListOfEstagiariosProps) {
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

    return (
        <div className="grid grid-cols-3 gap-4 max-h-[624px] overflow-y-scroll rounded">
            {filterEstagiarios()?.map(({ nome, setor }) => (
                <div className="flex flex-col gap-2.5 bg-gray-100 text-slate-900 p-3 rounded">
                    <div>
                        <h3 className="text-2xl font-medium">{nome}</h3>
                        <p className="text-lg text-slate-700">{setor}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            className="rounded-full text-sm text-sky-950 border-sky-950 border-2 px-4 py-1.5 cursor-pointer tracking-wider font-bold uppercase hover:text-sky-100 hover:bg-sky-950 ease-in duration-200"
                        >
                            Arquivar
                        </Button>
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
                    </div>
                </div>
            ))}
        </div>
    )
}