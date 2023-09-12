import Logo from "../../assets/react.svg";

export const HomePage = () => {
  return (
    <section className="flex grow flex-col gap-10  text-center">
      <header>
        <h1 className="text-bold text-3xl">Welcome</h1>
      </header>

      <img src={Logo} alt="Logo" width={400} height={400} className="animate-pulse self-center" />
    </section>
  );
};
