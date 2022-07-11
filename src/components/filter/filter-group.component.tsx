import { h, JSX } from 'preact';
import type { GroupDetails, GroupItemDetails } from '../../types/filter';
import { FilterItemComponent } from './filter-item.component';
import * as styles from './filter-group.module.less'
import { lang } from '../../consts/lang';
import { CheckboxComponent } from '../checkbox.component';
import { RatingComponent } from '../rating.component';

type filterGroupProps = {
    filterDetails: GroupDetails[] | []
    handleChange: (groupName: string, key: string, target: {}) => void
}

export const FilterGroupComponent = (props: filterGroupProps): JSX.Element => {

    const { filterDetails , handleChange } = props;
    
    return (
        <div>
        {[...filterDetails].map((group: GroupDetails, index: number) => {
            return (
              <div>
                    <h4 className={styles['group-title']}>{lang[group.groupName]}</h4>

                    {group.groupDetails.map((item: GroupItemDetails) => {
                        return (
                            <div className={styles["grid"]}>
                        
                                    <CheckboxComponent
                                        name={item.name}
                                        id={`filter_item_${item.name}`}
                                        checked={item.selected}
                                        value=""
                                        handleChange={(e) => handleChange(group.groupName, item.name, e.currentTarget)}
                                    >
                                        <label 
                                            className={`${item.filteredCount == 0? styles['o-count'] : ''}`}
                                            for={`filter_item_${item.name}`}
                                        >
                                            <span>
                                                { group.groupName === 'rating'  && <RatingComponent rating={item.name} /> }
                                                { group.groupName !== 'rating'  && item.name }
                                            </span>
                                        </label>

                                        {item.filteredCount > 0 &&
                                            <span className={styles["count"]} aria-label={`count: ${item.filteredCount}`}>({item.filteredCount})</span>
                                        }

                                    </CheckboxComponent>
                            </div>
                        )
                    })}
              </div>
            );
        })}
        </div>
    );
}