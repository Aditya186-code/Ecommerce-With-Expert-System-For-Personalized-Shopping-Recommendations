import { TitleContext } from "contexts/TitleContext";
import { useContext, useEffect } from "react";

const useTitle = (text: string) => {
  const { name, setname } = useContext(TitleContext);

  useEffect(() => setname(text), [text, setname]);

  return name;
};

export default useTitle;