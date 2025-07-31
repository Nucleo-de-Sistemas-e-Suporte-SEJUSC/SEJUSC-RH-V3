import type React from "react"

type HeaderProps = {
    label: string
    selectedEmployee: string
    setSelectedEmployee: React.Dispatch<React.SetStateAction<string>>
}

export default function Header({ label, selectedEmployee, setSelectedEmployee }: HeaderProps) {
    return (
        <header>
            <h1 className="text-4xl text-sky-950 font-semibold pb-8">{label}</h1>
            <div className="flex gap-5">
                <div>
                    <label
                        className={`relative py-2 px-3 font-medium tracking-wider rounded cursor-pointer text-lg ${selectedEmployee === 'servidores' ? 'text-slate-200 bg-sky-950' : 'text-sky-950'} ease-in duration-100`}
                    >
                        Servidores
                        <input
                            type="radio"
                            name='servidores'
                            className="absolute opacity-0"
                            checked={selectedEmployee === 'servidores'}
                            value='servidores'
                            onChange={({ currentTarget }) => setSelectedEmployee(currentTarget.value)}
                        />
                    </label>
                </div>
                <div>
                    <label
                        className={`relative py-2 px-3 font-medium tracking-wider rounded cursor-pointer text-lg ${selectedEmployee === 'estagiarios' ? 'text-slate-200 bg-sky-950' : 'text-sky-950'} ease-in duration-100`}
                    >
                        Estagiários
                        <input
                            type="radio"
                            name='estagiarios'
                            className="absolute opacity-0"
                            checked={selectedEmployee === 'estagiarios'}
                            value='estagiarios'
                            onChange={({ currentTarget }) => setSelectedEmployee(currentTarget.value)}
                        />
                    </label>
                </div>
            </div>
        </header>
    )
}