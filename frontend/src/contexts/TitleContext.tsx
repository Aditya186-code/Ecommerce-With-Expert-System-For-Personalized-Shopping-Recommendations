import { createContext, ReactNode, useState } from "react";

export const TitleContext = createContext({
  name: "",
  setname: (arg: string) => {},
});

// props types for provider
type ProviderProps = {
  children: ReactNode;
};

const TitleContextProvider = ({ children }: ProviderProps) => {
  const [name, setname] = useState("");
  console.log(children);

  return (
    <TitleContext.Provider value={{ name, setname }}>
      {children}
    </TitleContext.Provider>
  );
};

export default TitleContextProvider;
