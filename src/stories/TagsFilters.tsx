import { Button, FluentProvider, Input, InputProps, webLightTheme } from "@fluentui/react-components"
import {useState} from 'react';
import { TagsFiltersWrapper } from './TagsFilters.styled';

interface TagsFiltersProps {
    /**
     * Function for passing the new tags parameters to the parent component 
     */
    submitSearchingCallback: (page: number, pageSize: number) => void;
}

export const TagsFilters = ({
    submitSearchingCallback,
} : TagsFiltersProps) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);

    const onCurrentPageChange:InputProps['onChange'] = (_event, data) => {
        setCurrentPage(Number(data.value));
    }

    const onCurrentPageSizeChange:InputProps['onChange'] = (_event, data) => {
        setCurrentPageSize(Number(data.value));
    }

    return (<FluentProvider theme={webLightTheme}>
        <TagsFiltersWrapper>
            <Input 
                type='number' 
                placeholder='Page number...'
                value={JSON.stringify(currentPage)}
                onChange={onCurrentPageChange}
                min={0}
            />
            <Input 
                type='number' 
                placeholder='Page size...'
                value={JSON.stringify(currentPageSize)}
                onChange={onCurrentPageSizeChange}
                min={0}
            />
            <Button onClick={() => submitSearchingCallback(currentPage, currentPageSize)}>Search</Button>
        </TagsFiltersWrapper>
    </FluentProvider>);
};