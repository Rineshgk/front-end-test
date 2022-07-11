import { h, JSX } from 'preact'

import * as styles from './checkbox.module.less'


type CheckboxProps = {
    children?: JSX.Element[]
    id: string
    name: string
    value?: string
    checked?: boolean
    handleChange?: (e: any) => void
}

export const CheckboxComponent = (props: CheckboxProps): JSX.Element => {
   
    const {id, name, value, checked, children, handleChange} = props;
    const handleChecked = (e) => {
        handleChange(e);
    }

    return (
        <div className={styles['checkbox-component']}>
            <input
                id={id}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={handleChecked}
                value={value}
            />
            {children}
        </div>
    );
}