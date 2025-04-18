import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  IconButton,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  InformationCircleIcon,
  PowerIcon,
  Bars3Icon, // Import menu icon
  XMarkIcon, // Import close icon
} from "@heroicons/react/24/solid";

import logo from "../assets/images/logo.png";

export function DefaultSidebar() {
  const [selectedItem, setSelectedItem] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Home Screen", icon: HomeIcon, id: "Home" },
    { name: "History", icon: ClipboardDocumentListIcon, id: "History" },
    { name: "About", icon: InformationCircleIcon, id: "About" },
    { name: "Settings", icon: Cog6ToothIcon, id: "Settings" },
    { name: "Log Out", icon: PowerIcon, id: "LogOut" },
  ];

  return (
    <div className="relative">
      <IconButton
        className="absolute z-50 lg:hidden top-4 left-4"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </IconButton>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      />
      <Card
        className={`h-[calc(100vh-2rem)] w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5 fixed lg:static top-0 left-0 z-50 transition-transform transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 mb-2">
          <Typography variant="h5" color="blue-gray">
            <img src={logo} alt="Logo" className="mb-4 w-25 h-7" />
          </Typography>
          <hr className="w-full mt-2 mb-4 border-gray-300" />
        </div>
        <List className="space-y-1">
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              className={`flex items-center space-x-3 cursor-pointer p-2 ${
                selectedItem === item.id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 text-gray-800"
              }`}
              onClick={() => setSelectedItem(item.id)}
            >
              <ListItemPrefix>
                <item.icon
                  className={`w-6 h-6 ${
                    selectedItem === item.id ? "text-white" : "text-gray-600"
                  }`}
                />
              </ListItemPrefix>
              <span
                className={`${
                  selectedItem === item.id ? "text-white" : "text-gray-800"
                }`}
              >
                {item.name}
              </span>
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
}
