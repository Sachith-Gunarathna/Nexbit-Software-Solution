"use client";

import React from "react";
import Lottie from "lottie-react";

export default function LottieWrapper({ animationData }: { animationData: any }) {
    return <Lottie animationData={animationData} loop={true} autoplay={true} />;
}