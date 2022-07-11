import { h, JSX } from 'preact'
import { useState } from 'preact/hooks';
import { HotelImage } from '../types/booking';
import * as styles from './carousel.module.less'


export const CarouselComponent = (props: {images: HotelImage[]}): JSX.Element => {

    const {images} = props;
    const count = images.length

    const [current, setCurrent] = useState(1);

    const increment = () => {
        if(current === count){
            setCurrent(1);
        } else {
            setCurrent((current) => current + 1);
        }
    }

    const decrement = () => {
        if(current === 1){
            setCurrent(count);
        } else {
            setCurrent((current) => current - 1);
        }
    }

    return (
        <div className={styles['carousel']}>
         
            {images.map((image: HotelImage, index) => {
                return (
                    <div 
                        className={`${styles['img-item']} ${(index+1) == current? styles['show'] : styles['hide']}`}
                    >
                        <img alt="carousel image" src={image.RESULTS_CAROUSEL.url} loading="lazy" />
                    </div>
                )
            })}
            <div className={styles['action']}>
                <div className={styles['action-link']} aria-label="click here for the previous image" onClick={() => decrement()}>{'<'}</div>
                <div className={styles['count-block']}  aria-label={`${current} of ${images.length}`} >{`${current} of ${images.length}`}</div>
                <div className={styles['action-link']}  aria-label="click here for the next image"  onClick={() => increment()}>{'>'}</div>
            </div>
            
        </div>
    );
}