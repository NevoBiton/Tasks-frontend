import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import img1 from "../../images/advantages-and-disadvantages-of-online-learning.webp"
import img2 from "../../images/C3D6DFBB-92DD-43D0-A9F8CB9AB477F652_source.webp"
import img3 from "../../images/Task-mgmt.jpeg"

export function CarouselComponent() {

    const imagesUrl = [
        img1,
        img3,
        img2
    ]

    return (
        <Carousel className="w-full max-w-[250px] sm:max-w-xs">
            <CarouselContent>
                {Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-0 ">
                                    {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                                    <img src={imagesUrl[index]} alt="" className="object-cover w-full h-full" />

                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default CarouselComponent




