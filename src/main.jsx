import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
     staleTime: 1000 * 60 * 5, // data stays "fresh" for 5 min — no refetch needed
     gcTime: 1000 * 60 * 30,   // keep unused cache around for 30 min
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <Toaster />
      <Provider store={store}>
        <App />
      </Provider>
    </PersistQueryClientProvider>
  </StrictMode>,
);