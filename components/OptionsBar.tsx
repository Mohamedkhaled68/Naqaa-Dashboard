import React from "react";

const OptionsBar = ({
    pageOption,

    setSearchTerm,
    searchTerm,
}: {
    pageOption: React.ReactNode;

    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    searchTerm: string;
}) => {
    return (
        <div className="w-full flex justify-end items-center px-[26px] py-[20px]">
            <div className="flex itmes-center gap-4">
                <div className="flex items-center gap-[15px]">
                    <label
                        className="text-[14px] font-normal text-[#6E6B7B]"
                        htmlFor="search"
                    >
                        Search
                    </label>
                    <input
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                        value={searchTerm}
                        className="py-2 pl-[15px] pr-[10px] rounded-[5px] border border-[#D8D6DE] placeholder:text-[#B9B9C3] text-[12px] font-normal text-[#6E6B7B] outline-none"
                        type="text"
                        id="search"
                        placeholder="Search..."
                    />
                </div>
                {pageOption}
            </div>
        </div>
    );
};

export default OptionsBar;
