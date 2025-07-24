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
    const [selectedSetoresServidores, setSelectedSetoresServidores] = React.useState<ISetorServidor[]>([])
    const [selectedServidores, setSelectedServidores] = React.useState<IServidor[]>([])
    const [selectedSetoresEstagiarios, setSelectedSetoresEstagiarios] = React.useState<ISetorEstagiario[]>([])
    const [selectedEstagiarios, setSelectedEstagiarios] = React.useState<IEstagiario[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
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

    const downloadMultiEstagiariosZip = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/estagiarios/pdf/download-zip/${month}`, {
                responseType: "blob"
            });
            if (response.status === 200) {
                const blob = new Blob([response.data], { type: "application/zip" });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `frequencia_mensal_${month}.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.log("Erro ao baixar arquivo zip: ", error)
        } finally {
            setIsLoading(false);
        }
    }

    const downloadMultiSetoresEstagiarioZip = async (month: string) => {
        try {
            setIsLoading(true);
            await api.get(`/setores/estagiarios/pdf/download-zip-multiestagiarios/${month}`, { responseType: 'blob' })
                .then(response => {
                    const blob = new Blob([response.data], { type: 'application/zip' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `frequencias__multiestagiarios${month}.zip`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => {
                    console.log("Erro ao baixar o arquivo ZIP:", error);
                });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const downloadSetorEstagiarioZip = async (setor: string, month: string) => {
        try {
            setIsLoading(true);
            await api.get(`/setores/estagiarios/${setor.replace(/\//g, '_')}/${month}`, { responseType: 'blob' })
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
        } finally {
            setIsLoading(false);
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

    const convertSetoresEstagiariosToPdf = async () => {
        if (selectedSetoresEstagiarios.length === 0) {
            toast.error('Nenhum setor foi selecionado')
            return
        }

        const selectedSetoresFormatted = selectedSetoresEstagiarios.map(({ lotacao }) => {
            return lotacao.toLowerCase()
        })

        try {
            setIsLoading(true)
            await api.post(`/setores/estagiar/pdf`, {
                setores: selectedSetoresFormatted,
                mes: month
            })

            if (selectedSetoresFormatted.length > 1) {
                await downloadMultiSetoresEstagiarioZip(month)
                return
            }

            await downloadSetorEstagiarioZip(selectedSetoresFormatted[0], month)
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

    const convertEstagiariosToPdf = async () => {
        if (selectedEstagiarios.length === 0) {
            toast.error('Nenhum estagiario foi selecionado')
            return
        }

        const listOfIdEstagiario = selectedEstagiarios.map((estagiario) => {
            return estagiario.id
        })

        try {
            setIsLoading(true)
            const response = await api.post("/estagiario/pdf", {
                estagiarios: listOfIdEstagiario,
                mes: month
            });
            if (response.status === 200) {
                downloadMultiEstagiariosZip()
                return
            }
        } catch (error) {
            console.log("Erro ao gerar estagiarios zip: ", error)
        } finally {
            setIsLoading(false);
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

    const handleToggleListOfSetoresEstagiarios = (setor: ISetorEstagiario) => {
        const isSetorAlreadySelected = selectedSetoresEstagiarios.some(({ id }) => id === setor.id)

        if (isSetorAlreadySelected) {
            setSelectedSetoresEstagiarios((prevSetores) =>
                prevSetores.filter(({ id }) => id !== setor.id)
            )
            return
        }

        setSelectedSetoresEstagiarios((prevSetores) => {
            if (prevSetores.length >= 10) {
                toast.warning('Máximo permitido é 10 setores ou funcionários selecionados')
                return [...prevSetores.slice(1), setor]
            }

            return [...prevSetores, setor]
        })
    }

    const handleToggleListOfEstagiarios = (estagiario: IEstagiario) => {
        const isEstagiarioAlreadySelected = selectedEstagiarios.some(({ id }) => id === estagiario.id)

        if (isEstagiarioAlreadySelected) {
            setSelectedEstagiarios((prevEstagiarios) =>
                prevEstagiarios.filter(({ id }) => id !== estagiario.id)
            )
            return
        }

        setSelectedEstagiarios((prevEstagiarios) => {
            if (prevEstagiarios.length >= 10) {
                toast.warning('Máximo permitido é 10 setores ou funcionários selecionados')
                return [...prevEstagiarios.slice(1), estagiario]
            }

            return [...prevEstagiarios, estagiario]
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
                                        onClick={() => handleToggleListOfSetoresServidores(setor)}
                                    >
                                        {selectedSetoresServidores.some(({ id }) => id === setor.id) ? <SquareCheck /> : <Square />}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {(selectedEmployee === 'servidores' && checkbox === 'servidores') && filterServidores()?.map((servidor) => (
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

                        {(selectedEmployee === 'estagiarios' && checkbox === 'setores') && filterSetoresEstagiario()?.map((setor) => (
                            <tr key={setor.id} className="*:px-6 *:py-4 *:text-lg">
                                <td className="max-w-[120px] truncate whitespace-nowrap overflow-hidden" title={setor.lotacao}>
                                    {setor.lotacao}
                                </td>
                                <td>{setor.quantidade}</td>
                                <td className="flex justify-center">
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => handleToggleListOfSetoresEstagiarios(setor)}
                                    >
                                        {selectedSetoresEstagiarios.some(({ id }) => id === setor.id) ? <SquareCheck /> : <Square />}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {(selectedEmployee === 'estagiarios' && checkbox === 'estagiarios') && filterEstagiario()?.map((estagiario) => (
                            <tr key={estagiario.id} className="*:px-6 *:py-4 *:text-lg">
                                <td>{estagiario.nome}</td>
                                <td className="max-w-[120px] truncate whitespace-nowrap overflow-hidden" title={estagiario.setor}>
                                    {estagiario.setor}
                                </td>
                                <td className="flex justify-center">
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => handleToggleListOfEstagiarios(estagiario)}
                                    >
                                        {selectedEstagiarios.some(({ id }) => id === estagiario.id) ? <SquareCheck /> : <Square />}
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
                    if (selectedEmployee === 'servidores') {
                        checkbox === 'setores' ? convertSetoresServidorToPdf() : convertServidoresToPdf()
                        return
                    }
                    checkbox === 'setores' ? convertSetoresEstagiariosToPdf() : convertEstagiariosToPdf()
                }}
            >
                {isLoading ? 'Gerando...' : 'Gerar Selecionados'}
            </Button>
        </>
    )
}