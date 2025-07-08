export default function Button(props) {
  return (
    <button
      className="rounded-md bg-slate-500 text-white px-3.5 py-2.5 text-sm font-semibold"
      {...props}
    />
  );
}