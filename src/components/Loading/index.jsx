import logo from "../../assets/images/logoweb.png";

const Loading = () => {
  return (
    <div className="loading-state" role="status">
      <img src={logo} alt="" />
      <span>Opening the school…</span>
    </div>
  );
};

export default Loading;
