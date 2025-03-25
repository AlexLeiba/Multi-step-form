'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '@/lib/utils';
import { IconCaretRightFilled } from '@tabler/icons-react';

/**
 * DropdownMenu component
 *
 * @param defaultOpen - boolean: the open state of the dropdown menu when it is initially rendered
 * @param open - boolean: the controlled open state of the dropdown menu, must by used with onOpenChange
 * @param onOpenChange - function: (open: boolean) => void: event handler called when the open state of the dropdown menu changes
 * @param modal - boolean by default true: The modality of the dropdown menu. When set to true, interaction with outside elements will be disabled and only menu content will be visible to screen readers
 * @param dir - 'ltr' | 'rtl' : the reading direction of submenus when applicable. if omitted, inherits globally from DirectionProvider or assumes ltr
 *
 * [Radix dropdown menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
 */

const DropdownMenu = DropdownMenuPrimitive.Root;

/**
 * DropdownMenuTrigger component
 *
 * @param asChild - boolean by default false : change the default rendered element for the one passed as a child, merging their props and behavior
 * @param [data-state] - 'open' | 'closed'
 * @param [data-disabled] - Present when disabled
 *
 * [Radix dropdown menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
 */

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/**
 * DropdownMenuGroup component
 *
 * @param asChild - boolean by default false : change the default rendered element for the one passed as a child, merging their props and behavior
 *
 * [Radix dropdown menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
 */

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/**
 * DropdownMenuPortal component
 *
 * @param forceMount - boolean: used to force mounting when more control is needed
 * @param container - jsxElement: specify a container element to portal the content into
 *
 * [Radix dropdown menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
 */

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

/**
 * DropdownMenuLabel component
 *
 * @param asChild - boolean by default false : change the default rendered element for the one passed as a child, merging their props and behavior
 * @param className - string: classes to be passed to component
 *
 * [Radix dropdown menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
 */

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn('body-xs text-gray-400 pb-1 pl-3 pr-2 pt-[18px]', className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

/**
 * DropdownMenuSub component
 *
 * @param defaultOpen - boolean: the open state of the submenu when it is initially rendered
 * @param open - boolean: The controlled open state of the submenu, must be used with onOpenChange
 * @param onOpenChange - function: (open: boolean) => void : event handler called when the open state of the submenu changes
 *
 * [Radix dropdown menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
 */

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

/**
 * DropdownMenuRadioGroup component
 *
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 * @param value - string: the value of the selected item in the group
 * @param onValueChange - function: (value: string) => void: event handler called when the value changes
 *
 * [Radix dropdown menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
 */

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/**
 * DropdownMenuSubTrigger component
 *
 * @param className - string: classes to be passed to component
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 * @param disabled - boolean: when true, prevents the user from interacting with the item
 * @param textValue - string: optional text used for typeahead purposes, by default the typeahead behavior will use the textContent of the item
 * @param children - jsxElemnt: what is inside the trigger
 * @param inset - boolena: determines if the dropdown menu is inset within its container
 * @param [data-state] - 'open' | 'closed'
 * @param [data-highlighted] - Present when highlighted
 * @param [data-disabled] - Present when disabled
 *
 * [Radix dropdown menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
 */

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'hover:bg-gray-300 bg-gray-400 focus:bg-gray-300 data-[state=open]:bg-gray-300 body-base flex cursor-pointer select-none items-center py-1.5 pl-3 pr-2 font-normal outline-none',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}

    <IconCaretRightFilled
      width={20}
      height={20}
      stroke={1.5}
      className='text-black body-base ml-auto'
    />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

/**
 * DropdownMenuSubContent component
 *
 * @param className - string: classes to be passed to component
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 * @param loop - boolean by default false: when true, keyboard navigation will loop from last item to first, and vice versa
 * @param onEscapeKeyDown - function: (event: KeyboardEvent) => void: event handler called when the escape key is down
 * @param onPointerDownOutside - function: (event: PointerDownOutsideEvent) => void: event handler called when a pointer event occurs outside the bounds of the component
 * @param onFocusOutside - function: (event: FocusOutsideEvent) => void: event handler called when focus moves outside the bounds of the component
 * @param onInteractOutside - function: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void: event handler called when an interaction (pointer or focus event) happens outside the bounds of the component
 * @param forceMount -boolean: used to force mounting when more control is needed
 * @param sideOffset - number by default 0: the distance in pixels from the trigger
 * @param alignOffset - number by default 0: an offset in pixels from the "start" or "end" alignment options
 * @param avoidCollisions - boolean by default true: when true, overrides the side andalign preferences to prevent collisions with boundary edges
 * @param collisionBoundary - boundary: Element | null | Array<Element | null> by default []: the element used as the collision boundary. by default this is the viewport, though you can provide additional element(s) to be included in this check
 * @param collisionPadding - number | padding by default 0: the distance in pixels from the boundary edges where collision detection should occur
 * @param arrowPadding - number by default 0: the padding between the arrow and the edges of the content, if your content has border-radius, this will prevent it from overflowing the corners
 * @param sticky - 'partial' | 'always' by default partial: the sticky behavior on the align axis. "partial" will keep the content in the boundary as long as the trigger is at least partially in the boundary whilst "always" will keep the content in the boundary regardless
 * @param hideWhenDetached - boolean by default false: whether to hide the content when the trigger becomes fully occluded
 * @param [data-state] - 'open' | 'closed'
 * @param [data-side] - 'left' | 'right' | 'bottom' | 'top'
 * @param [data-align] - 'start' | 'end' | 'center'
 * @param [data-orientation] - 'vertical' | 'horizontal'
 *
 * [Radix dropdown menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
 */

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'border-black bg-white text-black data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 shadow-5 z-50 min-w-[8rem] overflow-hidden rounded border py-1.5',
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

/**
 * DropdownMenuContent component
 *
 * @param className - string: classes to be passed to component
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 * @param loop - boolean by default false: when true, keyboard navigation will loop from last item to first, and vice versa
 * @param onCloseAutoFocus - function: (event: Event) => void: event handler called when focus moves to the trigger after closing
 * @param onEscapeKeyDown - function: (event: KeyboardEvent) => void: event handler called when the escape key is down
 * @param onPointerDownOutside - function: (event: PointerDownOutsideEvent) => void: event handler called when a pointer event occurs outside the bounds of the component
 * @param onFocusOutside - function: (event: FocusOutsideEvent) => void: event handler called when focus moves outside the bounds of the component
 * @param onInteractOutside - function: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void: event handler called when an interaction (pointer or focus event) happens outside the bounds of the component
 * @param forceMount - boolean: used to force mounting when more control is needed
 * @param side - 'top' | 'right' | 'bottom' | 'left' by default bottom: The preferred side of the trigger to render against when open
 * @param sideOffset - number by default 0: the distance in pixels from the trigger
 * @param align - 'start' | 'center' | 'end' by default center: the preferred alignment against the trigger, may change when collisions occur
 * @param alignOffset - number by default 0: an offset in pixels from the "start" or "end" alignment options
 * @param avoidCollisions - boolean by default true: when true, overrides the side andalign preferences to prevent collisions with boundary edges
 * @param collisionBoundary - boundary: Element | null | Array<Element | null> by default []: the element used as the collision boundary, by default this is the viewport, though you can provide additional element(s) to be included in this check
 * @param collisionPadding - number | padding: number | Partial<Record<Side, number>> by default 0: the distance in pixels from the boundary edges where collision detection should occur
 * @param arrowPadding - number by default 0: the padding between the arrow and the edges of the content if your content has border-radius, this will prevent it from overflowing the corners
 * @param sticky - 'partial' | 'always' by default partial: the sticky behavior on the align axis "partial" will keep the content in the boundary as long as the trigger is at least partially in the boundary whilst "always" will keep the content in the boundary regardless
 * @param hideWhenDetached - boolean by default false: whether to hide the content when the trigger becomes fully occluded
 * @param [data-state] - 'open' | 'closed'
 * @param [data-side] - 'left' | 'right' | 'bottom' | 'top'
 * @param [data-align] - 'start' | 'end' | 'center'
 * @param [data-orientation] - 'vertical' | 'horizontal'
 *
 * [Radix dropdown menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
 */

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
    align?: 'start' | 'center' | 'end';
  }
