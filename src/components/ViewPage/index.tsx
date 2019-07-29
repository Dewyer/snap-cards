import React from "react";
import styles from "./ViewPage.module.scss";
import ViewHeader from "../ViewHeader";

export interface Props
{
    containerClass?:string,
    headerControlls?:any
}

export interface State
{    
}

export default class ViewPage extends React.Component<Props, State> {

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
            <div className={styles.mainContainer} style={{
            }}>
                <ViewHeader 
                    optionalControlls={this.props.headerControlls}
                />
                <div className={`${styles.pageContent} ${this.props.containerClass}`}>
                    {this.props.children}
                </div>
            </div>

        );
    }
}