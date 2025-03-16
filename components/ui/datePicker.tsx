'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

type Props = {
  label: string;
  error?: string;
  name: string;
  hintText?: string;
  value?: string;
  onSelect?: (date: string) => void;
};

/**
 * DatePicker component
 *
 * @param label - string: the label for the component
 * @param error - string: the error message to display below the component
 * @param name - string: the name attribute of the component
 * @param autoFocus - boolean: when a selection mode is set, DayPicker will focus the first selected day (if set) or the today's date (if not disabled)
 * @param mode - 'single': specifies the mode of the date picker, it indicates whether the date picker allows the selection of a single date.
 * @param defaultMonth - date: the initial month to show in the calendar, use this prop to let DayPicker control the current month, if you need to set the month programmatically, use []] and onMonthChange
 * @param onMonthChange - function: (month: Date) => void: event fired when the user navigates between month
 * @param captionLayout - 'dropdown' | 'buttons' | 'dropdown-buttons': the buttons: display prev/right buttons, the dropdown: display drop-downs to change the month and the year, dropdown layout is available only when fromDate, fromMonth orfromYear and toDate, toMonth or toYear are set
 * @param fromYear - number: the earliest year to start the month navigation
 * @param showOutsideDays - boolean: show the outside days, an outside day is a day falling in the next or the previous month
 * @param toYear - number: the latest year to end the month navigation
 * @param selected - date | undefined : the selected day
 * @param onSelect - (day: Date | undefined, selectedDay: Date, activeModifiers: ActiveModifiers, e: MouseEvent) => void: event fired when a day is selected
 * @param startMonth The earliest month to start the month navigation.
 * @param endMonth The latest month to end the month navigation.
 *
 * [React Day Picker Single](https://react-day-picker.js.org/api/interfaces/DayPickerSingleProps)
 *
 */

export function DatePicker({ label, error, name, value, onSelect }: Props) {
  function handleOnConfirm(date: string) {
    onSelect && onSelect(date);
  }

  return (
    <div className='inline-flex flex-col gap-1'>
      <label htmlFor={name}>
        <p
          className={cn(
            error ? 'text-red-500' : 'text-text-base',
            'body-sm font-medium mt-1'
          )}
        >
          {label}
        </p>
      </label>

      <input
        // defaultValue={value?.toString()}
        value={value?.toString()}
        className={cn(
          error && 'ring-red-500 ring-1',
          'h-10 bg-white rounded-lg px-2 text-black ',
          'focus:outline-0',
          'focus:border-sky-400 ',
          'focus:ring-[1px] focus:ring-sky-400',
          'focus:placeholder:text-transparent'
        )}
        type='date'
        name={name}
        onChange={(e) => handleOnConfirm(e.target.value)}
      />

      {error && (
        <p className={cn('body-xs text-red-500 mt-0.5 font-normal')}>{error}</p>
      )}
    </div>
  );
}
