export const ClockForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const utc = formData.get("utc");
    onSubmit(utc);
  };

  return (
    <form className="mt-10" onSubmit={handleSubmit}>
      <p className="text-xl">Ingrese la hora UTC</p>
      <div className="flex mt-4">
        <input
          className="basis-5/6 rounded mr-6 text-slate-900 px-2"
          type="text"
          name="utc"
        />
        <button className="basis-1/6 border border-lime-400 p-2 rounded hover:bg-lime-500 hover:text-slate-900 hover:transition-all hover:duration-200 duration-200">
          Convertir
        </button>
      </div>
    </form>
  );
};