>(({ className, sideOffset = 4, align, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        [
          'text-black data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95',
          'data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden',
          'shadow-5 bg-white rounded py-2',
        ],
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

/**
 * DropdownMenuItem component
 *
 * @param className - classes to be passed to component
 * @param inset - boolean
 * @param asChild - boolean
 * @param onSelect - function: (event: Event) => void
 * @param textValue - string
 * @param [data-orientation] - 'vertical' | 'horizontal'
 * @param [data-highlighted] - Present when highlighted
 * @param [data-disabled] - Present when disabled
 *
 * [Radix dropdown menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
 */

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'hover:bg-gray-300 bg-gray-300 focus:bg-gray-300 data-[disabled]:text-gray-500 body-base relative flex cursor-pointer select-none items-center py-1.5 pl-3 pr-2 outline-none transition-colors data-[disabled]:pointer-events-none',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

// TODO: Voyager 2.0+
// const DropdownMenuCheckboxItem = React.forwardRef<
//   React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
//   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
// >(({ className, children, checked, ...props }, ref) => (
//   <DropdownMenuPrimitive.CheckboxItem
//     ref={ref}
//     className={cn(
//       'text-sm relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 outline-none transition-colors focus:bg-accent-50 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
//       className
//     )}
//     checked={checked}
//     {...props}
//   >
//     <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
//       <DropdownMenuPrimitive.ItemIndicator>
//         <Check className='h-4 w-4' />
//       </DropdownMenuPrimitive.ItemIndicator>
//     </span>
//     {children}
//   </DropdownMenuPrimitive.CheckboxItem>
// ));
// DropdownMenuCheckboxItem.displayName =
//   DropdownMenuPrimitive.CheckboxItem.displayName;

// TODO: Voyager 2.0+
// const DropdownMenuRadioItem = React.forwardRef<
//   React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
//   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
// >(({ className, children, ...props }, ref) => (
//   <DropdownMenuPrimitive.RadioItem
//     ref={ref}
//     className={cn(
//       'text-sm relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 outline-none transition-colors focus:bg-accent-50 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
//       className
//     )}
//     {...props}
//   >
//     {/* copy radio */}
//     <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
//       <DropdownMenuPrimitive.ItemIndicator>
//         <ti className='ti ti-circle  h-2 w-2' />
//       </DropdownMenuPrimitive.ItemIndicator>
//     </span>
//     {children}
//   </DropdownMenuPrimitive.RadioItem>
// ));
// DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

// TODO: Voyager 2.0+
// const DropdownMenuLabel = React.forwardRef<
//   React.ElementRef<typeof DropdownMenuPrimitive.Label>,
//   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
//     inset?: boolean
//   }
// >(({ className, inset, ...props }, ref) => (
//   <DropdownMenuPrimitive.Label
//     ref={ref}
//     className={cn(
//       "px-2 py-1.5 text-sm font-semibold",
//       inset && "pl-8",
//       className
//     )}
//     {...props}
//   />
// ))
// DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

/**
 * DropdownMenuSeparator component
 *
 * @param className - classes to be passed to component
 * @param asChild - boolean by default false
 *
 * [Radix dropdown menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
 */

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('bg-gray-300 mx-2 my-1 h-px', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

// TODO: Voyager 2.0+
// const DropdownMenuShortcut = ({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLSpanElement>) => {
//   return (
//     <span
//       className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
//       {...props}
//     />
//   );
// };
// DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuCheckboxItem,
  // DropdownMenuRadioItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
