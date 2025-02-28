import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Search } from "lucide-react";

interface SearchCommandProps {
  onSelect: (value: string) => void;
  items: Array<{ id: string; name: string; type: string }>;
}

export function SearchCommand({ onSelect, items }: SearchCommandProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground hover:bg-accent">
          <Search className="h-4 w-4" />
          <span>Search restaurants and dishes...</span>
        </button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <Command>
          <CommandInput placeholder="Type to search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Restaurants">
              {items
                .filter((item) => item.type === "restaurant")
                .map((item) => (
                  <CommandItem key={item.id} onSelect={() => onSelect(item.id)}>
                    {item.name}
                  </CommandItem>
                ))}
            </CommandGroup>
            <CommandGroup heading="Dishes">
              {items
                .filter((item) => item.type === "dish")
                .map((item) => (
                  <CommandItem key={item.id} onSelect={() => onSelect(item.id)}>
                    {item.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
