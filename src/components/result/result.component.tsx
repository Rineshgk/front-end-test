import { h, JSX } from 'preact'
import { useState } from 'preact/hooks';

import { Holiday } from "../../types/booking";
import { GroupDetails } from '../../types/filter';
import { ButtonComponent } from '../button.component';
import { FilterComponent } from '../filter/filter.component';
import { ResultContainerComponent } from './result-container.component';

import * as styles from './result.module.less'


type SearchResultProps = {
    data: Holiday[]
    filteredDataIndex: string[]
    filteredDataIndexByBit: number[]
    filterDetails: GroupDetails[]
    resetFilter: () => void
    handleChange: (groupName: string, key: string, target: {}) => void
}

export const Result = (props: SearchResultProps): JSX.Element => {

    const {data, filteredDataIndex, filteredDataIndexByBit, filterDetails, resetFilter, handleChange} = props;
    const [isFilter, toggleFilter] = useState(false);

    const handleFilterChange = () => {
        toggleFilter(!isFilter);
    }

    return (
        <section className={`${styles["result"]} ${isFilter? styles["show-filter"]: ''}`}>
            <section className={styles["grid"]}>
                <aside className={styles["filter-section"]}>
                    <FilterComponent 
                            resetFilter={resetFilter}
                            filterDetails={filterDetails} 
                            handleChange={handleChange} />
                </aside>
                <section className={styles["result-section"]}>
                    <h1><span className={styles["result-count"]}>{filteredDataIndex.length}</span> holidays found</h1>
                    <ResultContainerComponent data={data} filteredDataIndexByBit={filteredDataIndexByBit} />
                </section>
            </section>
            <div className={styles['filter-button']}>
                <ButtonComponent 
                    type="BUTTON"
                    aria-label={`Click here to ${isFilter? 'view filtered results' : 'filter'}`}
                    onClick={handleFilterChange}
                    text={isFilter? 'View filtered results' : 'Filter'} />
            </div>
           
        </section>
    );
}