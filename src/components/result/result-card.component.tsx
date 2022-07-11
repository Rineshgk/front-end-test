import { h, JSX } from 'preact'
import { Holiday } from '../../types/booking';
import { CarouselComponent } from '../carousel.component';
import { RatingComponent } from '../rating.component';
import { ResultAmenitiesComponent } from './result-amenities.component';
import * as styles from './result-card.module.less'

export const ResultCardComponent = (props: {data: Holiday}): JSX.Element => {

    const {data} = props;

    return (
        <div className={styles['card-container']}>
            <div className={styles['card-image']}>
                <CarouselComponent images={data.hotel?.content?.images || []}  />
            </div>
            <div className={styles['card-content']}>
                <div className={styles['card-detail']}>
                    <div className={styles['card-detail-container']}>
                        <h2>{data.hotel.content.name}</h2>
                        <RatingComponent rating={data.hotel?.content?.vRating + '' || ''} />
                        <h3>{'Amenities'}</h3>
                        <ResultAmenitiesComponent data={data.hotel?.content?.hotelFacilities || []} />
                    </div>
                </div>

                <div className={styles['card-action']}>
                    <div className={styles['card-action-container']}>
                        <span aria-label={`price per person is £${data.pricePerPerson}`} className={styles['price']}>
                            <span aria-hidden="true">£{data.pricePerPerson}pp</span>
                        </span>
                    </div>
                </div>
                
            </div>
        </div>
    );
}