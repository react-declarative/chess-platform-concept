import { inject } from 'react-declarative';

import EthersService from "./base/EthersService";
import AlertService from "./base/AlertService";
import RouterService from './base/RouterService';
import AssetService from './base/AssetService';
import LayoutService from './base/LayoutService';
import ChatService from './base/ChatService';

import ConnectPageService from './view/ConnectPageService';

import "./config"

import TYPES from "./types";

const baseServices = {
    ethersService: inject<EthersService>(TYPES.ethersService),
    alertService: inject<AlertService>(TYPES.alertService),
    routerService: inject<RouterService>(TYPES.routerService),
    assetService: inject<AssetService>(TYPES.assetService),
    layoutService: inject<LayoutService>(TYPES.layoutService),
    chatService: inject<ChatService>(TYPES.chatService),
};

const viewServices = {
    connectPageService: inject<ConnectPageService>(TYPES.connectPageService),
};

export const ioc = {
    ...baseServices,
    ...viewServices,
};

window.addEventListener('unhandledrejection', () => {
    ioc.routerService.push('/error-page');
});

window.addEventListener('error', () => {
    ioc.routerService.push('/error-page');
});

if (process.env.REACT_APP_STAGE === 'dev') {
    (window as any).ioc = ioc;
}

export default ioc;
