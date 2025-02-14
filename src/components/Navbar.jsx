import React from 'react';
import { Github, Menu } from 'lucide-react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { categories } from './constants/categories';

// Logo component with updated styling
const Logo = () => (
    <div className="flex items-center space-x-2">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Ani<span className="text-blue-500">Watch</span>
        </div>
    </div>
);

// Navigation links with updated structure
const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/animes", label: "Anime List" },
    { href: "/watchlist", label: "My List" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
];

// Enhanced NavLink component with hover effects
const NavLink = ({ href, children, className }) => (
    <NavigationMenuLink 
        className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 
        hover:bg-blue-900/20 hover:text-blue-400 
        focus:bg-blue-900/30 focus:text-blue-300 focus:outline-none 
        disabled:pointer-events-none disabled:opacity-50 ${className}`}
        href={href}>
        {children}
    </NavigationMenuLink>
);

// Enhanced mobile navigation
const MobileNav = () => (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden ml-2 hover:bg-blue-900/20">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu principal</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 bg-gray-950 border-r border-blue-900/30">
            <SheetHeader>
                <SheetTitle className="text-left">Navigation</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-4rem)] pr-4">
                <div className="mb-8 mt-4">
                    <Logo />
                </div>
                <div className="flex flex-col space-y-2">
                    {navigationLinks.map(({ href, label }) => (
                        <SheetClose asChild key={href}>
                            <a 
                                href={href} 
                                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors
                                hover:bg-blue-900/20 hover:text-blue-400"
                            >
                                <span>{label}</span>
                            </a>
                        </SheetClose>
                    ))}
                    <div className="my-4 border-t border-blue-900/30" />
                    <div className="px-3 text-sm font-medium text-blue-400">Categories</div>
                    <div className="grid gap-1 mt-2">
                        {categories.map((category) => (
                            <SheetClose asChild key={category}>
                                <a
                                    href={`/category/${category.toLowerCase()}`}
                                    className="rounded-lg px-3 py-2 text-sm transition-colors
                                    hover:bg-blue-900/20 hover:text-blue-400"
                                >
                                    {category}
                                </a>
                            </SheetClose>
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </SheetContent>
    </Sheet>
);

// Enhanced desktop navigation
const DesktopNav = () => (
    <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList className="space-x-1">
            {navigationLinks.map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                    <NavLink href={href}>{label}</NavLink>
                </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:bg-blue-900/20 hover:text-blue-400">
                    Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:grid-cols-3 bg-gray-950 border border-blue-900/30 rounded-lg">
                        {categories.map((category) => (
                            <li key={category}>
                                <NavigationMenuLink 
                                    className="block select-none space-y-1 rounded-md p-3 leading-none transition-colors
                                    hover:bg-blue-900/20 hover:text-blue-400 focus:bg-blue-900/30 focus:text-blue-300"
                                    href={`/category/${category.toLowerCase()}`}>
                                    {category}
                                </NavigationMenuLink>
                            </li>
                        ))}
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
);

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-blue-900/30 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/80">
            <div className="container mx-auto">
                <div className="flex h-16 items-center justify-between px-4">
                    <div className="flex items-center">
                        <Logo />
                        <MobileNav />
                    </div>

                    <div className="flex-1 flex justify-center">
                        <DesktopNav />
                    </div>

                    <div className="flex items-center">
                        <a
                            href="https://github.com/DarkZangetsu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:text-blue-400 transition-colors duration-200"
                            aria-label="Voir le projet sur GitHub"
                        >
                            <Github className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;