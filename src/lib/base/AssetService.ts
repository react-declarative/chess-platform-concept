import { singleshot } from 'react-declarative';
import { makeAutoObservable, runInAction } from "mobx";

import { faker } from '@faker-js/faker';

const imgToBlob = (src: string) => new Promise<Blob>((res) => {
    const img = document.createElement('img');
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    img.onload = ({ target }: any) => {
        c.width = target.naturalWidth;
        c.height = target.naturalHeight;
        ctx!.drawImage(target, 0, 0);
        c.toBlob((b) => res(b!), "image/png", 1.0);
    };
    img.crossOrigin = "";
    img.src = src;
});

const mp3ToBlob = (src: string) => new Promise<Blob>((res) => {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/octet-stream");
    xhr.open("GET", src, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
        const byteArray = new Uint8Array(xhr.response);
        const blob = new Blob([byteArray], {
            type: "application/octet-stream",
        });
        res(blob)
    };
    xhr.send(null);
});

export class AssetService {

    private _cacheMap = new Map<string, string>();

    opponentImage = './avatars/1.jpg'
    opponentLogin = faker.internet.userName();

    constructor() {
        makeAutoObservable(this);
    };

    private downloadImage = async (src: string) => {
        const blob = await imgToBlob(src);
        const key = URL.createObjectURL(blob);
        this._cacheMap.set(src, key);
    };

    private downloadMp3 = async (src: string) => {
        const blob = await mp3ToBlob(src);
        const key = URL.createObjectURL(blob);
        this._cacheMap.set(src, key);
    };

    public src = (key: string) => {
        return this._cacheMap.get(key) || key;
    };

    prefetch = singleshot(async () => {
        console.log("AssetService prefetch started");
        try {
            await Promise.all([
                this.downloadImage('./images/preview.png'),

                this.downloadMp3('./sfx/Black_Defeat.mp3'),
                this.downloadMp3('./sfx/White_Defeat.mp3'),
                this.downloadMp3('./sfx/Check.mp3'),
                this.downloadMp3('./sfx/Move.mp3'),
                this.downloadMp3('./sfx/Capture.mp3'),
                this.downloadMp3('./sfx/Check_Flash.mp3'),
                this.downloadMp3('./sfx/Stalemate.mp3'),

                this.downloadImage('./images/black_bishop.png'),
                this.downloadImage('./images/black_king.png'),
                this.downloadImage('./images/black_knight.png'),
                this.downloadImage('./images/black_pawn.png'),
                this.downloadImage('./images/black_queen.png'),
                this.downloadImage('./images/black_rook.png'),
                this.downloadImage('./images/favicon.png'),
                this.downloadImage('./images/white_bishop.png'),
                this.downloadImage('./images/white_king.png'),
                this.downloadImage('./images/white_knight.png'),
                this.downloadImage('./images/white_pawn.png'),
                this.downloadImage('./images/white_queen.png'),
                this.downloadImage('./images/white_rook.png'),

                this.downloadImage('./avatars/1.jpg'),
                this.downloadImage('./avatars/2.jpg'),
                this.downloadImage('./avatars/3.jpg'),
                this.downloadImage('./avatars/4.jpg'),
                this.downloadImage('./avatars/5.jpg'),
                this.downloadImage('./avatars/6.jpg'),
                this.downloadImage('./avatars/7.jpg'),

            ]);

            runInAction(() => {
                const number = faker.datatype.number({
                    'min': 1,
                    'max': 7
                });
                this.opponentImage = this.src(`./avatars/${number}.jpg`);
            });
    
        } catch (e) {
            console.warn('AssetService prefetch failed', e);
        }
    });

};

export default AssetService;
