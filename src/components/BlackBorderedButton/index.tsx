import React from "react";
import styles from "./BlackBorderedButton.module.scss";

export interface Props {
    title: string,
    customStyle?: any,
    customClass?: string,
    onClick?: () => any
}

export default class BlackBorderedButton extends React.PureComponent<Props>
{
    static defaultProps: Props = {
        title: "",
    };

    constructor(props: Props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.onClick !== undefined)
            this.props.onClick();
    }

    render() {
        return (
            <button className={styles.btn + " " + this.props.customClass} style={{
                ...this.props.customStyle
            }}
                onClick={() => { this.handleClick() }}
            >
                {this.props.title}
            </button>
        );
    }
}