import useListOfLogs from "../hooks/useListOfLogs";

type ListOfLogsProps = {
  filterOptions: {
    checkbox: string;
    search: string;
  };
};

export default function ListOfLogs({ filterOptions }: ListOfLogsProps) {
  const { checkbox, search } = filterOptions;
  const { filterLogs, formatedDate } = useListOfLogs(checkbox, search);

  return (
    <section className="flex flex-col gap-4 overflow-y-scroll rounded bg-gray-100 p-4">
      {filterLogs()?.map(({ id, mensagem, data_criacao }) => (
        <div className="rounded bg-slate-300 p-3" key={id}>
          <p className="mb-1 text-lg font-medium">{mensagem}</p>
          <span>{formatedDate(data_criacao)}</span>
        </div>
      ))}
    </section>
  );
}
