import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/layout.component";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Invoice } from "./pages/invoice";
import { Create } from "./pages/create";
import { Edit } from "./pages/edit";
import { useAuth } from "./hooks/useAuth";

export const App = () => {
  const [token] = useAuth();

  if (token) {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invoice/:id" element={<Invoice />} />
          <Route path="/create" element={<Create />} />
          <Route path="/invoice/edit/:id" element={<Edit />} />
        </Routes>
      </Layout>
    );
  }

  return <Login />;
};
