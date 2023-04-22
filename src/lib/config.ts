import { provide } from 'react-declarative';

import EthersService from "./base/EthersService";
import AlertService from './base/AlertService';
import RouterService from './base/RouterService';
import AssetService from './base/AssetService';
import LayoutService from './base/LayoutService';
import ChatService from './base/ChatService';

import ConnectPageService from './view/ConnectPageService';

import TYPES from "./types";

provide(TYPES.ethersService, () => new EthersService());
provide(TYPES.alertService, () => new AlertService());
provide(TYPES.routerService, () => new RouterService());
provide(TYPES.assetService, () => new AssetService());
provide(TYPES.layoutService, () => new LayoutService());
provide(TYPES.chatService, () => new ChatService());

provide(TYPES.connectPageService, () => new ConnectPageService());
