import { h, JSX } from 'preact';
import { GroupDetails } from '../../types/filter';
import { ButtonComponent } from '../button.component';
import { FilterGroupComponent } from './filter-group.component';
import * as styles from './filter.module.less'


type filterProps = {
    filterDetails: GroupDetails[] | []
    resetFilter: () => void
    handleChange: (groupName: string, key: string, target: {}) => void
}

export const FilterComponent = (props: filterProps): JSX.Element => {

    const {filterDetails, resetFilter, handleChange} = props;
    return (
      <div>
        <div className={styles['grid']}>
            <h3>Filter By...</h3>
            <ButtonComponent 
                    type="BUTTON"
                    skin="SECONDARY"
                    aria-label={'Click here to reset the filter'}
                    onClick={() => resetFilter()}
                    text='Reset' />
        </div>
        
        <FilterGroupComponent 
            filterDetails={filterDetails}
            handleChange={handleChange} />
      </div>
    );
}