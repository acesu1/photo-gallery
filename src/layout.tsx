import { Link, Outlet } from "react-router-dom";
import { Header } from "./components/header";
import { Button } from "./components/ui/button";
import { Album, Folder, Heart } from "lucide-react";

function SideMenu() {
  return (
    <div className="space-y-4">
      <h2 className="s">Manage</h2>
      <div className="flex flex-col gap-2">
        <Button className="justify-start" variant="ghost" asChild>
          <Link to="/">
            <Folder />
            Gallery
          </Link>
        </Button>
        <Button className="justify-start" variant="ghost" asChild>
          <Link to="/albums">
            <Album />
            Albums
          </Link>
        </Button>
        <Button className="justify-start" variant="ghost" asChild>
          <Link to="/favorites">
            <Heart />
            Favorites
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 gap-20 p-8 pt-6">
        <SideMenu />
        <Outlet />
      </div>
    </div>
  );
}
