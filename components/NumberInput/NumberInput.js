export default function NumberInput({ value, setValue, maxValue = 100, minValue = 1, children }) {
    const handleIncrease = () => {
        if (value < maxValue) {
            setValue(value + 1);
        }
    };
    const handleDecrease = () => {
        if (value > minValue) {
            setValue(value - 1);
        }
    };
    return <>{children({ currentValue: value, handleIncrease, handleDecrease })}</>;
}

NumberInput.Label;
