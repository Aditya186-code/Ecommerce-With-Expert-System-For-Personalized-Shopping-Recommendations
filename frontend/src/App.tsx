import { useRoutes } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { FC } from "react";
import { Toaster } from "react-hot-toast";
import routes from "./routes";

const App:FC=()=>{
  const allPages = useRoutes(routes);
  const toasterstyle = {
    style: {
      fontWeight: 450,
      fontFamily:"'Montserrat', sans-serif",
    },
  };
  return (
    <StyledEngineProvider injectFirst>
      <Toaster toastOptions={toasterstyle}/>
      {allPages}
    </StyledEngineProvider>
  );
}

export default App;
