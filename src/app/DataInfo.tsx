import React, { useState } from 'react';
import UpdateColleagueRole from './UpdateColleagueRoleForm';
import { PopoverDemo } from './PopUpModal';
import { Colleague } from "./types"; 

const ParentComponent: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [colleagueData, setColleagueData] = useState<Colleague | null>(null);

  const handleUpdateRoleClick = (selectedRole: Colleague | null) => {
    if (selectedRole) {
      setColleagueData(selectedRole);
      setIsDialogOpen(true);
    }
  };

  const handleFormSubmit = (newData: Colleague) => {
    console.log('Updated Colleague Data:', newData);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <PopoverDemo
        onClose={() => setColleagueData(null)}
        setIsUpdateDialogOpen={setIsDialogOpen}
        colleague={colleagueData}
      />
      {colleagueData && (
        <UpdateColleagueRole
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          onFormSubmit={handleFormSubmit}
          initialData={colleagueData}
        />
      )}
    </div>
  );
};

export default ParentComponent;
