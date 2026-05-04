import { createContext } from "react";
import IAppContext from "./model/IAppContext";

const AppContext = createContext<IAppContext>({
    navigate: () => {throw "Navigate not implemented"},
    activeRoute: {page: "home"}
})

export default AppContext;