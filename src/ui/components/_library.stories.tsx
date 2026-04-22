import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  AppCard,
  AppGrid,
  AsciiPanel,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  Badge,
  BarGrid,
  BottomNav,
  BottomNavItem,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Changelog,
  ChangelogItem,
  Checkbox,
  Chip,
  CodePanel,
  Diagram,
  DiagramAccent,
  DiagramDim,
  DiagramWarm,
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  FAB,
  Input,
  Kbd,
  Label,
  MetaGrid,
  MetaRow,
  MonoMark,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  ProjectCard,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  SegmentedControl,
  SegmentedControlItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  SessionPill,
  Skeleton,
  Slider,
  StatusDot,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Textarea,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Typography,
  toast,
} from '../index';

const meta = {
  title: 'Library/All components',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: { disable: true },
    a11y: { disable: false },
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Section wrapper: heading + a flexible content region. */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-border px-8 py-10">
      <h2 className="mb-6 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-accent">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Sub-row inside a section: small dim label + the variant grid. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-[180px_1fr]">
      <div className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-text-dim">
        {label}
      </div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/**
 * The single library view — every component, every variant, no controls. Use
 * the toolbar's Theme + Accent globals to see how each renders across all
 * accent permutations.
 */
export const AllComponents: Story = {
  render: () => (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border px-8 py-6">
        <Typography variant="display" className="text-[1.6rem]">
          shell-kit · component library
        </Typography>
        <Typography variant="small" className="text-text-muted">
          Every public component, every variant. Switch theme + accent in the toolbar above.
        </Typography>
      </header>

      {/* ---------- Typography ---------- */}
      <Section title="Typography">
        <Row label="display">
          <Typography variant="display">Honest engineering</Typography>
        </Row>
        <Row label="h1">
          <Typography variant="h1">Start with the simplest</Typography>
        </Row>
        <Row label="h2">
          <Typography variant="h2">Three small invariants</Typography>
        </Row>
        <Row label="h3">
          <Typography variant="h3">Session pairing</Typography>
        </Row>
        <Row label="body">
          <Typography variant="body">
            The default paragraph — sans serif, balanced wrap.
          </Typography>
        </Row>
        <Row label="small">
          <Typography variant="small">Supporting text and metadata.</Typography>
        </Row>
        <Row label="mono-label">
          <Typography variant="mono-label">system / v0.1</Typography>
        </Row>
        <Row label="code">
          <Typography variant="code">{`const shell = new Shell()`}</Typography>
        </Row>
        <Row label="h2 + withAccent">
          <Typography variant="h2" withAccent>
            Capabilities
          </Typography>
        </Row>
      </Section>

      {/* ---------- Buttons ---------- */}
      <Section title="Buttons">
        <Row label="variants">
          <Button variant="brand">Brand</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </Row>
        <Row label="sizes">
          <Button variant="brand" size="sm">
            Small
          </Button>
          <Button variant="brand">Default</Button>
          <Button variant="brand" size="lg">
            Large
          </Button>
          <Button variant="brand" size="icon" aria-label="Icon">
            →
          </Button>
        </Row>
        <Row label="disabled">
          <Button variant="brand" disabled>
            Brand
          </Button>
          <Button variant="primary" disabled>
            Primary
          </Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button variant="ghost" disabled>
            Ghost
          </Button>
          <Button variant="destructive" disabled>
            Destructive
          </Button>
        </Row>
      </Section>

      {/* ---------- Form inputs ---------- */}
      <Section title="Form inputs">
        <Row label="Input">
          <Input placeholder="Email" />
          <Input placeholder="Disabled" disabled />
        </Row>
        <Row label="Textarea">
          <Textarea placeholder="Message" rows={3} />
        </Row>
        <Row label="Label + Input">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lib-input">Project name</Label>
            <Input id="lib-input" placeholder="canopy" />
          </div>
        </Row>
        <Row label="Checkbox">
          <Checkbox aria-label="default" />
          <Checkbox defaultChecked aria-label="checked" />
          <Checkbox disabled aria-label="disabled" />
          <Checkbox disabled defaultChecked aria-label="disabled-checked" />
        </Row>
        <Row label="RadioGroup">
          <RadioGroup defaultValue="b" className="flex gap-3">
            <div className="flex items-center gap-2">
              <RadioGroupItem id="ra" value="a" />
              <Label htmlFor="ra">A</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="rb" value="b" />
              <Label htmlFor="rb">B</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="rc" value="c" />
              <Label htmlFor="rc">C</Label>
            </div>
          </RadioGroup>
        </Row>
        <Row label="Switch">
          <Switch aria-label="off" />
          <Switch defaultChecked aria-label="on" />
          <Switch disabled aria-label="disabled" />
        </Row>
        <Row label="Select">
          <Select defaultValue="warm">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="teal">Teal</SelectItem>
              <SelectItem value="warm">Warm</SelectItem>
              <SelectItem value="mono">Mono</SelectItem>
            </SelectContent>
          </Select>
        </Row>
        <Row label="Slider">
          <div className="w-[260px]">
            <Slider defaultValue={[60]} max={100} step={1} />
          </div>
        </Row>
        <Row label="ToggleGroup">
          <ToggleGroup type="single" defaultValue="b">
            <ToggleGroupItem value="a">A</ToggleGroupItem>
            <ToggleGroupItem value="b">B</ToggleGroupItem>
            <ToggleGroupItem value="c">C</ToggleGroupItem>
          </ToggleGroup>
        </Row>
        <Row label="Toggle">
          <Toggle aria-label="off">Bold</Toggle>
          <Toggle defaultPressed aria-label="on">
            Italic
          </Toggle>
        </Row>
        <Row label="SegmentedControl">
          <SegmentedControl defaultValue="dark">
            <SegmentedControlItem value="dark">dark</SegmentedControlItem>
            <SegmentedControlItem value="light">light</SegmentedControlItem>
          </SegmentedControl>
        </Row>
      </Section>

      {/* ---------- Badges, tags, kbd, status ---------- */}
      <Section title="Badges, tags, kbd, status">
        <Row label="Badge">
          <Badge>default</Badge>
          <Badge variant="solid">solid</Badge>
          <Badge variant="subtle">subtle</Badge>
          <Badge variant="outline">outline</Badge>
          <Badge variant="warm">warm</Badge>
          <Badge variant="destructive">destructive</Badge>
        </Row>
        <Row label="Tag">
          <Tag>typescript</Tag>
          <Tag variant="accent">react</Tag>
          <Tag variant="warm">wip</Tag>
        </Row>
        <Row label="Chip">
          <Chip>All</Chip>
          <Chip active>Active</Chip>
          <Chip count={12}>Codes</Chip>
        </Row>
        <Row label="Kbd">
          <Kbd>⌘K</Kbd>
          <Kbd>Esc</Kbd>
        </Row>
        <Row label="StatusDot">
          <StatusDot status="live" />
          <StatusDot status="dev" />
          <StatusDot status="soon" />
          <StatusDot status="paused" />
        </Row>
        <Row label="SessionPill">
          <SessionPill>
            <StatusDot status="live" />
            <span>signed in as rob</span>
          </SessionPill>
          <SessionPill>
            <StatusDot status="dev" />
            <span>visiting</span>
          </SessionPill>
        </Row>
      </Section>

      {/* ---------- Avatars + progress + skeleton ---------- */}
      <Section title="Avatars, progress, skeleton">
        <Row label="Avatar">
          <Avatar>
            <AvatarFallback>RS</AvatarFallback>
          </Avatar>
          <Avatar presence="live">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar presence="idle">
            <AvatarFallback>EA</AvatarFallback>
          </Avatar>
          <Avatar presence="off">
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
        </Row>
        <Row label="AvatarGroup">
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>EA</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>+3</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </Row>
        <Row label="Progress">
          <div className="w-[260px]">
            <Progress value={64} />
          </div>
        </Row>
        <Row label="Skeleton">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-48 rounded-md" />
        </Row>
      </Section>

      {/* ---------- Cards ---------- */}
      <Section title="Cards">
        <Row label="Card">
          <Card className="w-full max-w-[420px]">
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>Card description sits in the header.</CardDescription>
            </CardHeader>
            <CardContent>
              <Typography variant="small">Body content goes here.</Typography>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm">
                Action
              </Button>
            </CardFooter>
          </Card>
        </Row>
        <Row label="ProjectCard">
          <ProjectCard
            title="Canopy"
            status="paused · 2024"
            statusVariant="paused"
            tags={
              <>
                <Tag>typescript</Tag>
                <Tag>next.js</Tag>
                <Tag variant="accent">monorepo</Tag>
              </>
            }
            description="A boutique pre-order and discovery platform for artisan market traders."
            arrow="read the architecture →"
            href="#"
            className="w-full max-w-[420px]"
          />
          <ProjectCard
            title="Squidward3n"
            status="demoable · v0.3"
            statusVariant="live"
            tags={
              <>
                <Tag>electron</Tag>
                <Tag>react 19</Tag>
              </>
            }
            description="Electron desktop app for orchestrating Claude Code agents."
            arrow="read the architecture →"
            href="#"
            className="w-full max-w-[420px]"
          />
        </Row>
        <Row label="AppCard">
          <AppCard
            title="Portfolio"
            description="Robert Scholey — full-stack engineer with a frontend specialism"
            visualMark="rs."
            tags={
              <>
                <Tag>next.js</Tag>
                <Tag>shell-kit</Tag>
              </>
            }
            meta="v0.3 · 2d ago"
            arrow="enter →"
            accent="warm"
            href="#"
            className="w-[280px]"
          />
        </Row>
      </Section>

      {/* ---------- Alerts ---------- */}
      <Section title="Alerts">
        <Row label="Alert">
          <Alert className="w-full max-w-[540px]">
            <AlertTitle>Default alert</AlertTitle>
            <AlertDescription>The site you're on is itself a sub-app.</AlertDescription>
          </Alert>
          <Alert variant="warm" className="w-full max-w-[540px]">
            <AlertTitle>Warm alert</AlertTitle>
            <AlertDescription>Used for cautionary or noteworthy info.</AlertDescription>
          </Alert>
          <Alert variant="destructive" className="w-full max-w-[540px]">
            <AlertTitle>Destructive alert</AlertTitle>
            <AlertDescription>For irreversible or error states.</AlertDescription>
          </Alert>
        </Row>
        <Row label="AlertDialog">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Open AlertDialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this code?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Sessions using it will be terminated.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Row>
        <Row label="Toaster">
          <Toaster />
          <Button variant="primary" onClick={() => toast.success('Code created')}>
            Fire success toast
          </Button>
          <Button variant="destructive" onClick={() => toast.error('Code deleted')}>
            Fire error toast
          </Button>
        </Row>
      </Section>

      {/* ---------- Overlays ---------- */}
      <Section title="Overlays (click triggers)">
        <Row label="Dialog">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog title</DialogTitle>
                <DialogDescription>Used for focused tasks.</DialogDescription>
              </DialogHeader>
              <DialogBody>
                <Input placeholder="Type something..." />
              </DialogBody>
              <DialogFooter>
                <Button variant="ghost">Cancel</Button>
                <Button variant="primary">Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Row>
        <Row label="Drawer">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="primary">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Drawer title</DrawerTitle>
                <DrawerDescription>Mobile-native bottom sheet.</DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <Typography variant="small">Drawer body content.</Typography>
              </div>
            </DrawerContent>
          </Drawer>
        </Row>
        <Row label="Popover">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Typography variant="small">A small floating panel.</Typography>
            </PopoverContent>
          </Popover>
        </Row>
        <Row label="Tooltip">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">Hover for tooltip</Button>
              </TooltipTrigger>
              <TooltipContent>Tooltip content</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Row>
        <Row label="DropdownMenu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Open menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Row>
      </Section>

      {/* ---------- Structure ---------- */}
      <Section title="Structure">
        <Row label="Tabs">
          <Tabs defaultValue="overview" className="w-full max-w-[540px]">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Typography variant="small">Overview tab content.</Typography>
            </TabsContent>
            <TabsContent value="settings">
              <Typography variant="small">Settings tab content.</Typography>
            </TabsContent>
            <TabsContent value="logs">
              <Typography variant="small">Logs tab content.</Typography>
            </TabsContent>
          </Tabs>
        </Row>
        <Row label="Accordion">
          <Accordion type="single" collapsible className="w-full max-w-[540px]">
            <AccordionItem value="a">
              <AccordionTrigger>Item one</AccordionTrigger>
              <AccordionContent>First panel content.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Item two</AccordionTrigger>
              <AccordionContent>Second panel content.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Row>
        <Row label="Table">
          <Table className="w-full max-w-[540px]">
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last seen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>XYZ</TableCell>
                <TableCell>active</TableCell>
                <TableCell>2m ago</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ABC</TableCell>
                <TableCell>idle</TableCell>
                <TableCell>1h ago</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Row>
        <Row label="ScrollArea">
          <ScrollArea className="h-32 w-[260px] rounded-md border border-border p-3">
            <Typography variant="small">
              {Array.from({ length: 12 }).map((_, i) => (
                <p key={i}>Scrollable line {i + 1}</p>
              ))}
            </Typography>
          </ScrollArea>
        </Row>
        <Row label="Separator">
          <div className="flex w-[260px] items-center gap-3">
            <Typography variant="small">left</Typography>
            <Separator className="flex-1" />
            <Typography variant="small">right</Typography>
          </div>
        </Row>
      </Section>

      {/* ---------- Visual primitives ---------- */}
      <Section title="Visual primitives">
        <Row label="Diagram">
          <Diagram>
            {`shell ── auth ── postgres
  │
  └── portfolio (iframe)`}
          </Diagram>
        </Row>
        <Row label="Diagram colours">
          <div className="flex flex-col gap-1">
            <DiagramAccent>accent line</DiagramAccent>
            <DiagramWarm>warm line</DiagramWarm>
            <DiagramDim>dim line</DiagramDim>
          </div>
        </Row>
        <Row label="CodePanel">
          <CodePanel filename="src/app.ts" tag="// shell">
            {`const shell = createShell({ origin })
shell.on('ready', () => {})`}
          </CodePanel>
        </Row>
        <Row label="AsciiPanel">
          <AsciiPanel>
            {`+--------+
|  rs.   |
+--------+`}
          </AsciiPanel>
        </Row>
        <Row label="BarGrid">
          <BarGrid />
          <BarGrid bars={[20, 60, 40, 80, 30, 90, 55]} />
        </Row>
        <Row label="MonoMark">
          <MonoMark size="sm" letter="r" />
          <MonoMark letter="s" />
          <MonoMark size="md" letter="·" />
        </Row>
        <Row label="MetaGrid">
          <MetaGrid>
            <MetaRow k="status" v="live" />
            <MetaRow k="version" v="0.3.0" />
            <MetaRow k="updated" v="2d ago" />
          </MetaGrid>
        </Row>
        <Row label="Changelog">
          <Changelog>
            <ChangelogItem app="portfolio" when="2d ago" accent="warm">
              Hero polish + new collaboration row
            </ChangelogItem>
            <ChangelogItem app="admin" when="1w ago" accent="fsgb">
              Online-now panel surfaces active sessions
            </ChangelogItem>
            <ChangelogItem app="shell" when="2w ago" accent="teal">
              Per-sub-app accent now applied via data attribute
            </ChangelogItem>
          </Changelog>
        </Row>
      </Section>

      {/* ---------- Sub-app chrome ---------- */}
      <Section title="Sub-app chrome (admin / shell)">
        <Row label="AppGrid">
          <AppGrid className="w-full">
            <AppCard
              title="Portfolio"
              description="Robert Scholey"
              visualMark="rs."
              meta="v0.3 · 2d ago"
              arrow="enter →"
              accent="warm"
              href="#"
            />
            <AppCard
              title="Admin"
              description="Platform administration"
              visualMark="ad."
              meta="v0.2 · 1w ago"
              arrow="enter →"
              accent="fsgb"
              href="#"
            />
            <AppCard
              title="Canopy"
              description="Headless content layer (paused)"
              visualMark="cp."
              meta="paused"
              arrow="enter →"
              placeholder
              href="#"
            />
          </AppGrid>
        </Row>
        <Row label="BottomNav">
          <BottomNav className="relative w-full max-w-[420px]">
            <BottomNavItem icon="●" active>
              Home
            </BottomNavItem>
            <BottomNavItem icon="◆">Access</BottomNavItem>
            <BottomNavItem icon="▣">Apps</BottomNavItem>
            <BottomNavItem icon="✉" badge={3}>
              Messages
            </BottomNavItem>
          </BottomNav>
        </Row>
        <Row label="FAB">
          <div className="relative h-24 w-24">
            <FAB aria-label="Create">+</FAB>
          </div>
        </Row>
      </Section>
    </div>
  ),
};
