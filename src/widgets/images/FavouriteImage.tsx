import {ReactElement} from "react";
import * as RX from "reactxp";
import ImageSvg, {SvgPath} from "reactxp-imagesvg";
import {TextStyleRuleSet} from "reactxp/dist/common/Types";
import {CommonStyledProps} from "reactxp/src/common/Types";

export default function favouriteImage(props: IFavoriteImageProps): ReactElement<any> {
    return (
        <ImageSvg
            style={props.style}
            height={props.width}
            width={props.height}
            viewBox="96 0 55 240"
        >
            <SvgPath
                fillColor={props.color}
                d="m55,237 74-228 74,228L9,96h240"
            />
        </ImageSvg>
    );
}

interface IFavoriteImageProps extends CommonStyledProps<TextStyleRuleSet> {
    color?: string;
    width?: number;
    height?: number;
}
