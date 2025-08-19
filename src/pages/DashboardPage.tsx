export default function DashboardPage() {
  return (
    <main className="overflow-hidden p-4">
      <iframe
        className="mx-auto mt-[3%] h-[90%] w-[90%] rounded"
        title="RH"
        src="https://app.powerbi.com/view?r=eyJrIjoiMjcxODQyYjctZDM4OS00N2E3LWJkOGMtM2QwNTQyMThlNGJhIiwidCI6Ijg1NDczOTk4LTFmODEtNDAxMS1iYzk3LTg3YWUwNGU2MTIwNCJ9"
        allowFullScreen={true}
      ></iframe>
    </main>
  );
}
