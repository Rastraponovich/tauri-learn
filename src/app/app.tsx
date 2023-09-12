// import { PostList } from "../entities/posts"
// import Logo from "../assets/react.svg"
import { HomePage } from "../pages/home/page";

export const Application = () => {
  return (
    <main className="h-screen container mx-auto flex flex-col gap-10 p-10 sm:p-6">
      <HomePage />
      {/* <div className="p-4 flex items-center justify-center">
                <img
                    src={Logo}
                    alt="Logo"
                    height={300}
                    width={300}
                    className="animate-pulse"
                />
            </div>
            <section className="flex flex-col gap-4">
                <PostList />
            </section> */}
    </main>
  );
};
