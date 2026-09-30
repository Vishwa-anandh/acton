import logo from "../../assets/images/logoweb.webp";

const Loading = () => {
  return (
    <div
      className="grid content-center place-items-center gap-3.5 min-h-[75vh] text-[0.9rem] text-ink-soft"
      role="status"
    >
      <img
        src={logo}
        alt=""
        className="w-[72px] h-[72px] object-contain animate-loading-pulse"
      />
      <span>Opening the school…</span>
    </div>
  );
};

export default Loading;
