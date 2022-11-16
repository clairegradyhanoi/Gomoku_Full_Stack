import style from './Input.module.css'
import React from 'react'

const Input =  React.forwardRef(
    (
    props: React.InputHTMLAttributes<HTMLInputElement>,
    ref?: React.ForwardedRef<HTMLInputElement>
)  => {
    return (
        <input
        ref ={ref}
        className={style.input}
        type="text"
        autoComplete="false"
        {...props}
        />
    )
})

export default Input