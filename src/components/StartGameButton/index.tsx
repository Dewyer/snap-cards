import React from "react";
import styles from "./StartGameButton.module.scss";
import { AppState } from "../../reducers";
import { connect } from "react-redux";
import { dispatchStartGame } from "../../actions";
import * as BasicButton from "../BasicButton";

export interface Props
{
    startGame?:()=>void,
    customStyle?:any
}

class StartGameButton extends React.Component<Props> {

    constructor(props:Props)
    {
        super(props);
        this.onNewGame = this.onNewGame.bind(this);
    }

    onNewGame()
    {
        if (this.props.startGame !== undefined)
            this.props.startGame();
    }

    render()
    {
        return (
            <BasicButton.default 
                customStyle={this.props.customStyle}
                title="START NEW GAME"
                onClick={this.onNewGame}
            />
        );
    }
}


const mapStateToProps: (state: AppState, ownProps: Props) => Props = (state: AppState, ownProps: Props) => {
    return {customStyle:ownProps.customStyle};
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        startGame: () => dispatch(dispatchStartGame())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartGameButton);