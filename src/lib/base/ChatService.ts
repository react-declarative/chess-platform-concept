import { makeAutoObservable, runInAction } from "mobx";

import { singleshot, fetchApi, debounce } from "react-declarative";

import core from '@nlpjs/core';
import nlp from '@nlpjs/nlp';
import langenmin from '@nlpjs/lang-en-min';

import { faker } from '@faker-js/faker';

interface ILnp {
    train() : Promise<void>;
    process(lang: string, msg: string) : Promise<{
        answer: string | undefined;
    }>;
}

interface IMsg {
    from: 'me' | 'bot';
    msg: string;
}

export class ChatService {

    private _processor?: ILnp;
    
    public readonly messageList: IMsg[] = [];

    constructor() {
        makeAutoObservable(this);
    };

    getAnswer = async (msg: string) => {
        if (!this._processor) {
            await this.prefetch();
        }
        const { answer } = await this._processor?.process('en', msg) || {};
        return answer || null;
    };

    sendAnswer = debounce((msg: string) => {
        setTimeout(async () => {
            const answer = await this.getAnswer(msg);
            if (answer) {
                runInAction(() => this.messageList.push({
                    from: 'bot',
                    msg: answer,
                }));
            }
        }, faker.datatype.number({
            'min': 1,
            'max': 10
        }) * 75);
    }, 3_000);

    sendMsg = (msg: string) => {
        this.messageList.push({
            from: 'me',
            msg,
        });
        this.sendAnswer(msg);
    };

    prefetch = singleshot(async () => {

        const corpus = await fetchApi('./corpus.json')

        const container = await core.containerBootstrap();
        container.use(nlp.Nlp);
        container.use(langenmin.LangEn);

        const processor = container.get('nlp');
        processor.settings.autoSave = false;
        processor.addLanguage('en');

        for (const entry of corpus.data) {
            const { intent, utterances, answers } = entry;
            for (const utterance of utterances) {
                processor.addDocument('en', utterance, intent);
            }
            for (const answer of answers) {
                processor.addAnswer('en', intent, answer);
            }
        }

        await processor.train();

        runInAction(() => {
            this._processor = processor;
        });

    });

};

export default ChatService;
