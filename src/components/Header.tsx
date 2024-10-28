import { ChevronsUpDown } from "lucide-react";
import { Link } from "@/components/ui/link";

export const Header = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <button
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-[200px] justify-between"
          role="combobox"
          aria-expanded="false"
          aria-label="Select a team"
          type="button"
          aria-haspopup="dialog"
          aria-controls="radix-:r2c:"
          data-state="closed"
        >
          <span className="relative flex shrink-0 overflow-hidden rounded-full mr-2 h-5 w-5">
            <img
              className="aspect-square h-full w-full grayscale"
              alt="Ariel Lee"
              src="https://avatar.vercel.sh/personal.png"
            />
          </span>
          Ariel Lee
          <ChevronsUpDown className="h-4 w-4" />
        </button>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6 text-muted-foreground">
          <Link href="/books">Books</Link>
          <Link href="/data">Data</Link>
          <Link href="/my-progress">My Progress</Link>
          <Link href="/scanner">Scanner</Link>
          <Link href="/settings">Settings</Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <div>
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:w-[100px] lg:w-[300px]"
              placeholder="Search..."
              type="search"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
