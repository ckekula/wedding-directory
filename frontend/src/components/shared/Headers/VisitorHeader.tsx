"use client";
import Link from "next/link";
import { Fragment, useState, useEffect, useRef } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import Image from "next/image";
import { useAuth } from "@/contexts/VisitorAuthContext";
import SearchBar from "../SearchBar";
import { useQuery } from "@apollo/client";
import { GET_VISITOR_BY_ID } from "@/graphql/queries";


const VisitorHeader = () => {
  const { visitor, logout } = useAuth();
  const [profilePic, setProfilePic] = useState<string>("/images/visitorPlaceholder.png"); // Default placeholder
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Fetch visitor data including profile_pic_url on component load
  const { loading, error } = useQuery(GET_VISITOR_BY_ID, {
    variables: { id: visitor?.id },
    skip: !visitor?.id,
    onCompleted: (data) => {
      if (data?.findVisitorById?.profile_pic_url) {
        setProfilePic(data.findVisitorById.profile_pic_url);
      }
    },
  });

  // Handle dropdown toggle
  const handleProfileClick = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  if (loading) return null;  
  if (error) return <p>Error loading profile picture</p>;

  return (
    <Fragment>
      <header className="py-6 xl:py-6 text-black bg-white">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-text font-title">
                Say I Do
              </h1>
            </Link>
          </div>

          {/* Search bar */}
          <div className="flex flex-1 justify-center">
            <SearchBar
              showIcon={false}
              placehHolderText="search venues, caterers, etc."
            />
          </div>

          {/* Dashboard, Notifications, and Profile dropdown */}
          <div className="flex items-center justify-end gap-8 text-xl font-title text-text">
            
            <Link href="/visitor-dashboard">Dashboard</Link>
            <Link href="/vendor-search">Vendors</Link>
            <Link href="/help">Help</Link>
            <Link href="/notifications">
              <IoIosNotificationsOutline className="w-[36px] h-[36px]" />
            </Link>
            {/* Profile dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <Image
                src={profilePic} // Display the fetched profile picture URL or placeholder
                alt="profile picture"
                className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer"
                width={50}
                height={50}
                layout="fixed"
                onClick={handleProfileClick}
              />
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                  <Link href="/visitor-profile">
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-title text-lg">
                      Profile
                    </p>
                  </Link>
                  <p
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-title text-lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default VisitorHeader;
