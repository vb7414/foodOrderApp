import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid,
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredCityIsValid &&
            enteredPostalCodeIsValid;

        if (!formIsValid) {
            return;
        }

        //Submit cart data
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode,
        });
    };

    const nameControlClasses = `${classes.control} ${
        formInputsValidity.name ? "" : classes.invalid
    }`;

    const streetControlClasses = `${classes.control} ${
        formInputsValidity.street ? "" : classes.invalid
    }`;

    const postalCodeControlClasses = `${classes.control} ${
        formInputsValidity.postalCode ? "" : classes.invalid
    }`;

    const cityControlClasses = `${classes.control} ${
        formInputsValidity.city ? "" : classes.invalid
    }`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor="name">名字</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputsValidity.name && <p>請輸入有效的名字!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor="street">地址</label>
                <input type="text" id="street" ref={streetInputRef} />
                {!formInputsValidity.street && <p>請輸入有效的地址!</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor="postal">郵遞區號</label>
                <input type="text" id="postal" ref={postalCodeInputRef} />
                {!formInputsValidity.postalCode && (
                    <p>請輸入有效的郵遞區號 (5個字母長)!</p>
                )}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor="city">縣市</label>
                <input type="text" id="city" ref={cityInputRef} />
                {!formInputsValidity.city && <p>請輸入有效的縣市!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    取消
                </button>
                <button className={classes.submit}>確認</button>
            </div>
        </form>
    );
};

export default Checkout;
