import { createBrowserRouter } from "react-router-dom";
import { Event } from "./pages/EventPage/Event.tsx";
import { Layout } from "./components/Layout.tsx";
import { Calendar } from "./pages/Calendar.tsx";
import { Tickets } from "./pages/TicketsPage/Tickets.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import { Home } from "./pages/HomePage/Home.tsx";

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
