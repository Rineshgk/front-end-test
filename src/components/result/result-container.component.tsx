import { h, JSX } from 'preact'
import { Holiday } from "../../types/booking";
import { ResultCardComponent } from './result-card.component';

import * as styles from './result-container.module.less'


type ResultContainerProps = {
    data: Holiday[]
    filteredDataIndexByBit: number[]
}

export const ResultContainerComponent = (props: ResultContainerProps): JSX.Element => {

    const {data, filteredDataIndexByBit} = props;
    return (
        <div className={styles['result-container']}>
        {data.map((data, index) => {
            return (
                <article className={`${filteredDataIndexByBit[index] === 1? styles['show']: styles['hide']}`}>
                    <ResultCardComponent data={data} />
                </article>
            )
        })}
        </div>
               
    );
}