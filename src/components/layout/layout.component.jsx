import { Sidebar } from "./sidebar";

export const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="max-[1172px]:ml-20 max-md:ml-0 container max-w-5xl mx-auto px-6 md:pt-[72px]">
        {children}
      </div>
    </>
  );
};
