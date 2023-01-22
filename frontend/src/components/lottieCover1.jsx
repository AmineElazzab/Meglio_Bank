import React, {useEffect, useRef } from "react"
import lottie from "lottie-web"
import cover from "../assets/cover.json";

export const LottieJSON = ({json ,  height= 350, width= 500  }) => {
    const anime = useRef()

        useEffect(() => {
            lottie.loadAnimation({
              container: anime?.current,
              renderer: "svg",
              loop: true,
              autoplay: true,
              animationData: cover,
            });
            return () => lottie.stop();
          }, []);
    return <div style={{ height:height, width: width }} ref={anime}></div>
}