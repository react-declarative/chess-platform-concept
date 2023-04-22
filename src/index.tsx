import ReactDOM from 'react-dom';

import { ThemeProvider } from '@mui/material';
import { ModalProvider } from 'react-declarative';

import AlertProvider from './components/AlertProvider';

import App from './components/App';

import THEME_DARK from './theme';

declare global {
    interface Window {
        withBriefVisited?: boolean;
    }
}

const wrappedApp = (
    <ThemeProvider theme={THEME_DARK}>
        <ModalProvider>
            <AlertProvider>
                <App />
            </AlertProvider>
        </ModalProvider>
    </ThemeProvider>
);

const root = document.getElementById('root')!;
root.innerHTML =''; 

ReactDOM.render(wrappedApp, root);
