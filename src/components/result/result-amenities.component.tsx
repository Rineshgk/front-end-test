import { h, JSX } from 'preact'
import * as styles from './result-amenities.module.less'

export const ResultAmenitiesComponent = (props: {data: string[]}): JSX.Element => {
    
    const {data} = props;
    
    return (
        <ul className={styles['facility']} aria-label="Following are the list of amenities">
            {data.map((facility) => {
                return <li>{facility}</li>
            })}
        </ul>
    );
}