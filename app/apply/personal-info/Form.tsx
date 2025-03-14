'use client';
import { Button } from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown';
import { Input } from '@/components/ui/input';
import React from 'react';

export function Form() {
  return (
    <div className='h-full flex flex-col justify-between'>
      <div className='grid grid-cols-2 gap-6 '>
        <Input label='First name' placeholder='type your first name' />
        <Input label='Last name' placeholder='type your last name' />
        <div className='grid grid-cols-2 gap-6'>
          <Input label='Age' type='number' placeholder='type your age' />

          <Dropdown
            defaultValue='Select gender'
            options={[
              { label: 'Male', value: 'male', image: '' },
              { label: 'Female', value: 'female', image: '' },
            ]}
            label='Gender'
            onChange={(v) => {
              console.log('v', v);
            }}
          />
        </div>

        <Input label='Email' type='email' placeholder='type your email' />
        <Input
          label='Phone number'
          type='number'
          placeholder='type your phone number'
        />
        <Input
          label='Phone number'
          type='number'
          placeholder='type your phone number'
        />
      </div>
      <div className='flex justify-end absolute bottom-8 right-8'>
        <Button size={'lg'}>Next step</Button>
      </div>
    </div>
  );
}
