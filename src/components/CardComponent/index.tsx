import React from "react";
import styles from "./Card.module.scss";
import { allImages } from "../../models/Card";

export interface Props
{
    cardId:string,
    isSolved:boolean,
    flipped:boolean,
    onClick?:()=>void
}

export default class CardComponent extends React.Component<Props> {

    constructor(props:Props)
    {
        super(props);
        this.onClick = this.onClick.bind(this);

    }

    onClick()
    {
        console.log("On");
        if (this.props.onClick !== undefined && !this.props.isSolved)
        {
            this.props.onClick();
        }
    }

    render()
    {
        return (
            <div className={styles.flipCard + " " + styles.cardSize}
                onClick={this.onClick}
                style={{
                    opacity:this.props.isSolved ? 0 : 1
                }}
            >
                <div className={styles.flipCardInner + " " + styles.unselectable}
                    style={{
                        transform: this.props.flipped ?"rotateY(180deg)" : ""
                    }}
                >
                    <div className={styles.flipCardFront + " " + styles.unselectable}>
                    </div>
                    <div className={styles.flipCardBack + " " + styles.unselectable}
                    >
                        <img draggable={false} src={allImages[this.props.cardId]} className={styles.cardImg+" "+styles.unselectable} 
                            style={{
                                //opacity: this.props.flipped ? 1 : 0.
                            }} 
                        />
                    </div>
                </div>
            </div>
        );
    }
}