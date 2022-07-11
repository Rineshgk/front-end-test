import ListGroup from "../lib/filter/filter-list-group";

export type FilterGroup = {
    filteredResult: number[]
    index: number;
    onFilter: (options: {key?: string, checked?: boolean}, callback: () => void) => void;
    reset: () => void;
    getFilterDetails: (filterResult: number[]) => GroupDetails[] | GroupDetails
    setIndex: (number) => void
}

export type GroupDetails = {
    groupName: string
    groupDetails: GroupItemDetails[]
}

export type GroupItemDetails = {
    name: string
    selected: boolean
    count: number
    filteredCount: number
}

export type GroupType = ListGroup; // Can add more type with | (or)