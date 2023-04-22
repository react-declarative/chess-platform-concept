import Box from '@mui/material/Box';

import ChessBoard from "../components/common/Chessboard";
import GameCard from "../components/GameCard";

export const GamePage = () => {
    return (
        <GameCard
            withInitialMsg={!!window.withBriefVisited}
        >
            <Box
                sx={{
                    position: 'relative',
                    margin: '10px',
                }}
            >
                <ChessBoard />
            </Box>
        </GameCard>
    );
};

export default GamePage;
