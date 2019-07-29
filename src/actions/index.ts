import { Action, Dispatch } from 'redux';

export const ACTION_SELECT_DECK_SIZE = "SELECT_DECK_SIZE";
export const ACTION_START_GAME = "START_GAME";
export const ACTION_FLIP_CARD = "FLIP_CARD";
export const ACTION_DELAYED_ACTION = "DELAYED_ACTION";


export function isAction<A extends Action>(action: Action, type: string): action is A {
    return action.type === type;
}

export interface IActionSelectDeckSize extends Action {
    type: 'SELECT_DECK_SIZE',
    newDeckSize:number
}

export interface IActionStartGame extends Action {
    type: 'START_GAME',
}

export interface IActionFlipCard extends Action {
    type: 'FLIP_CARD',
    atIndex: number
}

export interface IActionDelayedAction extends Action {
    type: 'DELAYED_ACTION',
}


export type AppActions = IActionSelectDeckSize | IActionStartGame | IActionFlipCard | IActionDelayedAction;

export function dispatchSelectDeckSize(newS:number): IActionSelectDeckSize {
    return {
        type: ACTION_SELECT_DECK_SIZE,
        newDeckSize:newS
    };
}

export function dispatchStartGame(): IActionStartGame {
    return {
        type: ACTION_START_GAME,
    };
}

export function dispatchCardFlip(ii:number): IActionFlipCard
{
    return{
        type:ACTION_FLIP_CARD,
        atIndex:ii
    };
}

export function dispatchDelayedAction(): IActionDelayedAction
{
    return({
        type:ACTION_DELAYED_ACTION
    });
}

export function dispatchDelayedResponse()
{
    return (dispatch:any) => {
        setTimeout(() => {
            // Yay! Can invoke sync or async actions with `dispatch`
            dispatch(dispatchDelayedAction());
        }, 1000);
    };
}

