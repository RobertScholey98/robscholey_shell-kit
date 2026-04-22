import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '../lib/cn';

/** A vertical stack of radio buttons. */
function RadioGroup({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2.5', className)} {...props} />;
}

/**
 * A single radio button. Empty outline in `--input`; when selected, the border
 * switches to `--accent` and the inner dot fills with `--accent`.
 */
function RadioGroupItem({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'aspect-square h-4 w-4 rounded-full border-[1.5px] border-input bg-bg transition-colors focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:shadow-[0_0_0_6px_var(--accent-glow)] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-accent',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className="block h-[7px] w-[7px] rounded-full bg-accent" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
