import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../lib/cn';

// Design slider has no range fill — just a uniform `--input` track with the
// brand thumb riding it. The Range primitive is rendered transparent so
// position is communicated by the thumb alone.
function Slider({ className, ...props }: React.ComponentPropsWithRef<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-input">
        <SliderPrimitive.Range className="absolute h-full bg-transparent" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-bg bg-accent transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:shadow-[0_0_0_6px_var(--accent-glow)] disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
}

export { Slider };
