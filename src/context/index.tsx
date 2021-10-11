import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { AuthProvider } from "./auth-content";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "store";

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        {/* AuthProvider 返回 <AuthContext.Provider />*/}
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default AppProviders;
