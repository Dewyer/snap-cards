
import { Action } from 'redux';
import { SettingsState, settingsReducer, defaultSettingsState } from './settingsReducer';
import { AppActions } from '../actions';
import { GameState, defaultGameState, gameReducer } from './gameReducer';


export interface AppState 
{
    settings:SettingsState    
    game:GameState,
    isLoaded:boolean
}

export function defaultState() : AppState
{
    return {
        settings:defaultSettingsState(),
        game:defaultGameState(),
        isLoaded:false
    };
}

export function saveState(state:AppState)
{
    localStorage.setItem("save", JSON.stringify(state));
}

export function mainReducer(state: AppState = defaultState(), action: Action) : AppState
{
    if (!state.isLoaded)
    {
        if (localStorage.getItem("save") !== null){
            let startState = JSON.parse(localStorage.getItem("save")!) as AppState;
            startState.isLoaded = true;
            startState.game.pendingDelays = 0;
            startState.game.flippedCardsIndexes = [];
            return startState;
        }
    }

    let nextState = {
        settings: settingsReducer(state.settings, action as AppActions),
        game: gameReducer(state, action as AppActions),
        isLoaded: true
        //list: notesListReducer(state.list, action)
    };
    saveState(nextState);
    return nextState
}