import GridContainer from "@/components/GridContainer";
import { ClipLoader } from "react-spinners";

export default function Loading() {
    return (
        <GridContainer className="flex flex-col pb-[10px] items-center justify-center min-h-[400px]">
            <ClipLoader size={80} />
        </GridContainer>
    );
}
