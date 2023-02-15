import { css } from "@emotion/react";
import Image from "next/image";
import SakuraBackImage from "public/sakura_background.png";

export default function BackgroundImage({ children }: any) {
  return (
    <div>
      <Image
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        `}
        src={SakuraBackImage}
        alt="backgroundImage"
      />
      {children}
    </div>
  );
}
