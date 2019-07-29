import React from "react";
import styles from "./CardGrid.module.scss";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import Card from "../../models/Card";
import CardComponent from "../CardComponent";
import { dispatchCardFlip, dispatchDelayedResponse } from "../../actions";
import ReactDOM from "react-dom";

export interface Props {
    cardPool?: Card[]
    solvedCardsIds?: string[],
    flippedCardIndexes?: number[],
    flipCard?: (at: number) => void,
    delayedResponse?: () => void,
}

export interface State {
    width: number,
    height: number,
    containerSize: { width: number, height: number }
}

class CardGrid extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.measureElement = this.measureElement.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);

        this.state =
            {
                width: 5,
                height: 4,
                containerSize: { width: 1, height: 1 }
            }
    }

    container: any

    measureElement = (element: any) => {
        const DOMNode = ReactDOM.findDOMNode(element) as any;
        if (DOMNode === null)
            return;

        return {
            width: DOMNode.offsetWidth,
            height: DOMNode.offsetHeight,
        };
    }

    updateDimensions() {
        let mesaures = this.measureElement(this.container);
        if (mesaures === null || mesaures === undefined) {
            mesaures = { height: 1, width: 1 };
        }
        this.setState({ containerSize: mesaures! });
    }

    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    renderCardForCardModel(card: Card, index: number): React.ReactNode {
        return (
            <CardComponent
                key={index}
                cardId={card.id}
                isSolved={this.props.solvedCardsIds!.includes(card.id)}
                flipped={this.props.flippedCardIndexes!.includes(index)}
                onClick={() => { this.flipCard(index) }}
            />);
    }

    flipCard(index: number) {
        console.log("flip");
        if (this.props.flipCard && this.props.delayedResponse) {
            this.props.flipCard(index);
            this.props.delayedResponse();
        }
    }

    render() {
        const cardComps: React.ReactNode[] = [];
        for (let ii = 0; ii < this.props.cardPool!.length; ii++) {
            cardComps.push(this.renderCardForCardModel(this.props.cardPool![ii], ii));
        }
        let size = {width:4,height:3};
        let deckSize = this.props.cardPool!.length/2;
        let deckMaps:{[key:number]:{width:number,height:number}} = {
            3:{width:3,height:2},
            4:{width:4,height:2},
            5:{width:5,height:2},
            6:{width:4,height:3},
            7:{width:7,height:2},
            8:{width:4,height:4},
            9:{width:6,height:3},
            10:{width:5,height:4}
        };
        if (deckMaps[deckSize] !== undefined)
            size = deckMaps[deckSize];
        console.log(deckSize,deckMaps);
        return (
            <div className={styles.mainContainer}
                style={{
                    gridTemplateColumns: ("9rem ".repeat(size.width)),
                    gridTemplateRows: ("9rem ".repeat(size.height)),
                }}
                ref={r => this.container = r}
            >
                {cardComps}
            </div>
        );
    }
}


const mapStateToProps: (state: AppState, ownProps: Props) => Props = (state: AppState, ownProps: Props) => {
    return ({
        ...ownProps,
        cardPool: state.game.cardPool,
        solvedCardsIds: state.game.solvedCardsIds,
        flippedCardIndexes: state.game.flippedCardsIndexes
    });
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        flipCard: (ii: number) => dispatch(dispatchCardFlip(ii)),
        delayedResponse: () => dispatch(dispatchDelayedResponse())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardGrid);