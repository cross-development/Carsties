import { FC, HTMLInputTypeAttribute, memo } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  type?: HTMLInputTypeAttribute;
  showLabel?: boolean;
}

const Input: FC<Props> = memo(props => {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });

  return (
    <div className="mb-3">
      {props?.showLabel && (
        <div className="mb-2 block">
          <Label
            value={props.label}
            htmlFor={field.name}
          />
        </div>
      )}

      <TextInput
        {...props}
        {...field}
        placeholder={props.label}
        type={props?.type || 'text'}
        helperText={fieldState.error?.message}
        color={fieldState.error ? 'failure' : !fieldState.isDirty ? '' : 'success'}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
