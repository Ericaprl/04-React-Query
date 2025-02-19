import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster} from 'sonner';
import { ThemeProvider } from "./components/theme/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/reactQuery";

export function App() {

  return ( 
    <ThemeProvider storageKey="pizzaShop-theme" defaultTheme="system">
      <Toaster richColors position="top-right"/>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      </QueryClientProvider>
    </ThemeProvider>
  
  )
}
