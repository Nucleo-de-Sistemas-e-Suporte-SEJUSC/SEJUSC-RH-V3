import type React from "react"
import Input from "@/shared/Input"
import { listOfMonths } from "@/feature/constants"
import type { IFilterOptions } from "@/interfaces"

type FilterFieldsProps = {
    selectedEmployee: string
    filterOptions: IFilterOptions
    setFilterOptions: React.Dispatch<React.SetStateAction<IFilterOptions>>
}

export default function FilterFields({ selectedEmployee, filterOptions, setFilterOptions }: FilterFieldsProps) {
    const { checkbox, search, month } = filterOptions

    return (
        <>
            <div className="flex items-center gap-12 bg-slate-300 py-4 px-2 rounded *:font-medium">
                <div className="flex items-center gap-3">
                    <h3 className="text-slate-800">Selecione um mês:</h3>
                    <select
                        name="meses"
                        id="meses"
                        className="border-2 rounded p-1 text-slate-800 outline-none border-sky-900"
                        value={month}
                        onChange={({ currentTarget }) => setFilterOptions((prevFilters) => ({
                            ...prevFilters,
                            month: currentTarget.value
                        }))}>
                        {listOfMonths.map((mes, index) => {
                            return <option key={index} value={mes}>{mes}</option>
                        })}
                    </select>
                </div>

                <div className="flex gap-6">
                    <div>
                        <label
                            className="flex flex-row-reverse items-center gap-2 text-slate-800"
                        >
                            setores
                            <input
                                type="radio"
                                name='filterOptions'
                                checked={checkbox === 'setores'}
                                value='setores'
                                onChange={({ currentTarget }) => setFilterOptions((prevFilters) => ({ ...prevFilters, checkbox: currentTarget.value }))}
                            />
                        </label>
                    </div>

                    <div>
                        <label
                            className="flex flex-row-reverse items-center gap-2 text-slate-800"
                        >
                            {selectedEmployee}
                            <input
                                type="radio"
                                name='filterOptions'
                                checked={checkbox === selectedEmployee}
                                value={selectedEmployee}
                                onChange={({ currentTarget }) => setFilterOptions((prevFilters) => ({ ...prevFilters, checkbox: currentTarget.value }))}
                            />
                        </label>
                    </div>
                </div>
            </div>

            <Input
                id="search"
                placeholder={`Pesquise por um ${checkbox === 'setores' ? 'Setor' : 'Funcionário'}`}
                value={search}
                onChange={({ currentTarget }) => setFilterOptions((prevFilters) => ({
                    ...prevFilters, search: currentTarget.value.toUpperCase()
                }
                ))}
            />
        </>
    )
}