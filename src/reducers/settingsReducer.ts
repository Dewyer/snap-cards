import {
    AppActions, ACTION_SELECT_DECK_SIZE
} from '../actions';


export interface SettingsState {
    defaultDeckSize: number
}

export function defaultSettingsState(): SettingsState
{
    return {
        defaultDeckSize:6
    };
}

export function settingsReducer(state: SettingsState, action: AppActions): SettingsState {
    if(action.type === ACTION_SELECT_DECK_SIZE)
    {
        return {
            defaultDeckSize:action.newDeckSize
        }
    }

    return state;
}