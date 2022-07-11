import { Filter } from './filter';
import { mapDataToFilter } from './filter-data-formatter.helper';

const filter = new Filter();
/**
 * Load, onFilter, Reset
 * 
 */
onmessage = function(ev: MessageEvent){
    const eventData = ev.data;

    // On Load
    if(eventData.message == 'Load'){
        filter.setData(() => mapDataToFilter(filter, eventData.dataSet))
        const filterDetails = filter.getInitialFilterDetails()
        self.postMessage(filterDetails)
    }
    
    // On Filter
    if(eventData.message == 'OnFilter'){
        const resultSet = filter.onFilter(
            eventData.data.groupName, 
            eventData.data.options
        )
        self.postMessage(resultSet)
    }

    // On Reset
    if(eventData.message == 'Reset'){
        filter.reset();
        const filterDetails = filter.getInitialFilterDetails()
        self.postMessage(filterDetails)
    }

}