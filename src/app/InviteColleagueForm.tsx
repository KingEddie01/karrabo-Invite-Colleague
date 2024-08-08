"use client"

import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClose, AiOutlineCloseCircle, AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import styles from './InviteColleagueForm.module.css';

import { Colleague } from "./types";

interface InviteColleagueFormProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onFormSubmit: (newData: Colleague) => void;
  initialData: Colleague;
}

const InviteColleagueForm: React.FC<InviteColleagueFormProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  onFormSubmit,
  initialData
}) => {
  const [email, setEmail] = useState<string>(initialData?.email || '');
  const [roles, setRoles] = useState<string[]>(initialData?.roles || []);
  const [tempSelectedRoles, setTempSelectedRoles] = useState<string[]>([]);
  const [name, setName] = useState<string>(initialData?.name || '');
  const [department, setDepartment] = useState<string>(initialData?.department || '');
  const [jobTitle, setJobTitle] = useState<string>(initialData?.jobTitle || '');
  const [showRolesDropdown, setShowRolesDropdown] = useState<boolean>(false);
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const formRef = useRef<HTMLFormElement>(null);

  const [departmentFocused, setDepartmentFocused] = useState(false);
  const [roleFocused, setRoleFocused] = useState(false);
  const [isFullNameFocused, setIsFullNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isJobTitleFocused, setIsJobTitleFocused] = useState(false);

  useEffect(() => {
    if (!isDialogOpen) {
      // Reset form to default state when dialog is closed
      setName('');
      setEmail('');
      setRoles([]);
      setDepartment('');
      setJobTitle('');
      setTempSelectedRoles([]);
      setShowRolesDropdown(false);
    }
  }, [isDialogOpen]);

  useEffect(() => {
    setIsNameValid(name.trim().length > 0);
    setIsEmailValid(email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  }, [name, email]);

  const handleRoleChange = (role: string) => {
    setTempSelectedRoles(prevRoles => {
      if (prevRoles.includes(role)) {
        return prevRoles.filter(r => r !== role);
      } else {
        return [...prevRoles, role];
      }
    });
  };

  const handleAddRole = () => {
    setRoles(prevRoles => {
      const newRoles = [...prevRoles, ...tempSelectedRoles].filter((value, index, self) => self.indexOf(value) === index);
      return newRoles;
    });
    setTempSelectedRoles([]);
    setShowRolesDropdown(false);
  };

  const handleTagRemove = (role: string) => {
    setRoles(prevRoles => prevRoles.filter(r => r !== role));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isNameValid && isEmailValid) {
      onFormSubmit({
        id: initialData?.id || '',
        name,
        email,
        roles,
        department,
        jobTitle,
        status: 'Pending',
        image: initialData?.image || '', // Use initialData image or a default value
        num: initialData?.num || 0 // Use initialData num or a default value
      });
      setIsDialogOpen(false);
    }
  };

  const isContinueDisabled =
    !(name.trim()) ||
    !(department.trim()) ||
    !(jobTitle.trim()) ||
    !roles.length;

  const continueButtonClass = isContinueDisabled
    ? 'bg-gray-400 text-white cursor-not-allowed'
    : 'bg-[#276510] text-white hover:bg-[#276510]';

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className='mt-[-100px]'>
        <DialogHeader>
          <div className='flex justify-between pt-3 pb-3'>
            <div id='form-header'>
              <div className='flex flex-col gap-3'>
                <Image src='/Featured icon.png' width={48} height={48} alt='icon' />
                <DialogDescription>
                  Lorem ipsum
                </DialogDescription>
                <DialogTitle>Invite colleague</DialogTitle>
              </div>
            </div>
            <div className='pt-2'>
              <AiOutlineClose onClick={() => setIsDialogOpen(false)} className='cursor-pointer' />
            </div>
          </div>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className='flex flex-col gap-8'>
            <label className="relative flex">
              <Input
                id="fullName"
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                className="border-gray-600 py-6 outline-none"
                onFocus={() => setIsFullNameFocused(true)}
                onBlur={() => setIsFullNameFocused(false)}
                required
              />
              <span className={`text-[#667085] absolute left-0 top-3 px-3 transition duration-200 cursor-text ${isFullNameFocused || name.trim().length > 0 ? 'transform -translate-y-7 -translate-x-0 scale-75 bg-white' : ''}`}>
                Legal full name{(isFullNameFocused || name.trim().length > 0) && <span className="text-red-500">*</span>}
              </span>
            </label>
            <label className="relative flex">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="border-gray-600 py-6 outline-none"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                required
              />
              <span className={`text-[#667085] absolute left-0 top-3 px-3 transition duration-200 cursor-text ${isEmailFocused || email.trim().length > 0 ? 'transform -translate-y-7 -translate-x-0 scale-75 bg-white' : ''}`}>
                Email address{(isEmailFocused || email.trim().length > 0) && <span className="text-red-500">*</span>}
              </span>
            </label>
            <label className="relative flex">
              <select
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={`border-gray-600 cursor-pointer py-6 outline-none ${styles.customSelect}`}
                onFocus={() => setDepartmentFocused(true)}
                onBlur={() => setDepartmentFocused(false)}
                required
              >
                <option value="" disabled hidden></option>
                <option value="Executive Management">Executive Management</option>
                <option value="Board">Board</option>
                <option value="Compliance">Compliance</option>
              </select>
              <span className={`text-[#667085] absolute left-0 top-3 px-3 transition duration-200 cursor-text ${departmentFocused || department.trim().length > 0 ? 'transform -translate-y-7 -translate-x-0 scale-75 bg-white' : ''}`}>
                Department{(departmentFocused || department.trim().length > 0) && <span className="text-red-500">*</span>}
              </span>
            </label>
            <label className="relative flex">
              <Input
                id="jobTitle"
                type="text"
                value={jobTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobTitle(e.target.value)}
                className="border-gray-600 py-6 outline-none"
                onFocus={() => setIsJobTitleFocused(true)}
                onBlur={() => setIsJobTitleFocused(false)}
                required
              />
              <span className={`text-[#667085] absolute left-0 top-3 px-3 transition duration-200 cursor-text ${isJobTitleFocused || jobTitle.trim().length > 0 ? 'transform -translate-y-7 -translate-x-0 scale-75 bg-white' : ''}`}>
                Job Title{(isJobTitleFocused || jobTitle.trim().length > 0) && <span className="text-red-500">*</span>}
              </span>
            </label>

            <div>
              <div id="roles-container" className="relative cursor-pointer">
                <div className="flex items-center border-[1px] px-5 py-4 rounded-lg border-[#667085]" onClick={() => setShowRolesDropdown(!showRolesDropdown)}>
                  <div className="flex flex-wrap flex-grow">
                    {roles.map((role, index) => (
                      <div key={index} className="flex items-center border rounded-2xl p-1 mr-2 mb-2">
                        {role}
                        <AiOutlineCloseCircle
                          className="ml-2 cursor-pointer text-sm"
                          onClick={() => handleTagRemove(role)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center">
                    {showRolesDropdown ? (
                      <AiOutlineCaretUp
                        className="text-sm text-[#667085] cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event from bubbling up
                          setShowRolesDropdown(false);
                        }}
                      />
                    ) : (
                      <AiOutlineCaretDown
                        className="text-sm text-[#667085] cursor-pointer"
                        onClick={() => setShowRolesDropdown(true)}
                      />
                    )}
                  </div>
                </div>
                <label
                  htmlFor="role"
                  className={`absolute left-0 top-3 px-3 text-[#667085] transition duration-200 cursor-text ${roleFocused || roles.length > 0 ? 'transform -translate-y-7 -translate-x-0 scale-75 bg-white' : ''}`}
                >
                  Role{(roleFocused || roles.length > 0) && <span className="text-red-500">*</span>}
                </label>
                {showRolesDropdown && (
                  <div
                    id="rolesOptions"
                    className="absolute w-full z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg"
                  >
                    <div className="p-3">
                      {['Control', 'Module Owner', 'System Owner', 'Staff', 'Module Admin'].map(role => (
                        <div key={role} className={`flex items-center py-3 space-x-2 px-3 ${roles.includes(role) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <input
                            type="checkbox"
                            id={role}
                            className="w-5 h-5"
                            style={{ accentColor: '#276510' }}
                            checked={tempSelectedRoles.includes(role)}
                            onChange={() => handleRoleChange(role)}
                            disabled={roles.includes(role)} // Disable if role is already selected
                          />
                          <label
                            htmlFor={role}
                            className="text-sm text-[#48505E] font-normal"
                          >
                            {role}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="text-end p-3">
                      <Button onClick={handleAddRole} className='bg-[#276510] hover:bg-[#276510] px-10 py-5'>Add</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className='pt-5'>
              <Button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className='bg-transparent text-[#276510] px-10 py-5 text-md font-normal hover:bg-transparent'
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={`${continueButtonClass} px-10 py-5 text-md font-normal`}
                disabled={isContinueDisabled}
              >
                {isContinueDisabled ? 'Continue' : 'Done'}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteColleagueForm;
