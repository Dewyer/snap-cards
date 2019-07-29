import React from "react";
import styles from "./ViewHeader.module.scss";
import logo from "../../assets/snapsoft-logo.svg";

export interface Props 
{
    optionalControlls?:React.ReactNode
}

export interface State {
}

export default class ViewHeader extends React.Component<Props, State> {

    constructor(props:Props)
    {
        super(props);
        this.state = 
        {
        }
    }

    render()
    {
        return (
            <div className={styles.mainContainer}>
                <img src={logo} className={styles.snapLogo}/>
                <p className={styles.title}>MEMORY GAME</p>
                <div className={styles.controlls}>
                    {this.props.optionalControlls}
                </div>

            </div>
        );
    }
}