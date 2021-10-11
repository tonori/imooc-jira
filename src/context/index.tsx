import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { AuthProvider } from "./auth-content";

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {/* AuthProvider 返回 <AuthContext.Provider />*/}
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
