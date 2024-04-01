import { useState } from "react";
import { TagsFilters } from "./TagsFilters";
import { TagsTable } from "./TagsTable";

export const Tags = () => {
    
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const submitSearchingCallback = (newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    }

    return (
        <>
            <TagsFilters submitSearchingCallback={submitSearchingCallback}/>
            <TagsTable page={page} pageSize={pageSize} />
        </>
    )
};