import React from "react";
import styles from "./BasicButton.module.scss";

export interface Props
{
    title:string,
    textColor?:string,
    customStyle?:any,
    customClass?:string,
    onClick?:()=>any
}

export default class BasicButton extends React.PureComponent<Props> 
{
    static defaultProps:Props={
        title:"",
        textColor:"white"
    };

    constructor(props:Props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick()
    {
        if (this.props.onClick !== undefined)
            this.props.onClick();
    }

    render()
    {
        return (
            <button className={styles.btn+" "+this.props.customClass} style={{
                color:this.props.textColor,
                ...this.props.customStyle
            }}
                onClick={()=>{this.handleClick()}}
            >
                {this.props.title}
            </button>
        );
    }
}