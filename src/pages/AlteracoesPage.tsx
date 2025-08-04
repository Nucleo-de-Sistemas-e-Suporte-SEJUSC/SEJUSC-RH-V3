import React from "react";
import FilterFields from "@/feature/Alteracoes/components/FilterFields";
import ListOfLogs from "@/feature/Alteracoes/components/ListOfLogs";

export default function AlteracoesPage() {
    const [filterOptions, setFilterOptions] = React.useState({
        checkbox: 'Arquivar',
        search: ''
    })

    return (
        <main className="flex flex-col gap-5 py-5 pr-10 max-h-[824px]">
            <h1 className="text-4xl text-sky-950 font-semibold pb-8">Histórico de Alterações</h1>
            <FilterFields
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
            />
            <ListOfLogs
                filterOptions={filterOptions}
            />
        </main>
    )
}