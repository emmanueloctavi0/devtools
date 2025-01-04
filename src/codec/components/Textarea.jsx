export const Textarea = ({ title, content, onChange }) => {
  return (
    <div className="my-5 text-xl">
      <h2 className="mb-3">{title}</h2>
      <textarea
        value={content}
        onChange={onChange}
        className="border border-gray-500 w-3/4 h-36 rounded text-slate-900"
      ></textarea>
    </div>
  );
};
