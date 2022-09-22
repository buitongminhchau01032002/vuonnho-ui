import clsx from 'clsx';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';

const ValueContext = createContext('');
export default function CheckboxGroup({ values, setValues, children }) {
    return <ValueContext.Provider value={{ values, setValues }}>{children}</ValueContext.Provider>;
}

CheckboxGroup.Option = CheckboxGroupOption;

function CheckboxGroupOption({ value, children, className, as, ...passProps }) {
    const context = useContext(ValueContext);
    const { values, setValues } = context;
    const Comp = as || 'button';
    const handleToggle = () => {
        const indexValue = values.findIndex((v) => v == value);
        if (indexValue !== -1) {
            values.splice(indexValue, 1);
        } else {
            values.push(value);
        }
        setValues([...values]);
    };
    const renderClass = (className) => {
        if (className instanceof Function) {
            const selected = values.findIndex((v) => v == value) !== -1;
            return className({ selected });
        } else {
            return className;
        }
    };
    return (
        <Comp className={renderClass(className)} onClick={handleToggle} {...passProps}>
            {children instanceof Function
                ? children({ selected: values.findIndex((v) => v == value) !== -1 })
                : children}
        </Comp>
    );
}
