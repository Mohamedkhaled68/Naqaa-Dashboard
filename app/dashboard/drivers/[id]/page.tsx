import GridContainer from "@/components/GridContainer";
import React from "react";
import DriverDetails from "../_components/DriverDetails";
// import CarDetails from "../_components/CarDetails";

const Page = () => {
    return (
        <GridContainer className="flex flex-col pb-[10px]">
            <DriverDetails />
        </GridContainer>
    );
};

export default Page;
