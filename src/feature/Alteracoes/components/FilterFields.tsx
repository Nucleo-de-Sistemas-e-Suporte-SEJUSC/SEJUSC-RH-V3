import Input from "@/shared/Input"

type filterOptionsProps = {
    filterOptions: { checkbox: string, search: string }
    setFilterOptions: React.Dispatch<React.SetStateAction<{ checkbox: string, search: string }>>
}

export default function FilterFields({ filterOptions, setFilterOptions }: filterOptionsProps) {
    const { checkbox, search } = filterOptions

    return (
        <>
            <div className="flex items-center gap-12 bg-slate-300 py-4 px-2 rounded *:font-medium">
                <div className="flex gap-6">
                    <div>
                        <label
                            className="flex flex-row-reverse items-center gap-2 text-slate-800"
                        >
                            arquivar
                            <input
                                type="radio"
                                name='filterOptions'
                                checked={checkbox === 'arquivou'}
                                value='arquivou'
                                onChange={({ currentTarget }) => setFilterOptions((prevFilters) => ({ ...prevFilters, checkbox: currentTarget.value }))}
                            />
                        </label>
                    </div>
                    <div>
                        <label
                            className="flex flex-row-reverse items-center gap-2 text-slate-800"
                        >
                            desarquivar
                            <input
                                type="radio"
                                name='filterOptions'
                                checked={checkbox === 'desarquivou'}
                                value='desarquivou'
                                onChange={({ currentTarget }) => setFilterOptions((prevFilters) => ({ ...prevFilters, checkbox: currentTarget.value }))}
                            />
                        </label>
                    </div>
                </div>
            </div>
            <Input
                id="search"
                placeholder='Pesquise por um Nome'
                value={search}
                onChange={({ currentTarget }) => setFilterOptions((prevFilters) => ({ ...prevFilters, search: currentTarget.value.toUpperCase() }))}
            />
        </>
    )
}