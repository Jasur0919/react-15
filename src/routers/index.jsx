import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "../App";
import Login from "../pages/sign-in";
import SignUpRegister from "../pages/sign-up";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Login />} />
        <Route path="/sign-up" element={<SignUpRegister />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Index;
