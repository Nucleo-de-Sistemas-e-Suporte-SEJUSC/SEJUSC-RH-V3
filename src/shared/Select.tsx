import type React from "react";

type Options = {
  label: string;
  value: string;
};

type SelectProps = React.ComponentProps<"select"> & {
  label?: string;
  optionLabel: string;
  options: Options[];
};

export function Select({
  id,
  label,
  optionLabel,
  options,
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <label
        className="flex flex-col gap-1.5 text-slate-800 font-medium"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className="text-lg p-1.5 bg-gray-100 outline-none rounded border-2 border-transparent focus:border-2 focus:border-sky-900 ease-in duration-200"
        name={id}
        id={id}
        {...props}
      >
        <option value="">{optionLabel}</option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
