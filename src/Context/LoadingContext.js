import { createContext, useState } from "react";

export const Load = createContext("");

export default function LoadingContext({ children }) {
  const [loading, setLoading] = useState(false);
  const [gettingData, setGettingData] = useState(true);
  return (
    <Load.Provider value={{ loading, setLoading, gettingData, setGettingData }}>
      {children}
    </Load.Provider>
  );
}
