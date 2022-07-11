import { h, JSX } from 'preact'
import * as styles from './rating.module.less'
import {ratings} from '../consts/rating'


export const RatingComponent = (props: {rating: string }): JSX.Element => {
   
    const {rating} = props;
    if(rating === 'undefined') {
        return <div></div>
    }

    if(!ratings.hasOwnProperty(rating)){
        return <span>{rating}</span>;
    }

    let countArray = new Array(ratings[rating]?.count).fill(1);
    
    return (
        <div className={styles['rating-container']} role="img" aria-label={`Rating: ${ratings[rating]?.aria}`}>
            <div className={styles['flex']} aria-hidden="true">
                {countArray.map(() => {
                    return <div aria-hidden="true">&#x204E;</div>
                })}
            </div>
            {ratings[rating].plus && <label aria-hidden="true">plus</label>}
        </div>
    );
}
