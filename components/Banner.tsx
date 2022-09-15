import React from 'react'
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper";
type Props = {}

const BannerPage = (props: Props) => {
    return (
        <div>
            <img width={'100%'} src="https://bonton.in/brands/image/vogue.jpg" alt="" />
        </div>
    )
}

export default BannerPage