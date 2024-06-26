import './Button.css'

function Button({children, type= 'button' , clickHandler, disabled}) {
    return (
        <button
            type={type}
            className='button-container'
            onClick={clickHandler}
            disabled={disabled}
        >
            {children}</button>

);
}

export default Button;