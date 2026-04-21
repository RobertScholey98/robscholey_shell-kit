/**
 * @module @robscholey/shell-kit/ui
 *
 * shadcn/ui component library with a default Tailwind theme.
 * Sub-apps import from this path for visual consistency with the shell.
 */

// Utilities
export { cn } from './lib/cn';

// Components
export { Button, buttonVariants } from './components/button';
export type { ButtonProps } from './components/button';

export { Input } from './components/input';
export type { InputProps } from './components/input';

export { Textarea } from './components/textarea';
export type { TextareaProps } from './components/textarea';

export { Label } from './components/label';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './components/card';

export { Badge, badgeVariants } from './components/badge';
export type { BadgeProps } from './components/badge';

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/dialog';

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from './components/drawer';

export { Separator } from './components/separator';

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from './components/avatar';
export type { AvatarGroupProps } from './components/avatar';

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './components/select';

export { Checkbox } from './components/checkbox';

export { Switch } from './components/switch';

export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/tabs';

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './components/tooltip';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './components/dropdown-menu';

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from './components/popover';

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './components/accordion';

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './components/alert-dialog';

export { Progress } from './components/progress';

export { ScrollArea, ScrollBar } from './components/scroll-area';

export { Slider } from './components/slider';

export { Toggle, toggleVariants } from './components/toggle';

export { ToggleGroup, ToggleGroupItem } from './components/toggle-group';

export { RadioGroup, RadioGroupItem } from './components/radio-group';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './components/table';

export { Skeleton } from './components/skeleton';

export { Alert, AlertIcon, AlertTitle, AlertDescription } from './components/alert';
export type { AlertProps, AlertIconProps } from './components/alert';

export { Typography, typographyVariants } from './components/typography';
export type { TypographyProps } from './components/typography';

export { Tag, tagVariants } from './components/tag';
export type { TagProps } from './components/tag';

export { Kbd } from './components/kbd';
export type { KbdProps } from './components/kbd';

export { SessionPill } from './components/session-pill';
export type { SessionPillProps } from './components/session-pill';

export { ProjectCard } from './components/project-card';
export type { ProjectCardProps } from './components/project-card';

export { CodePanel } from './components/code-panel';
export type { CodePanelProps } from './components/code-panel';

export { Diagram, DiagramAccent, DiagramWarm, DiagramDim } from './components/diagram';
export type { DiagramProps } from './components/diagram';

export { Toaster } from './components/toaster';
export type { ToasterProps } from './components/toaster';
export { toast } from 'sonner';

// Selector primitives — used by the shell's app-launcher page.
export { AppCard } from './components/app-card';
export type { AppCardProps } from './components/app-card';

export { AppGrid } from './components/app-grid';
export type { AppGridProps } from './components/app-grid';

export { AsciiPanel } from './components/ascii-panel';
export type { AsciiPanelProps } from './components/ascii-panel';

export { BarGrid } from './components/bar-grid';
export type { BarGridProps } from './components/bar-grid';

export { Changelog, ChangelogItem } from './components/changelog';
export type { ChangelogProps, ChangelogItemProps } from './components/changelog';

export { MetaGrid, MetaRow } from './components/meta-grid';
export type { MetaGridProps, MetaRowProps } from './components/meta-grid';

export { MonoMark } from './components/mono-mark';
export type { MonoMarkProps, MonoMarkSize } from './components/mono-mark';

export { StatusDot, statusDotVariants } from './components/status-dot';
export type { StatusDotProps, StatusVariant } from './components/status-dot';
