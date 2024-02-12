import React, { createContext, useState } from "react";

const RerenderContext = createContext(false);

const RerenderProvider = ({ children }) => {
  const [ren, setRen] = useState(false);

  const rerend = () => setRen(true);
  const rend = () => setRen(false);

  const value = {
    ren,
    rerend,
    rend,
  };

  return (
    <RerenderContext.Provider value={value}>
      {children}
    </RerenderContext.Provider>
  );
};

export { RerenderContext, RerenderProvider };
