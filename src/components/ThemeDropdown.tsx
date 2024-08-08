import { useTheme } from 'next-themes'; // Make sure to import this
import { Monitor, Sun, Moon, Check } from 'lucide-react'; // Ensure these icons are imported
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'; // Adjust import path as necessary

export function ThemeDropdown() {
  const { theme, setTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="mr-2 size-4" />;
      case 'dark':
        return <Moon className="mr-2 size-4" />;
      default:
        return <Monitor className="mr-2 size-4" />;
    }
  };

  const getThemeName = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      default:
        return 'System';
    }
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="text-base text-brand-hover dark:text-brand-secondary2 focus:bg-brand-surface hover:dark:bg-brand-bg flex">
        {getThemeIcon()}
        {getThemeName()} Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Monitor className="mr-2 size-4" />
            System default
            {theme === "system" && <Check className="ms-2 size-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 size-4" />
            Light
            {theme === "light" && <Check className="ms-2 size-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 size-4" />
            Dark
            {theme === "dark" && <Check className="ms-2 size-4" />}
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}