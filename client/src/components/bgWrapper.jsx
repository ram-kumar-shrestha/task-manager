const Wrapper = () => {
  return (
    <div
      className="wrapper"
      style={{
        position: "absolute",
        zIndex: "-10",
        backgroundImage: `url(${
          process.env.PUBLIC_URL + "/images/background.jpg"
        })`,
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
};

export default Wrapper;
