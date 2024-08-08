"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AiOutlineSearch, AiOutlineMore } from "react-icons/ai";
import { Data } from "@/components/data";
import Image from "next/image";
import InviteColleagueForm from "./InviteColleagueForm";
import UpdateColleagueRoleForm from "./UpdateColleagueRoleForm";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PopoverDemo } from "@/app/PopUpModal";
import { Colleague } from "./types";
import { ToastSimple } from "./Toast";

export default function Home() {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Default to page 1
  const [tableData, setTableData] = useState<Colleague[]>(Data.filter((item): item is Colleague => item !== undefined));
  const [popupIndex, setPopupIndex] = useState<number | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ top: number; left: number } | null>(null);
  const [selectedRole, setSelectedRole] = useState<Colleague | null>(null);
  const [showToast, setShowToast] = useState(false);

  const itemsPerPage = 10;
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const filteredData = tableData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(item.roles) ? item.roles.join(', ').toLowerCase().includes(searchTerm.toLowerCase()) : false)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFormSubmit = (newData: Colleague) => {
    const updatedData = {
      ...newData,
      status: newData.status || "Pending",
      image: newData.image || "/path/to/blank-image.png", // Provide the path to your blank image
    };
    setTableData((prevData) => [...prevData, updatedData]);
    setIsInviteDialogOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleUpdateFormSubmit = (updatedData: Colleague) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === updatedData.id ? updatedData : item
      )
    );
    setIsUpdateDialogOpen(false);
  };

  const handleMoreClick = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    if (iconRefs.current[index]) {
      const { top, left, height } = iconRefs.current[index].getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      const isLastRow = index === currentItems.length - 1;

      setPopoverPosition({
        top: isLastRow
          ? top - 70 + scrollTop
          : top + height + scrollTop,
        left: left - 100,
      });
    }
    setPopupIndex(index);
    setSelectedRole(currentItems[index] || null);
  };

  const closePopover = () => {
    setPopupIndex(null);
    setPopoverPosition(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        closePopover();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col flex-grow p-3">
        <div className="flex justify-between items-center mb-4">
          <div >
            <h2 className="font-bold">All Staff ({filteredData.length})</h2>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <Image
                src={"/Filter-list.png"}
                width={16}
                height={16}
                alt="filter List"
              />
              <p className="text-[#276510]">Filter by</p>
            </div>
            <div className="flex items-center relative">
              <AiOutlineSearch className="absolute w-6 h-6 text-gray-300 ml-4 " />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[239px] h-[44px] border-2 border-gray-200 rounded-md pl-10 self-center outline-none"
                />
              </div>
            </div>
            <div >
              <button
                className="bg-[#276510] w-[150px] h-[43px] text-white rounded-sm text-sm"
                onClick={() => setIsInviteDialogOpen(true)}
              >
                + Invite Colleague
              </button>
            </div>
          </div>
        </div>
        <div className="flex-grow overflow-auto">
          {filteredData.length === 0 ? (
            <div className="flex justify-center items-center flex-col gap-4 h-[calc(100vh-150px)]">
              <Image
                src={'/Group 26817.png'}
                width={150}
                height={125}
                alt="empty-data"
              />
              <p className="text-lg  text-[#858D9D]">No colleague to display</p>
              <button
                className="bg-transparent  text-[#276510] flex gap-2
                 items-center"
                onClick={() => setIsInviteDialogOpen(true)}
              >
               <span className="text-4xl ">+</span>  
               <span>Invite Colleague</span>
              </button>
            </div>
          ) : (
            <Table className="overflow-hidden">
              {currentItems.length > 0 && (
                <TableHeader>
                  <TableRow className="bg-[#F0F1F3] text-center w-96 h-16 ">
                    <TableHead className="font-normal text-black text-left pl-7">
                      Name
                    </TableHead>
                    <TableHead className="font-normal text-black">Job title</TableHead>
                    <TableHead className="font-normal text-black">Department</TableHead>
                    <TableHead className="font-normal text-black">Status</TableHead>
                    <TableHead className="font-normal text-black">Roles</TableHead>
                    <TableHead className="font-normal text-black"></TableHead>
                  </TableRow>
                </TableHeader>
              )}
              <TableBody>
                {currentItems.map((item, index) => (
                  item && (
                    <TableRow key={item.id}>
                      <TableCell className="flex gap-2 items-center pl-7">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt="pic"
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-full text-"></div> // Placeholder for missing image
                        )}
                        {item.name}
                      </TableCell>
                      <TableCell>{item.jobTitle}</TableCell>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>
                        <span
                          className={
                            item.status === "Active"
                              ? "rounded-xl border-1 px-2 py-1 text-[#17B26A] bg-[#E9F0E7] font-normal"
                              : item.status === "Pending"
                              ? "rounded-xl border-1 py-1 px-2 text-[#F79009] bg-[#FEF4E6] font-normal"
                              : "rounded-xl border-1 py-1 px-2 text-[#DA3E33] bg-[#FDEEE9] font-normal"
                          }
                        >
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center items-center gap-4">
                          {item.roles.length > 0 && (
                            <span className="rounded-xl border-1 px-2 text-[#DA3E33] bg-[#FDEEE9] font-normal">
                              {item.roles[0]}
                            </span>
                          )}
                          {item.roles.length > 1 && (
                            <span className="ml-2 rounded-xl border px-2 bg-[transparent] font-normal">
                              +{item.roles.length - 1}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="relative">
                        <div
                          ref={(el) => {
                            if (el) iconRefs.current[index] = el;
                          }}
                          onClick={(e) => handleMoreClick(index, e)}
                          className="w-10 h-10 flex items-center justify-center cursor-pointer"
                        >
                          <AiOutlineMore className="text-lg" />
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      {popupIndex !== null && popoverPosition && (
        <div
          ref={popoverRef}
          style={{
            position: "fixed",
            top: popoverPosition.top,
            left: popoverPosition.left,
            width: "225px",
            background: "white",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
            borderRadius: "8px",
          }}
        >
          <PopoverDemo
            onUpdateRole={(role) => {
              if (role) setIsUpdateDialogOpen(true);
            }}
            selectedRole={selectedRole}
          />
        </div>
        
      )}
      {showToast && <ToastSimple/>}
     <div className="py-4 mt-auto">
          <Pagination>
            <PaginationContent className="flex justify-between items-center w-full">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={
                    currentPage === 1
                      ? "cursor-not-allowed opacity-50 text-green-900"
                      : "text-green-900"
                  }
                />
              </PaginationItem>
              <div className="flex">
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === index + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(index + 1);
                      }}
                      className={`rounded-full px-3 py-1 ${
                        currentPage === index + 1
                          ? "bg-[#E8F7F0] text-black border-1"
                          : "text-black border-1"
                      }`}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </div>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "cursor-not-allowed opacity-50 text-[#276510]"
                      : "text-[#276510]"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

      <InviteColleagueForm
        isDialogOpen={isInviteDialogOpen}
        setIsDialogOpen={setIsInviteDialogOpen}
        onFormSubmit={handleFormSubmit}
        initialData={{
          id: "",
          name: "",
          email: "",
          jobTitle: "",
          department: "",
          roles: [],
          status: "Pending",
        }}
      />
      <UpdateColleagueRoleForm
        isDialogOpen={isUpdateDialogOpen}
        setIsDialogOpen={setIsUpdateDialogOpen}
        initialData={selectedRole || {
          id: "",
          name: "",
          email: "",
          jobTitle: "",
          department: "",
          roles: [],
          status: "",
        }}
        onFormSubmit={handleUpdateFormSubmit}
      />
    </div>
  );
}
