import * as _ from "lodash";
import * as React from "react";
import { Component, ReactElement } from "react";
import * as RX from "reactxp";
import constants from "../../util/StyleConstants";
import OptionButton from "./OptionButton";

const styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        alignItems: "center"
    }),
    buttonContainer: RX.Styles.createViewStyle({
        flexDirection: "row",
        marginTop: constants.MEDIUM_SPACING
    })
};

class ReactionSpeed extends Component<IReactionSpeedProps> {
    private static NUM_OPTIONS: number = 8;

    public render(): ReactElement<HTMLElement> {
        return (
            <RX.View style={styles.container}>
                <RX.View style={styles.buttonContainer}>
                    {this.renderOptions()}
                </RX.View>
            </RX.View>
        );
    }

    private renderOptions(): ReactElement<OptionButton>[] {
        return _.map(this.getOptions(), (option: IOption, index: number) =>
            <OptionButton
                key={option.value}
                label={option.label}
                isSelected={index === this.props.value}
                isFirst={index === 0}
                isLast={index === ReactionSpeed.NUM_OPTIONS - 1}
                onPress={() => this.props.onChange(index)}
            />
        );
    }

    private getOptions(): IOption[] {
        return _.reduce<number, IOption[]>(
            _.range(ReactionSpeed.NUM_OPTIONS),
            (result: IOption[], step: number, index: number): IOption[] => {
                result.push({
                    label: this.getOptionLabel(step),
                    value: index
                });

                return result;
            }, []
        );
    }

    private getOptionLabel(step: number): string {
        if (step === 0) {
            return "Slow";
        }

        if (step === ReactionSpeed.NUM_OPTIONS - 1) {
            return "Fast";
        }

        return _.toString(step);
    }
}

interface IOption {
    label: string;
    value: number;
}

interface IReactionSpeedProps {
    value: number;
    onChange: (speed: number) => void;
}

export default ReactionSpeed;
