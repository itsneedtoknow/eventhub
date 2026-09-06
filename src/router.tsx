import { createBrowserRouter } from "react-router-dom";
import { Event } from "./pages/Event";
import { Layout } from "./components/Layout";
import { Calendar } from "./pages/Calendar";
import { Tickets } from "./pages/Tickets";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";

interface IRoute {
  path: string;
  element: React.ReactNode;
  children?: IRoute[];
}
const routes: IRoute[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "events/:id", element: <Event /> },
      { path: "calendar", element: <Calendar /> },
      { path: "tickets", element: <Tickets /> },
      { path: "favorites", element: <Home isOnlyFavorites={true} /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
export const router = createBrowserRouter(routes);
