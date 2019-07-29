
import React from "react";
import styles from "./GameInfoHeader.module.scss";
import BlackBorderedButton from "../BlackBorderedButton";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import { dispatchStartGame } from "../../actions";

export interface Props
{
    score?:number,
    bestScore?:string,
    startGame?:()=>void
}

class GameInfoHeader extends React.Component<Props> {

    constructor(props:Props)
    {
        super(props);

    }

    render()
    {
        return (
            <div className={styles.mainContainer}>
                <div className={styles.current}><p>Current Tries:</p><p>{this.props.score}</p></div>
                <div className={styles.best}><p>Best:</p><p>{this.props.bestScore}</p></div>
                <BlackBorderedButton 
                    title={"RESTART"}
                    onClick={()=>{this.props.startGame!()}}
                />
            </div>
        );
    }
}


const mapStateToProps: (state: AppState, ownProps: Props) => Props = (state: AppState, ownProps: Props) => {
    return ({
        ...ownProps,

        score:state.game.score,
        bestScore:state.game.bestScore === -1 ? "-" : state.game.bestScore.toString()
    });
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        startGame: () => dispatch(dispatchStartGame())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameInfoHeader);