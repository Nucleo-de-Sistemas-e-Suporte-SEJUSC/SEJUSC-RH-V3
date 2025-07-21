type InputProps = Omit<React.ComponentProps<'input'>, 'id' | 'name'> & {
    id: string,
    label: string,
    className?: string
}

export default function Input({ id, label, className = '', ...props }: InputProps) {
    return (
        <div>
            <label
                className="flex flex-col gap-1.5 text-slate-800 font-medium"
            >
                {label}
                <input
                    type="text"
                    id={id}
                    name={id}
                    className={`text-lg p-1.5 bg-gray-100 outline-none rounded border-2 border-transparent focus:border-2 focus:border-sky-900 ease-in duration-200 ${className}`}
                    {...props}
                />
            </label>
        </div>
    )
}