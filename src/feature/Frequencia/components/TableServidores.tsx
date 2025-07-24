import React from "react";
import Button from "@/shared/Button";
import { api } from "@/api/axios";
import type {
    IServidor,
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

export default function TableServidores({ selectedEmployee, filterOptions, setFilterOptions }: TableProps) {
    const [selectedSetoresServidores, setSelectedSetoresServidores] = React.useState<ISetorServidor[]>([])
    const [selectedServidores, setSelectedServidores] = React.useState<IServidor[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [servidor, setServidor] = React.useState<{
        setores: ISetorServidor[] | null,
        servidores: IServidor[] | null
    }>({
        setores: null,
        servidores: null
    })

    const { checkbox, search, month } = filterOptions

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [setoresRes, servidoresRes] = await Promise.all([
                    api.get('/buscar_setor'),
                    api.get('/servidores')
                ])
                setServidor((prev) => ({
                    ...prev,
                    setores: [...setoresRes.data.setores],
                    servidores: [...servidoresRes.data.servidores]
                }))
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    React.useEffect(() => {
        const resetCheckbox = () => {
            setFilterOptions((prevFilters) => ({
                ...prevFilters,
                checkbox: 'setores'
            }))
        }
        resetCheckbox()
    }, [selectedEmployee])

    const downloadMultiSetoresServidorZip = async (month: string) => {
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

    const downloadSetorServidorZip = async (setor: string, month: string) => {
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

    const downloadMultiServidoresZip = async () => {
        try {
            const response = await api.get(`/servidores/pdf/download-zip/${month}`, { responseType: 'blob' });
            const blob = new Blob([response.data], { type: 'application/zip' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `frequencia_mensal_${month}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log("Erro ao baixar arquivo zip: ", error)
        }
    }

    const convertSetoresServidorToPdf = async () => {
        if (selectedSetoresServidores.length === 0) {
            toast.error('Nenhum servidor foi selecionado')
            return
        }

        const selectedSetoresFormatted = selectedSetoresServidores.map(({ setor }) => {
            return setor.toLowerCase()
        })

        try {
            setIsLoading(true)
            await api.post(`/setores/pdf`, {
                setores: selectedSetoresFormatted,
                mes: month
            })

            if (selectedSetoresFormatted.length > 1) {
                await downloadMultiSetoresServidorZip(month)
                return
            }

            await downloadSetorServidorZip(selectedSetoresFormatted[0], month)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const convertServidoresToPdf = async () => {
        if (selectedServidores.length === 0) {
            toast.error('Nenhum servidor foi selecionado')
            return
        }

        const listOfIdServidor = selectedServidores.map((servidor) => {
            return servidor.id
        })

        try {
            setIsLoading(true)
            const response = await api.post(`/servidores/pdf`, {
                funcionarios: listOfIdServidor,
                mes: month
            })

            if (response.status === 200) {
                downloadMultiServidoresZip()
                return
            }
        } catch (error) {
            console.log("Erro ao gerar servidores zip: ", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleToggleListOfSetoresServidores = (setor: ISetorServidor) => {
        const isSetorAlreadySelected = selectedSetoresServidores.some(({ id }) => id === setor.id)

        if (isSetorAlreadySelected) {
            setSelectedSetoresServidores((prevSetores) =>
                prevSetores.filter(({ id }) => id !== setor.id)
            )
            return
        }

        setSelectedSetoresServidores((prevSetores) => {
            if (prevSetores.length >= 10) {
                toast.warning('Máximo permitido é 10 setores ou funcionários selecionados')
                return [...prevSetores.slice(1), setor]
            }

            return [...prevSetores, setor]
        })
    }

    const handleToggleListOfServidores = (servidor: IServidor) => {
        const isServidorAlreadySelected = selectedServidores.some(({ id }) => id === servidor.id)

        if (isServidorAlreadySelected) {
            setSelectedServidores((prevSetores) =>
                prevSetores.filter(({ id }) => id !== servidor.id)
            )
            return
        }

        setSelectedServidores((prevServidores) => {
            if (prevServidores.length >= 10) {
                toast.warning('Máximo permitido é 10 setores ou funcionários selecionados')
                return [...prevServidores.slice(1), servidor]
            }

            return [...prevServidores, servidor]
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

    return (
        <>
            <div className="rounded overflow-x-hidden shadow-md">
                <table className="text-center text-slate-700 w-full table-fixed">
                    {checkbox === 'setores' && (
                        <thead className="bg-sky-950 text-slate-200 uppercase text-xl tracking-wider">
                            <tr className="*:px-2 *:py-2">
                                <th scope="col">Setor</th>
                                <th scope="col">Funcionários</th>
                                <th scope="col">Selecionar</th>
                            </tr>
                        </thead>
                    )}
                    {checkbox === 'servidores' && (
                        <thead className="bg-sky-950 text-slate-200 uppercase text-xl tracking-wider">
                            <tr className="*:px-2 *:py-2">
                                <th scope="col">Nome</th>
                                <th scope="col">Cargo</th>
                                <th scope="col">Setor</th>
                                <th scope="col">Selecionar</th>
                            </tr>
                        </thead>
                    )}
                    <tbody className="bg-slate-100 divide-y divide-gray-300">
                        {checkbox === 'setores' && filterSetoresServidor()?.map((setor) => (
                            <tr key={setor.id} className="*:px-6 *:py-4 *:text-lg">
                                <td className="max-w-[120px] truncate whitespace-nowrap overflow-hidden" title={setor.setor}>
                                    {setor.setor}
                                </td>
                                <td>{setor.quantidade}</td>
                                <td className="flex justify-center">
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => handleToggleListOfSetoresServidores(setor)}
                                    >
                                        {selectedSetoresServidores.some(({ id }) => id === setor.id) ? <SquareCheck /> : <Square />}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {checkbox === 'servidores' && filterServidores()?.map((servidor) => (
                            <tr key={servidor.id} className="*:px-6 *:py-4 *:text-lg">
                                <td>{servidor.nome}</td>
                                <td>{servidor.cargo}</td>
                                <td className="max-w-[120px] truncate whitespace-nowrap overflow-hidden" title={servidor.setor}>
                                    {servidor.setor}
                                </td>
                                <td className="flex justify-center">
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => handleToggleListOfServidores(servidor)}
                                    >
                                        {selectedServidores.some(({ id }) => id === servidor.id) ? <SquareCheck /> : <Square />}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Button
                disabled={isLoading}
                className="self-end"
                onClick={() => {
                    checkbox === 'setores' ? convertSetoresServidorToPdf() : convertServidoresToPdf()
                }}
            >
                {isLoading ? 'Gerando...' : 'Gerar Selecionados'}
            </Button>
        </>
    )
}