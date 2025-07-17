import GridContainer from "@/components/GridContainer";
import React from "react";
import DriverDetails from "../_components/DriverDetails";

const Page = () => {
    return (
        <GridContainer className="flex flex-col pb-[10px]">
            <DriverDetails />
        </GridContainer>
    );
};

export default Page;
