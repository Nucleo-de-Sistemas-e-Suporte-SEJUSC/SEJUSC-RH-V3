type ButtonProps = React.ComponentProps<"button">;

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="rounded-lg bg-sky-900 px-10 py-2 cursor-pointer text-slate-100 tracking-wider font-bold uppercase hover:bg-sky-950 ease-in duration-200"
      {...props}
    >
      {children}
    </button>
  );
}
