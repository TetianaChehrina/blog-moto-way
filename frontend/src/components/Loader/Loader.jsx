import MoonLoader from "react-spinners/ClipLoader";

export const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100vh",
        paddingTop: "20px",
      }}
    >
      <MoonLoader color="#1976D2" size={120} />
    </div>
  );
};

export default Loader;
