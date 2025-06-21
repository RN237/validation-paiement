import "./App.css";
import AddPaiement from "./addpaiement/AddPaiement";
import Home from "./home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ListPaiement from "./listPaiement/ListPaiement";
import TMoney from "./tMoney/Tmoney";
import Moov from "./moov/Moov";
import Wave from "./wave/Wave";
import Airtel from "./airtel/Airtel";
import Vodafone from "./vodafone/Vodafone"; // ✅ Import ajouté

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/add",
      element: <AddPaiement />,
    },
    {
      path: "/tMoney",
      element: <TMoney />,
    },
    {
      path: "/moov",
      element: <Moov />,
    },
    {
      path: "/wave",
      element: <Wave />,
    },
    {
      path: "/airtel",
      element: <Airtel />,
    },
    {
      path: "/vodafone",
      element: <Vodafone />,
    },
    {
      path: "/paiement",
      element: <ListPaiement />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;