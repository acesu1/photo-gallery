import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-6">
        <Link to="/">PHOTO GALLERY</Link>

        <div className="ml-auto flex items-center space-x-3">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}