import React from "react";
import Button from "@/shared/Button";
import { api } from "@/api/axios";
import type {
    IEstagiario,
    IServidor,
    ISetorEstagiario,
    ISetorServidor
} from "@/feature/Frequencia/interfaces";
import type { IFilterOptions } from "@/interfaces";
import { Square, SquareCheck } from "lucide-react";
import { toast } from "sonner";

type TableProps = {
    selectedEmployee: string
    filterOptions: IFilterOptions
    setFilterOptions: React.Dispatch<React.SetStateAction<IFilterOptions>>
}

export default function Table({ selectedEmployee, filterOptions, setFilterOptions }: TableProps) {
    const [selectedSetores, setSelectedSetores] = React.useState<ISetorServidor[]>([])
    const [servidor, setServidor] = React.useState<{
        setores: ISetorServidor[] | null,
        servidores: IServidor[] | null
    }>({
        setores: null,
        servidores: null
    })
    const [estagiario, setEstagiario] = React.useState<{
        setores: ISetorEstagiario[] | null,
        estagiarios: IEstagiario[] | null
    }>({
        setores: null,
        estagiarios: null
    })

    const { checkbox, search, month } = filterOptions

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedEmployee === 'servidores') {
                    const [setoresRes, servidoresRes] = await Promise.all([
                        api.get('/buscar_setor'),
                        api.get('/servidores')
                    ])
                    setServidor((prev) => ({
                        ...prev,
                        setores: [...setoresRes.data.setores],
                        servidores: [...servidoresRes.data.servidores]
                    }))
                }

                if (selectedEmployee === 'estagiarios') {
                    const [setoresRes, estagiariosRes] = await Promise.all([
                        api.get('/setor/estagiarios'),
                        api.get('/estagiarios'),
                    ])
                    setEstagiario((prev) => ({
                        ...prev,
                        setores: [...setoresRes.data.setores],
                        estagiarios: estagiariosRes.data.estagiarios
                    }))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [selectedEmployee])

    React.useEffect(() => {
        const resetCheckbox = () => {
            setFilterOptions((prevFilters) => ({
                ...prevFilters,
                checkbox: 'setores'
            }))
        }
        resetCheckbox()
    }, [selectedEmployee])

    const downloadMultiSetoresZip = async (month: string) => {
        try {
            await api.get(`/setores/pdf/download-zip-multissetores/${month}`, { responseType: 'blob' })
                .then(response => {
                    const blob = new Blob([response.data], { type: 'application/zip' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `frequencias_multissetores_${month}.zip`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => {
                    console.error('Erro ao baixar o arquivo ZIP multissetores:', error);
                });
        } catch (error) {
            console.log("Erro ao baixar ZIP multissetores:", error);
        }
    }

    const downloadSetorZip = async (setor: string, month: string) => {
        try {
            await api.get(`/setores/pdf/download-zip/${setor.replace(/\//g, '_')}/${month}`, { responseType: 'blob' })
                .then(response => {
                    const blob = new Blob([response.data], { type: 'application/zip' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `frequencia_mensal_${setor.replace(/\//g, '_')}_${month}.zip`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => {
                    console.log('Erro ao baixar o arquivo ZIP:', error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    const convertSetoresToPdf = async () => {
        if (selectedSetores.length === 0) {
            toast.error('Nenhum setor foi selecionado')
            return
        }

        const selectedSetoresFormatted = selectedSetores.map(({ setor }) => {
            return setor.toLowerCase().trim()
        })

        try {
            await api.post(`/setores/pdf`, {
                setores: selectedSetoresFormatted,
                mes: month
            })

            if (selectedSetoresFormatted.length > 1) {
                await downloadMultiSetoresZip(month)
            }

            await downloadSetorZip(selectedSetoresFormatted[0], month)
        } catch (error) {
            console.log(error)
        }
    }

    const handleToggleListOfSetores = (setor: ISetorServidor) => {
        const isSetorAlreadySelected = selectedSetores.some(({ id }) => id === setor.id)

        if (isSetorAlreadySelected) {
            setSelectedSetores((prevSetores) =>
                prevSetores.filter(({ id }) => id !== setor.id)
            )
            return
        }

        setSelectedSetores((prevSetores) => {
            if (prevSetores.length >= 10) {
                toast.warning('Máximo permitido é 10 setores ou funcionários selecionados')
                return [...prevSetores.slice(1), setor]
            }

            return [...prevSetores, setor]
        })
    }

    const filterSetoresServidor = (): ISetorServidor[] | undefined => {
        if (servidor.setores) {
            let filteredListOfSetores = servidor.setores

            if (search) {
                filteredListOfSetores = filteredListOfSetores?.filter((setor) => {
                    return setor.setor.includes(search)
                })
            }
            return filteredListOfSetores
        }
    }

    const filterSetoresEstagiario = (): ISetorEstagiario[] | undefined => {
        if (estagiario.setores) {
            let filteredListOfSetores = estagiario.setores

            if (search) {
                filteredListOfSetores = filteredListOfSetores?.filter((setor) => {
                    return setor.lotacao.includes(search)
                })
            }
            return filteredListOfSetores
        }
    }

    const filterServidores = (): IServidor[] | undefined => {
        if (servidor.servidores) {
            let filteredListOfServidores = servidor.servidores

            if (search) {
                filteredListOfServidores = filteredListOfServidores?.filter((servidor) => {
                    return servidor.nome.includes(search)
                })
            }
            return filteredListOfServidores
        }
    }

    const filterEstagiario = (): IEstagiario[] | undefined => {
        if (estagiario.estagiarios) {
            let filteredListOfServidores = estagiario.estagiarios

            if (search) {
                filteredListOfServidores = filteredListOfServidores?.filter((estagiario) => {
                    return estagiario.nome.includes(search)
                })
            }
            return filteredListOfServidores
        }
    }

    return (
        <>
            <div className="rounded overflow-x-hidden shadow-md">
                <table className="text-center text-slate-700 w-full table-fixed">
                    {(selectedEmployee === 'servidores' && checkbox === 'setores') && (
                        <thead className="bg-sky-950 text-slate-200 uppercase text-xl tracking-wider">
                            <tr className="*:px-2 *:py-2">
                                <th scope="col">Setor</th>
                                <th scope="col">Funcionários</th>
                                <th scope="col">Selecionar</th>
                            </tr>
                        </thead>
                    )}
                    {(selectedEmployee === 'servidores' && checkbox === 'servidores') && (
                        <thead className="bg-sky-950 text-slate-200 uppercase text-xl tracking-wider">
                            <tr className="*:px-2 *:py-2">
                                <th scope="col">Nome</th>
                                <th scope="col">Cargo</th>
                                <th scope="col">Setor</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                    )}

                    {(selectedEmployee === 'estagiarios' && checkbox === 'setores') && (
                        <thead className="bg-sky-950 text-slate-200 uppercase text-xl tracking-wider">
                            <tr className="*:px-2 *:py-2">
                                <th scope="col">Setor</th>
                                <th scope="col">Funcionários</th>
                                <th scope="col">Selecionar</th>
                            </tr>
                        </thead>
                    )}
                    {(selectedEmployee === 'estagiarios' && checkbox === 'estagiarios') && (
                        <thead className="bg-sky-950 text-slate-200 uppercase text-xl tracking-wider">
                            <tr className="*:px-2 *:py-2">
                                <th scope="col">Nome</th>
                                <th scope="col">Setor</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                    )}

                    <tbody className="bg-slate-100 divide-y divide-gray-300">
                        {(selectedEmployee === 'servidores' && checkbox === 'setores') && filterSetoresServidor()?.map((setor) => (
                            <tr key={setor.id} className="*:px-6 *:py-4 *:text-lg">
                                <td className="max-w-[120px] truncate whitespace-nowrap overflow-hidden" title={setor.setor}>
                                    {setor.setor}
                                </td>
                                <td>{setor.quantidade}</td>
                                <td className="flex justify-center">
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => handleToggleListOfSetores(setor)}
                                    >
                                        {selectedSetores.some(({ id }) => id === setor.id) ? <SquareCheck /> : <Square />}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {(selectedEmployee === 'servidores' && checkbox === 'servidores') && filterServidores()?.map(({ id, cargo, nome, setor }) => (
                            <tr key={id} className="*:px-6 *:py-4 *:text-lg">
                                <td>{nome}</td>
                                <td>{cargo}</td>
                                <td className="max-w-[120px] truncate whitespace-nowrap overflow-hidden" title={setor}>
                                    {setor}
                                </td>
                                <td className="flex justify-center">
                                    <Square />
                                </td>
                            </tr>
                        ))}

                        {(selectedEmployee === 'estagiarios' && checkbox === 'setores') && filterSetoresEstagiario()?.map(({ id, lotacao, quantidade }) => (
                            <tr key={id} className="*:px-6 *:py-4 *:text-lg">
                                <td className="max-w-[120px] truncate whitespace-nowrap overflow-hidden" title={lotacao}>
                                    {lotacao}
                                </td>
                                <td>{quantidade}</td>
                                <td className="flex justify-center">
                                    <Square />
                                </td>
                            </tr>
                        ))}
                        {(selectedEmployee === 'estagiarios' && checkbox === 'estagiarios') && filterEstagiario()?.map(({ id, nome, setor }) => (
                            <tr key={id} className="*:px-6 *:py-4 *:text-lg">
                                <td>{nome}</td>
                                <td className="max-w-[120px] truncate whitespace-nowrap overflow-hidden" title={setor}>
                                    {setor}
                                </td>
                                <td className="flex justify-center">
                                    <Square />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Button
                className="self-end"
                onClick={() => convertSetoresToPdf()}
            >
                Gerar Selecionados
            </Button>
        </>
    )
}