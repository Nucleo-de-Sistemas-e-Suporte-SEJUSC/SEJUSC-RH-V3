import React from "react"
import Header from "@/feature/Frequencia/components/Header"
import FilterFields from "@/feature/Frequencia/components/FilterFields"
import { listOfMonths } from "@/feature/constants"
import type { IFilterOptions } from "@/interfaces"
import TableServidores from "@/feature/Frequencia/components/TableServidores"
import TableEstagiarios from "@/feature/Frequencia/components/TableEstagiarios"

export default function FrequenciaPage() {
    const data = new Date()
    const actualMonth = data.getMonth()

    const [selectedEmployee, setSelectedEmployee] = React.useState('servidores')
    const [filterOptions, setFilterOptions] = React.useState<IFilterOptions>({
        checkbox: 'setores',
        search: '',
        month: listOfMonths[actualMonth]
    })

    return (
        <main className="flex flex-col gap-5 py-5 max-h-[842px] pr-10">
            <Header
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
            />

            <FilterFields
                selectedEmployee={selectedEmployee}
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
            />

            {selectedEmployee === 'servidores' ? (
                <TableServidores
                    selectedEmployee={selectedEmployee}
                    filterOptions={filterOptions}
                    setFilterOptions={setFilterOptions}
                />
            ) : (
                <TableEstagiarios
                    selectedEmployee={selectedEmployee}
                    filterOptions={filterOptions}
                    setFilterOptions={setFilterOptions}
                />
            )}
        </main>
    )
}