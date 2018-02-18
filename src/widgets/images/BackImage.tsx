import { ReactElement } from "react";
import * as RX from "reactxp";
import ImageSvg, { SvgPath } from "reactxp-imagesvg";
import { CommonStyledProps } from "reactxp/src/common/Types";
import constants from "../../util/StyleConstants";

export default function backImage(props: CommonStyledProps<any>): ReactElement<any> {
    return (
        <ImageSvg
            style={props.style}
            height={constants.MEDIUM_ICON}
            width={constants.MEDIUM_ICON}
            viewBox="0 0 310 310"
        >
            <SvgPath
                fillColor={constants.LIGHT_GRAY}
                d="M 247.35,35.7 211.65,0 58.65,153 211.65,306 247.35,270.3 130.05,153 z"
            />
        </ImageSvg>
    );
}
