import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster} from 'sonner';
import { ThemeProvider } from "./components/theme/theme-provider";

export function App() {

  return ( 
    <ThemeProvider storageKey="pizzaShop-theme" defaultTheme="system">
      <RouterProvider router={router}/>
      <Toaster richColors position="top-right"/>
    </ThemeProvider>
  
  )
}
