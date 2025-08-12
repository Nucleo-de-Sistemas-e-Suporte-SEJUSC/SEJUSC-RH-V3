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
    <section className="flex flex-col gap-4 bg-gray-100 p-4 overflow-y-scroll rounded">
      {filterLogs()?.map(({ id, mensagem, data_criacao }) => (
        <div className="bg-slate-300 p-3 rounded" key={id}>
          <p className="font-medium text-lg mb-1">{mensagem}</p>
          <span>{formatedDate(data_criacao)}</span>
        </div>
      ))}
    </section>
  );
}
