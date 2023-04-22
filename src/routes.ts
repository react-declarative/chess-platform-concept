import { ISwitchItem } from "react-declarative";

import ConnectPage from "./pages/ConnectPage";
import PermissionPage from "./pages/PermissionPage";
import NoMetamaskPage from "./pages/NoMetamaskPage";
import NotDeployedPage from "./pages/NotDeployedPage";
import ErrorPage from "./pages/ErrorPage";

import HomePage from "./pages/HomePage";
import BriefPage from "./pages/BriefPage";
import GamePage from "./pages/GamePage";
import WinPage from "./pages/WinPage";
import LosePage from "./pages/LosePage";

import ioc from "./lib/ioc";

const routes: ISwitchItem[] = [
    {
        path: '/',
        element: HomePage,
    },
    {
        path: '/brief-page',
        element: BriefPage,
        prefetch: () => ioc.ethersService.prefetch(),
        redirect: () => {
            if (!ioc.ethersService.isMetamaskAvailable || !ioc.ethersService.isProviderConnected) {
                return '/nometamask-page';
            }
            if (ioc.ethersService.isAccountEnabled) {
                return '/mint-page';
            }
            return null;
        },
    },
    {
        path: '/connect-page',
        element: ConnectPage,
        prefetch: () => ioc.ethersService.prefetch(),
        redirect: () => {
            if (!ioc.ethersService.isMetamaskAvailable || !ioc.ethersService.isProviderConnected) {
                return '/nometamask-page';
            }
            if (ioc.ethersService.isAccountEnabled) {
                return '/mint-page';
            }
            return null;
        },
    },
    {
        path: '/mint-page',
        redirect: '/game-page',
    },
    {
        path: '/game-page',
        element: GamePage,
    },
    {
        path: '/permission-page',
        element: PermissionPage,
    },
    {
        path: '/nometamask-page',
        element: NoMetamaskPage,
    },
    {
        path: '/notdeployed-page',
        element: NotDeployedPage,
    },
    {
        path: '/error-page',
        element: ErrorPage,
    },
    {
        path: '/win-page',
        element: WinPage,
    },
    {
        path: '/lose-page',
        element: LosePage,
    },
];

export default routes;
