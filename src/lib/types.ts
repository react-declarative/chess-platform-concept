const baseServices = {
    ethersService: Symbol.for('ethersService'),
    alertService: Symbol.for('alertService'),
    routerService: Symbol.for('routerService'),
    assetService: Symbol.for('assetService'),
    layoutService: Symbol.for('layoutService'),
    chatService: Symbol.for('chatService'),
};

const viewServices = {
    connectPageService: Symbol.for('connectPageService'),
};

export const TYPES = {
    ...baseServices,
    ...viewServices,
};

export default TYPES;