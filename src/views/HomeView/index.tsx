import React from "react";
import styles from "./HomeView.module.scss";
import ViewPage from "../../components/ViewPage";
import DeckSizePicker from "../../components/DeckSizePicker";
import BasicButton from "../../components/BasicButton";
import StartGameButton from "../../components/StartGameButton";

export interface Props
{
}

export interface State
{
}

export default class HomeView extends React.Component<Props, State> {

    constructor(props:Props)
    {
        super(props);
        this.state = 
        {
        }
    }

    componentDidMount() 
    {
        document.title = "Snapsoft Memory Game";
    }

    render()
    {
        return (
            <ViewPage
                containerClass={styles.mainContainer}
            >
                <p className={styles.title}>SNAPSOFT</p>
                <p className={styles.subTitle}>MEMORY GAME</p>
                <DeckSizePicker 
                    infoSide="top"
                    containerClass={styles.deckSizePicker}
                />

                <StartGameButton 
                    customStyle={{
                        marginTop:"2rem"
                    }}
                />
            </ViewPage>
        );
    }
}