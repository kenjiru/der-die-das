import { ReactElement } from "react";
import * as RX from "reactxp";
import ImageSvg, { SvgPath } from "reactxp-imagesvg";
import { CommonStyledProps } from "reactxp/src/common/Types";
import constants from "../../util/StyleConstants";

export default function settingsImage(props: CommonStyledProps<any>): ReactElement<any> {
    return (
        <ImageSvg
            style={props.style}
            height={constants.MEDIUM_ICON}
            width={constants.MEDIUM_ICON}
            viewBox="0 0 24 24"
        >
            <SvgPath
                fillColor={constants.DARK_GRAY}
                d="M 22.2,14.4L21,13.7c-1.3-0.8-1.3-2.7,0-3.5l1.2-0.7c1-0.6,1.3-1.8,0.7-2.7l-1-1.7c-0.6-1-1.8-1.3-2.7-0.7   L18,5.1c-1.3,0.8-3-0.2-3-1.7V2c0-1.1-0.9-2-2-2h-2C9.9,0,9,0.9,9,2v1.3c0,1.5-1.7,2.5-3,1.7L4.8,4.4c-1-0.6-2.2-0.2-2.7,0.7   l-1,1.7C0.6,7.8,0.9,9,1.8,9.6L3,10.3C4.3,11,4.3,13,3,13.7l-1.2,0.7c-1,0.6-1.3,1.8-0.7,2.7l1,1.7c0.6,1,1.8,1.3,2.7,0.7L6,18.9   c1.3-0.8,3,0.2,3,1.7V22c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2v-1.3c0-1.5,1.7-2.5,3-1.7l1.2,0.7c1,0.6,2.2,0.2,2.7-0.7l1-1.7   C23.4,16.2,23.1,15,22.2,14.4z M12,16c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4s4,1.8,4,4C16,14.2,14.2,16,12,16 z"
            />
        </ImageSvg>
    );
}
