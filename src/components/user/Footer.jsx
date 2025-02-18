import React from "react";
import { Typography } from "@material-tailwind/react";
import { FaTwitter, FaGithub, FaDiscord } from "react-icons/fa"; // Importing icons from react-icons

const SITEMAP = [
  {
    title: "Company",
    links: [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { name: "Men", path: "/men" },
      { name: "Women", path: "/women" },
      { name: "Boys", path: "/boys" },
      { name: "Girls", path: "/girls" },
    ],
  },
  {
    title: "Seller",
    links: [{ name: "Login", path: "/seller/login" }],
  },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative w-full bg-gray-900 text-white">
      <div className="mx-auto w-full max-w-7xl px-8 py-10">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {SITEMAP.map(({ title, links }, index) => (
            <div key={index} className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-4 font-bold uppercase opacity-75"
              >
                {title}
              </Typography>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <Typography key={linkIndex} as="li" color="blue-gray" className="font-normal">
                    <a
                      href={link.path}
                      className="inline-block py-1 pr-2 transition-transform hover:scale-105 hover:text-blue-400"
                      aria-label={link.name}
                    >
                      {link.name}
                    </a>
                  </Typography>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-6 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-blue-gray-300 md:mb-0"
          >
            &copy; {currentYear} <a href="/" target="_blank" rel="noopener noreferrer">VCare Mart</a>. All Rights Reserved.
          </Typography>
          <div className="flex gap-6 text-blue-gray-300 sm:justify-center">
            {/* Social Media Icons */}
            <a href="https://twitter.com" aria-label="Link to Twitter" className="transition-transform hover:scale-110">
              <FaTwitter className="h-6 w-6" />
            </a>
            <a href="https://github.com" aria-label="Link to GitHub" className="transition-transform hover:scale-110">
              <FaGithub className="h-6 w-6" />
            </a>
            <a href="https://discord.com" aria-label="Link to Discord" className="transition-transform hover:scale-110">
              <FaDiscord className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
