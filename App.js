import React from "react";

import Nav from "./app/Nav/Nav";
import { MedProvider } from "./app/Context/CMed";

const App = () => {
  return (
    <MedProvider>
      <Nav />
    </MedProvider>
  )
}

export default App;