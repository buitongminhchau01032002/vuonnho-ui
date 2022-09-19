import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import NumberInput from '../NumberInput';

export default function QuantityInput({ value, setValue, minValue, maxValue }) {
    return (
        <NumberInput value={value} setValue={setValue} maxValue={maxValue} minValue={minValue}>
            {({ currentValue, handleIncrease, handleDecrease }) => (
                <div className="flex items-center">
                    <button
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 hover:border-gray-300 hover:text-clr-text-dark"
                        onClick={handleDecrease}
                    >
                        <MinusIcon className="r h-5 w-5  " />
                    </button>
                    <div className="w-9 text-center">{currentValue}</div>
                    <button
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 hover:border-gray-300 hover:text-clr-text-dark"
                        onClick={handleIncrease}
                    >
                        <PlusIcon className="r h-5 w-5  " />
                    </button>
                </div>
            )}
        </NumberInput>
    );
}
