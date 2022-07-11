import { h, JSX } from 'preact'
import { useRouter } from "preact-router";
import { useEffect, useState } from 'preact/hooks';
import SearchComponent from '../components/search.component';
import { doRequest } from '../services/http.service';
import { BookingRequest, BookingResponse, Holiday } from '../types/booking';
import { DateTime } from 'luxon';
import { Result } from '../components/result/result.component';
import { GroupDetails } from '../types/filter';


let worker = new Worker(
    new URL('../lib/filter/filter.worker.ts', import.meta.url),
    {type: 'module'}
);

type filterDetailsType = {
    filteredDataIndex: string[],
    filteredDataIndexByBit: number[],
    filterDetails: GroupDetails[]
}

export default function ResultsRoute(): JSX.Element {
    const [searchParams] = useRouter();
    const [data, setData] = useState<Holiday[] | []>([]); 
    const [filteredData, setFilteredData] = useState<filterDetailsType>({
        filteredDataIndex: [],
        filteredDataIndexByBit: [],
        filterDetails: []
    });
   
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {

        const departureDate = DateTime.fromFormat(searchParams?.matches?.departureDate, "yyyy-MM-dd").toFormat("dd-MM-yyyy");
        const requestBody: BookingRequest = {
            "bookingType": "holiday",
            "location": searchParams?.matches?.location,
            "departureDate": departureDate,
            "duration": searchParams?.matches?.duration as unknown as number,
            "gateway": "LHR",
            "partyCompositions": [
                {
                    "adults": searchParams?.matches?.adults as unknown as number,
                    "childAges": [],
                    "infants": 0
                }
            ]
        }


        setLoading(true)
        doRequest('POST', '/cjs-search-api/search', requestBody)
            .then((response: unknown | BookingResponse) => {
                // Results are loaded here
                if(response){
                    const holidays: Holiday[] = response !== 'undefined' ? response['holidays'] : [];

                    setData([...holidays]);

                    worker.postMessage({
                        message: 'Load',
                        dataSet: holidays
                    })
                }
                
            })
    }, [searchParams])

    const onMessage = (event) => {

        setFilteredData({...filteredData, ...{
            filteredDataIndex: [...event.data.filteredIndex],
            filteredDataIndexByBit: [...event.data.filteredIndexByBit],
            filterDetails: [...event.data.filterDetails]
        }})
        setLoading(false)
    }

    useEffect(() => {
        worker.addEventListener('message', onMessage)

        return (() => {
            worker.removeEventListener('message', onMessage);
        })
    }, [])

    
    const handleChange = (groupName, key, target) => {
        worker.postMessage({
            message: 'OnFilter',
            data: {
                groupName,
                options: { key, checked: target.checked }
            }
        })
    }

    const resetFilter = () => {
        worker.postMessage({
            message: 'Reset',
            data: {}
        })
    }

    return (
        <section>
            <SearchComponent isLoading={isLoading}  />

            {data.length > 0 && filteredData.filterDetails.length > 0 &&
            <Result 
                resetFilter={resetFilter}
                data={data}
                filteredDataIndex={filteredData.filteredDataIndex}
                filteredDataIndexByBit={filteredData.filteredDataIndexByBit}
                filterDetails={filteredData.filterDetails}
                handleChange={handleChange}
            />
            }

            {data.length == 0 && filteredData.filterDetails.length == 0 && <h1>Loading...</h1> } 
        </section>
    )
}