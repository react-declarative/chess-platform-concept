import * as React from 'react';

import { Game } from './Chess';

export const ChessBoard = ({
    className,
    style,
}: {
    className?: string;
    style?: React.CSSProperties;
}) => {
    return (
        <div
            className={className}
            style={style}
        >
            <Game />
        </div>
    );
};

export default ChessBoard;
