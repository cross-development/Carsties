'use client';

import { FC, memo, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { FieldValues, useForm } from 'react-hook-form';
import Input from '../components/Input';
import DateInput from '../components/DateInput';

const AuctionForm: FC = memo(() => {
  const {
    control,
    setFocus,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm({ mode: 'onTouched' });

  useEffect(() => {
    setFocus('make');
  }, [setFocus]);

  const onSubmit = (data: FieldValues): void => {};

  return (
    <form
      className="flex flex-col mt-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        name="make"
        label="Make"
        control={control}
        rules={{ required: 'Make is required' }}
      />

      <Input
        name="model"
        label="Model"
        control={control}
        rules={{ required: 'Model is required' }}
      />

      <Input
        name="color"
        label="Color"
        control={control}
        rules={{ required: 'Color is required' }}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          name="year"
          label="Year"
          type="number"
          control={control}
          rules={{ required: 'Year is required' }}
        />
        <Input
          name="mileage"
          label="Mileage"
          type="number"
          control={control}
          rules={{ required: 'Mileage is required' }}
        />
      </div>

      <Input
        name="imageUrl"
        label="Image URL"
        control={control}
        rules={{ required: 'Image URL is required' }}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          name="reservePrice"
          label="Reserve Price (enter 0 if no reserve)"
          type="number"
          control={control}
          rules={{ required: 'Reserve Price is required' }}
        />
        <DateInput
          showTimeSelect
          name="auctionEnd"
          label="Auction end date/time"
          dateFormat="dd MMMM yyyy h:mm a"
          control={control}
          rules={{ required: 'Auction end date is required' }}
        />
      </div>

      <div className="flex justify-end">
        <Button
          outline
          type="submit"
          color="success"
          disabled={!isValid}
          isProcessing={isSubmitting}
        >
          Submit
        </Button>

        <Button
          outline
          color="gray"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
});

AuctionForm.displayName = 'AuctionForm';

export default AuctionForm;
