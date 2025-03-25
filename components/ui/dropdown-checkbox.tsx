'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Controller, useFormContext } from 'react-hook-form';
import { Button } from './button';
import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from './label';
import { IconChevronDown } from '@tabler/icons-react';

type DropDataItem = {
  title?: string; // Optional because it's not always present
  value?: boolean;
};

type DropDataSection = {
  sectionTitle?: string; // Optional because it's not always present
  items: DropDataItem[];
};

type Props = {
  options: DropDataSection[];
  leftIcon?: React.JSX.Element;
  title: string;
  size?: 'small' | 'medium';
  mandatory?: boolean;
  disabled?: boolean;
  error?: string;
  label?: string;
  name: string;
};

/**
 * DropdownCheckbox component renders a dropdown menu with checkbox options.
 * It allows users to select multiple options and displays the count of selected options.
 *
 * @param props - The properties object.
 * @param options - An array of sections, each containing a title and items with titles and values.
 * @param leftIcon - An optional icon to display on the left side of the button.
 * @param title - The title of the dropdown button.
 * @param size - The size of the button, can be 'small' or 'medium'.
 *
 * @returns {JSX.Element} The rendered DropdownCheckbox component.
 */

function DropdownCheckbox({
  options,
  title,
  size,
  mandatory,
  disabled,
  error,
  label,
  name,
}: Props) {
  const [checkedValues, setCheckedValues] = useState<Array<string>>([]);
  console.log('🚀 ~ checkedValues:', checkedValues);

  const { control, reset } = useFormContext();

  return (
    <>
      <div
        className={cn(
          disabled ? 'text-gray-500' : error ? 'text-red-500' : 'text-text-base'
        )}
      >
        {label && (
          <Label
            className={cn(
              error && 'text-red-500',
              size === 'small' ? 'body-xs' : 'body-sm'
            )}
            htmlFor={label}
          >
            {label}
            {mandatory && (
              <span
                className={cn(
                  error ? 'text-red-500' : 'text-text-accent',
                  size === 'small' ? 'body-xs' : 'body-sm'
                )}
              >
                {' '}
                *
              </span>
            )}
          </Label>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size={'lg'}
            variant='ghost'
            className='bg-white text-black data-[state=open]:ring-sky-500 data-[state=open]:ring-2 data-[state=open]:ring-offset-2'
          >
            {title}
            <div className='bg-gray-300 ml-2 flex size-6 items-center justify-center rounded-full'>
              <p className={cn('text-text-light body-xs font-normal')}>
                {checkedValues.length}
              </p>
            </div>
            <IconChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={'w-60'}>
          <Button
            size={'sm'}
            variant='secondary'
            className='w-full cursor-pointer'
            onClick={() => {
              setCheckedValues([]);
              reset();
            }}
          >
            Clear filters
          </Button>
          {options.map((section, sectionIndex) => {
            return (
              <React.Fragment key={sectionIndex}>
                <DropdownMenuLabel>{section.sectionTitle}</DropdownMenuLabel>
                {section.items.map((item, index) => {
                  return (
                    <Controller
                      defaultValue={item.value}
                      key={index}
                      control={control}
                      name={name}
                      render={({ field }) => {
                        return (
                          <DropdownMenuRadioGroup
                            className={cn([
                              size == 'small' ? 'h-8' : 'h-10',
                              'hover:bg-gray-300 mx-2 flex items-center px-2 ',
                              'rounded',
                              'gap-2',
                            ])}
                          >
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(v) => {
                                field.onChange(v);

                                if (v) {
                                  setCheckedValues((prev) => [
                                    ...prev,
                                    item.title
                                      ?.toLowerCase()
                                      .replace(/[-\s/]/g, '') || '',
                                  ]);
                                } else {
                                  setCheckedValues((prev) =>
                                    prev.filter(
                                      (checkedItem) =>
                                        checkedItem !==
                                        item.title
                                          ?.toLowerCase()
                                          .replace(/[-\s/]/g, '')
                                    )
                                  );
                                }
                              }}
                            />
                            <p
                              className={cn(
                                'text-base',
                                size === 'small' ? 'body-sm' : 'body-base'
                              )}
                            >
                              {item?.title}
                            </p>
                          </DropdownMenuRadioGroup>
                        );
                      }}
                    />
                  );
                })}
                {options.length > 0 && sectionIndex <= options.length - 2 && (
                  <DropdownMenuSeparator />
                )}
              </React.Fragment>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DropdownCheckbox;
