import GridContainer from "@/components/GridContainer";
import React from "react";
import CarDetails from "../_components/CarDetails";

const Page = () => {
    return (
        <GridContainer className="flex flex-col pb-[10px]">
            <CarDetails />
        </GridContainer>
    );
};

export default Page;
