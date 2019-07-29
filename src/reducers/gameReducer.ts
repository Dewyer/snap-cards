import {
    AppActions, ACTION_START_GAME, ACTION_FLIP_CARD, ACTION_DELAYED_ACTION
} from '../actions';
import Card, { allImages } from '../models/Card';
import {browserHistory} from "../index";
import { SettingsState } from './settingsReducer';
import { AppState } from '.';
import shuffle from '../utils/shuffle';

export interface GameState {
    gameState: "in-progress" | "game-over" | "not-started",
    score: number,
    cardPool:Card[]
    solvedCardsIds:string[],
    flippedCardsIndexes:number[],
    pendingDelays:number,
    bestScore:number
}

export function defaultGameState(): GameState {
    return {
        gameState:"not-started",
        score:0,
        cardPool:[],
        solvedCardsIds:[],
        flippedCardsIndexes:[],
        pendingDelays: 0,
        bestScore:-1
    };
}

export function getStartGameState(state:AppState) : GameState
{
    let pool:Card[] = [];
    let allCards = shuffle(Object.keys(allImages));
    for (let pairIndex = 0; pairIndex < state.settings.defaultDeckSize/2;pairIndex++)
    {
        pool.push({id:allCards[pairIndex]});
        pool.push({id:allCards[pairIndex]});
    }
    pool = shuffle(pool);

    return({
        gameState:"in-progress",
        score:0,
        cardPool:pool,
        solvedCardsIds:[],
        flippedCardsIndexes:[],
        pendingDelays:0,
        bestScore:state.game.bestScore
    });
}

export function gameReducer(state: AppState, action: AppActions): GameState 
{
    if (action.type === ACTION_START_GAME)
    {
        //nav to game and start
        browserHistory.push("/game");
        return (getStartGameState(state));
    }
    if (action.type === ACTION_FLIP_CARD)
    {
        if (state.game.flippedCardsIndexes.length < 2){
            let newFlip: number[] = Array.from(state.game.flippedCardsIndexes);
            newFlip.push(action.atIndex);

            return{
                ...state.game,
                flippedCardsIndexes:newFlip,
                pendingDelays:state.game.pendingDelays+1
            };
        }   
    }

    if (action.type === ACTION_DELAYED_ACTION)
    {
        console.log("delayed");
        let newSolved = Array.from(state.game.solvedCardsIds);
        let newFlipped = Array.from(state.game.flippedCardsIndexes);
        let newDelays = Math.max(0,state.game.pendingDelays-1);
        let newScore = state.game.score;
        let bestScore = state.game.bestScore;
        let newGameState = state.game.gameState;

        if (newDelays === 0)
        {
            if (state.game.flippedCardsIndexes.length === 2)
            {
                newScore++;
                if (state.game.cardPool[state.game.flippedCardsIndexes[0]].id === state.game.cardPool[state.game.flippedCardsIndexes[1]].id )
                {
                    //solved
                    newSolved.push(state.game.cardPool[state.game.flippedCardsIndexes[0]].id);

                    if (state.game.cardPool.every(x=>newSolved.includes(x.id)))
                    {
                        console.log("won")
                        //WON
                        if (bestScore === -1)
                        {
                            bestScore = newScore;
                        }
                        else
                        {
                            bestScore = newScore<= bestScore ? newScore : bestScore;
                        }
                        newGameState = "game-over";
                    }
                }
                newFlipped = [];
            }
        }

        return({
            ...state.game,
            pendingDelays:newDelays,
            solvedCardsIds:newSolved,
            flippedCardsIndexes:newFlipped,
            score:newScore,
            bestScore:bestScore,
            gameState: newGameState
        });
    }
    return state.game;
}