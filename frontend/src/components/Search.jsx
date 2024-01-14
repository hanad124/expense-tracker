import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";
import { Card } from "./ui/card";
import { BiSearch } from "react-icons/bi";
import { useState, useEffect } from "react";

const Search = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      <Card
        className="max-h-fit flex items-center border-[.5px] border-slate-200 dark:border-[.5px] dark:border-slate-700 gap-2 px-2 py-2  min-w-[15rem] rounded-md cursor-pointer "
        onClick={() => setOpen(true)}
      >
        <BiSearch className="h-5 w-5 text-gray-400 " />
        <span className="text-slate-400 h-full inline"> search</span>
      </Card>
      <Command>
        <CommandDialog
          // open={open}
          // onOpenChange={setOpen}
          className=" dark:border-[.7px] dark:border-slate-700"
        >
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </Command>
    </div>
  );
};

export default Search;
