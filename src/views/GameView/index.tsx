import React, { Fragment } from "react";
import styles from "./GameView.module.scss";
import ViewPage from "../../components/ViewPage";
import DeckSizePicker from "../../components/DeckSizePicker";
import StartGameButton  from "../../components/StartGameButton";
import CardGrid from "../../components/CardGrid";
import GameInfoHeader from "../../components/GameInfoHeader"
import { AppState } from "../../reducers";
import { connect } from "react-redux";

export interface Props
{
    gameState:string
}

export interface State
{
}


class GameView extends React.Component<Props, State> {

    constructor(props:Props)
    {
        super(props);
        this.state = 
        {
        }
    }

    componentDidMount() {
        document.title = "Snapsoft Memory Game - Game";
    }

    render()
    {
        let gameContent = (
        <Fragment>
                <GameInfoHeader />
                <CardGrid />
        </Fragment>);

        if (this.props.gameState === "game-over")
        {
            gameContent = <p className={styles.gameOver}>Game over.</p>;
        }

        return (
            <ViewPage
                headerControlls={(
                    <Fragment>
                        <DeckSizePicker 
                            infoSide="left" 
                        />
                        <StartGameButton
                            customStyle={{marginLeft:"1rem"}}
                        />
                    </Fragment>
                )}
                containerClass={styles.mainContainer}
            >
                {gameContent}
            </ViewPage>
            
        );
    }
}


const mapStateToProps: (state: AppState, ownProps: Props) => Props = (state: AppState, ownProps: Props) => {
    return ({
        ...ownProps,
        gameState:state.game.gameState
    });
};

const mapDispatchToProps = (dispatch: any) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameView);