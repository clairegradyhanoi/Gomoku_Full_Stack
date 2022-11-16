
import style from './Button.module.css'
import React from 'react'

export default function Button(
    props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
    return (
    <button className = {style.button} {...props} />
    )
}