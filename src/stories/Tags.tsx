import { DataGrid, 
    DataGridBody, 
    DataGridCell, 
    DataGridHeader, 
    DataGridHeaderCell, 
    DataGridProps, 
    DataGridRow, 
    FluentProvider, 
    Spinner, 
    TableCellLayout, 
    TableColumnDefinition,
    createTableColumn, 
    webLightTheme 
} from "@fluentui/react-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { ErrorHeader } from "./Tags.styled";

interface Item {
    name: string;
    count: number;
}

interface TagsProps {
    pageSize: number;
    page: number;
}

export const Tags = ({
    pageSize,
    page
}: TagsProps) => {

    const [tags, setTags] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const [sortState, setSortState] = useState<
      Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]
    >({
      sortColumn: "name",
      sortDirection: "ascending",
    });

    const onSortChange: DataGridProps["onSortChange"] = (_e, nextSortState) => {
      setSortState(nextSortState);
    };

    useEffect(() => {
        const getTagsData = async() => {
            
            setError(false);
            setIsLoading(true);
            const tagsURL = `https://api.stackexchange.com/2.3/tags?site=stackoverflow&page=${page}&pageSize=${pageSize}`;

            try {
                
                const tags = await axios.get(tagsURL);
    
                const items:Item[] = tags.data.items;
    
                setTags(items);

            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getTagsData();
    }, [page, pageSize]);

    const tagsColumns: TableColumnDefinition<Item>[] = [
        createTableColumn<Item>({
            columnId: 'name',
            compare: (a,b) => a.name.localeCompare(b.name),
            renderHeaderCell: () => 'Name',
            renderCell: (item) => (
                <TableCellLayout>
                    {item.name}
                </TableCellLayout>
            ),
        }),
        createTableColumn<Item>({
            columnId: 'count',
            compare: (a,b) => a.count > b.count ? 1 : a.count < b.count ? -1 : 0,
            renderHeaderCell: () => 'Count',
            renderCell: (item) => (
                <TableCellLayout>
                    {item.count}
                </TableCellLayout>
            ),
        }),
    ];

    return (
        <FluentProvider theme={webLightTheme}>
            {isLoading ? (<Spinner size='large'/>) : 
            error ? (<ErrorHeader>Loading tags failed. Please try again</ErrorHeader>) : (<DataGrid
                sortable
                items={tags}
                columns={tagsColumns}
                sortState={sortState}
                onSortChange={onSortChange}
            >
                <DataGridHeader>
                <DataGridRow>
                    {({ renderHeaderCell }) => (
                        <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                    )}
                </DataGridRow>
                </DataGridHeader>
                <DataGridBody<Item>>
                {({ item, rowId }) => (
                    <DataGridRow<Item>
                        key={rowId}
                    >
                        {({ renderCell }) => (
                            <DataGridCell>{renderCell(item)}</DataGridCell>
                        )}
                    </DataGridRow>
                )}
                </DataGridBody>
            </DataGrid>)}
        </FluentProvider>
    )
}