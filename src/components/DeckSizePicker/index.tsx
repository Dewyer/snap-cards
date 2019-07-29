import React from "react";
import styles from "./DeckSizePicker.module.scss";
import { AppState } from "../../reducers";
import { connect } from "react-redux";
import { dispatchSelectDeckSize } from "../../actions";
import Select from "react-select";
import { ActionMeta, ValueType } from "react-select/src/types";
import { Styles } from "react-select/src/styles";

export interface Props
{
    infoSide:"left"|"top",
    containerClass?:string
    selectedDeckSize?:number,
    selectDeckSize?:(n:number)=>void
}

export interface State
{

}

export type DropdownOption=
{ 
    label: string, 
    value: string 
};

class DeckSizePicker  extends React.Component<Props, State> {

    constructor(props:Props)
    {
        super(props);
        this.handleSelected = this.handleSelected.bind(this);
        this.state = 
        {
        }
    }

    getOptionForSize(size:number) : React.ReactNode
    {
        return (<option value={size}>{size}</option>);
    }

    handleSelected(option: ValueType<DropdownOption>)
    {
        if (option !== undefined){

            let val = parseInt((option as DropdownOption).value);
            (this.props.selectDeckSize!)(val);
        }
    }

    render()
    {
        const allOptions = [6,8,10,12,14,16,18,20];
        const mappedOptions = allOptions.map(x=>{return {label:x.toString(), value:x.toString()}});
        const selectedOption = mappedOptions.find(x=>x.value === this.props.selectedDeckSize!.toString());
        const customSelect = {
            container:(provided:any)=>{
                return{
                    ...provided,
                    width:"5rem"
                };
            }
        };
        const isTopInfo = this.props.infoSide === "top";
        const marginSize = "0.6rem";

        return (
            <div className={`${styles.mainContainer} ${this.props.containerClass}`} style={{
                flexDirection:isTopInfo ? "column" : "row"
            }}>
                <p className={styles.infoText} style={{
                    margin: `0 ${isTopInfo? "0" : marginSize} ${isTopInfo? marginSize : "0"} 0`
                }}>
                    Deck size:
                </p>
                <Select
                    defaultValue={selectedOption}
                    value={selectedOption}
                    options={mappedOptions}
                    styles={customSelect}
                    onChange={(option: ValueType<DropdownOption>,action:ActionMeta)=>{this.handleSelected(option)}}
                />
            </div>
        );
    }
}


const mapStateToProps:(state:AppState,ownProps:Props)=>Props = (state: AppState, ownProps: Props) => {
    return {
        infoSide:ownProps.infoSide,
        selectedDeckSize:state.settings.defaultDeckSize
    };
};

const mapDispatchToProps  = (dispatch: any) => 
{ 
    return {
        selectDeckSize: (size:number) => dispatch(dispatchSelectDeckSize(size))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckSizePicker);