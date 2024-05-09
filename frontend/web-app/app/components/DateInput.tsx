import { FC, HTMLInputTypeAttribute, memo } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

interface Props extends UseControllerProps, Partial<ReactDatePickerProps> {
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  showLabel?: boolean;
}

const DateInput: FC<Props> = memo(props => {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });

  return (
    <div className="block">
      <DatePicker
        {...props}
        {...field}
        selected={field.value}
        placeholderText={props.label}
        onChange={field.onChange}
        className={`rounded-lg w-[100%] flex flex-col
            ${
              fieldState.error
                ? 'bg-red-50 border-red-500 text-red-900'
                : !fieldState.invalid && fieldState.isDirty
                  ? 'bg-green-50 border-green-500 text-green-900'
                  : ''
            }
        `}
      />

      {fieldState.error && <div className="text-red-500 text-sm">{fieldState.error.message}</div>}
    </div>
  );
});

DateInput.displayName = 'DateInput';

export default DateInput;
