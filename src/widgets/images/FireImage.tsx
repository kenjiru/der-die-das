import {ReactElement} from "react";
import * as RX from "reactxp";
import ImageSvg, {SvgPath} from "reactxp-imagesvg";
import {TextStyleRuleSet} from "reactxp/dist/common/Types";
import {CommonStyledProps} from "reactxp/src/common/Types";

export default function fireImage(props: IFireImageProps): ReactElement<any> {
    return (
        <ImageSvg
            style={props.style}
            height={props.width}
            width={props.height}
            viewBox="0 0 1000 1000"
        >
            <SvgPath
                fillColor={props.color}
                d="m 314.1,990c-65.3-135.9-30.5-213.8,19.7-287.1c55-80.3,69.1-159.9,69.1-159.9s43.2,56.2,25.9,144c76.3-85,90.8-220.4,79.2-272.2C680.6,535.4,754.4,796.5,655,990c528.6-299.1,131.5-746.6,62.4-797.1c23,50.4,27.4,135.8-19.1,177.2C619.4,71.3,424.5,10,424.5,10c23,154.1-83.5,322.7-186.3,448.6c-3.6-61.5-7.4-103.9-39.8-162.7c-7.3,111.6-92.6,202.6-115.7,314.5C51.4,761.9,106.2,872.8,314.1,990z"
            />
        </ImageSvg>
    );
}

interface IFireImageProps extends CommonStyledProps<TextStyleRuleSet> {
    color?: string;
    width?: number;
    height?: number;
}
