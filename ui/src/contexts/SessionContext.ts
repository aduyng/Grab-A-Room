import React, {useContext} from "react";
import type {UserInfo} from "../components/App/App";

const SessionContext = React.createContext < UserInfo | null > (null);
export const useSession = () => useContext(SessionContext);
export default SessionContext;
