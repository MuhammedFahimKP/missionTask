import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "@/store";
import router from "@/routes/Routes";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}></PersistGate>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
