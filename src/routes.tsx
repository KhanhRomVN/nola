import MainLayout from "@/layout/MainLayout";
import DashboardPage from "@/pages/DashboardPage";
import Atri10Page from "@/pages/Atri-1.0Page";

const publicRoutes = [
    {
        path: "/",
        element: <DashboardPage />,
        layout: MainLayout,
    },
    {
        path: "/atri-1.0",
        element: <Atri10Page />,
        layout: MainLayout,
    },
];

export { publicRoutes };
