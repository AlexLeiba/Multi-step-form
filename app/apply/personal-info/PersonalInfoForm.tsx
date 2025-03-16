'use client';
import { Button } from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown';
import { Input } from '@/components/ui/input';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema, PersonalInfoType } from '@/lib/schemas';
import { DatePicker } from '@/components/ui/datePicker';
import { PhoneInput } from '@/components/ui/phone-input';
import { Value } from 'react-phone-number-input';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { Spacer } from '@/components/ui/spacer';
import { RefreshCcw } from 'lucide-react';

export function PersonalInfoForm() {
  const formMethods = useForm<PersonalInfoType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      dateOfBirth: '',
      street: '',
    },
  });

  const { storedValue, onChangeValue } = useLocalStorage<PersonalInfoType>({
    key: 'personalInfo',
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    reset,
  } = formMethods;

  function onSubmit(formData: PersonalInfoType) {
    console.log('personalInfo=>>> \n\n', formData);

    onChangeValue(formData);
  }
  useEffect(() => {
    if (storedValue) {
      Object.keys(storedValue).forEach((key: string) => {
        if (key === 'dateOfBirth' && storedValue[key]) {
          // Convert stored date string back to Date object
          formMethods.setValue(
            key as keyof PersonalInfoType,
            new Date(storedValue[key]).toISOString().split('T')[0]
          );
        } else {
          formMethods.setValue(
            key as keyof PersonalInfoType,
            storedValue[key as keyof PersonalInfoType]
          );
        }
      });
    }
  }, [storedValue]);

  if (!storedValue) return;
  return (
    <>
      <div className='flex gap-3 items-center'>
        <h4> Personal info </h4>
        <div title='Reset form'>
          <RefreshCcw
            cursor={'pointer'}
            onClick={() => {
              reset();
              onChangeValue({});
            }}
          />
        </div>
      </div>
      <Spacer size={12} />

      <div className='h-full flex flex-col justify-between'>
        <div className='grid grid-cols-3 gap-6 '>
          <Input
            label='First name'
            placeholder='type your first name'
            {...register('firstName')}
            error={errors.firstName?.message}
          />
          <Input
            label='Last name'
            placeholder='type your last name'
            {...register('lastName')}
            error={errors.lastName?.message}
          />

          <Controller
            name='dateOfBirth'
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <DatePicker
                  value={value}
                  label='Date of birth'
                  onSelect={(v) => {
                    onChange(v);
                  }}
                  name={'dateOfBirth'}
                  error={errors.dateOfBirth?.message}
                />
              );
            }}
          />

          <div className='grid grid-cols-2 gap-6'>
            <Input
              label='Age'
              type='number'
              placeholder='type your age'
              {...register('age')}
              error={errors.age?.message}
            />

            <Controller
              name='gender'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Dropdown
                    defaultValue={
                      value || storedValue?.gender || 'selectGender'
                    }
                    options={[
                      {
                        label: 'Select gender',
                        value: 'selectGender',
                        image: '',
                        id: '',
                      },
                      { label: 'Male', value: 'male', image: '', id: '1' },
                      { label: 'Female', value: 'female', image: '', id: '2' },
                    ]}
                    label='Gender'
                    onChange={(v) => {
                      onChange(v);
                    }}
                    error={errors.gender?.message}
                  />
                );
              }}
            />
          </div>

          <Input
            label='Email'
            type='email'
            placeholder='type your email'
            {...register('email')}
            error={errors.email?.message}
          />

          <Controller
            name='phone'
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <PhoneInput
                  value={value as string & { __tag: 'E164Number' }}
                  label='Phone number'
                  onChange={(v: Value) => {
                    onChange(v);
                  }}
                  error={errors.phone?.message}
                />
              );
            }}
          />
          <Controller
            name='country'
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Dropdown
                  defaultValue={
                    value || storedValue?.country || 'selectCountry'
                  }
                  label='Your Country'
                  options={[
                    {
                      label: 'Select country',
                      value: 'selectCountry',
                      image: '',
                    },
                    { label: 'Romania', value: 'romania', image: '' },
                    { label: 'Severin', value: 'severin', image: '' },
                  ]}
                  onChange={(v) => {
                    onChange(v);
                  }}
                  error={errors.country?.message}
                />
              );
            }}
          />
          <Controller
            name='city'
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Dropdown
                  defaultValue={value || storedValue?.city || 'selectCity'}
                  label='Your City'
                  options={[
                    {
                      label: 'Select city',
                      value: 'selectCity',
                      image: '',
                      id: '',
                    },
                    {
                      label: 'Timisoara',
                      value: 'timisoara',
                      image: '',
                      id: '1',
                    },
                    { label: 'Oradea', value: 'oradea', image: '', id: '2' },
                  ]}
                  onChange={(v) => {
                    onChange(v);
                  }}
                  error={errors.city?.message}
                />
              );
            }}
          />

          <Input
            label='Street'
            placeholder='type your street'
            {...register('street')}
            error={errors.street?.message}
          />
        </div>
        <div className='flex justify-end absolute bottom-8 right-8'>
          <Button
            onClick={handleSubmit(onSubmit)}
            size={'lg'}
            className='cursor-pointer'
          >
            Next step
          </Button>
        </div>
      </div>
    </>
  );
}
