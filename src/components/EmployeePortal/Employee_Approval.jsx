import React, { useEffect, useState } from 'react';

const Employee_Approval = () => {
  const [requestName, setRequestName] = useState('');
  const [priority, setPriority] = useState('medium');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [openFormButtonVisible, setOpenFormButtonVisible] = useState(true);

  useEffect(() => {
    // Fetch user details from the API
    fetch('http://localhost:8081/userDetails')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching user details:', error));
  }, []);

  useEffect(() => {
    // Update displayed users based on all selected user details
    const updatedDisplayedUsers = selectedUsers.map((index) => users[index]);
    setDisplayedUsers(updatedDisplayedUsers);
  }, [selectedUsers, users]);

  const handleUserSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => parseInt(option.value, 10)
    );

    // Enforce a maximum of 4 selections
    const latestSelections = selectedOptions.slice(-4);

    // Update selected users by toggling the selection
    setSelectedUsers((prevSelectedUsers) => {
      const newSelectedUsers = prevSelectedUsers.includes(...latestSelections)
        ? prevSelectedUsers.filter((user) => !latestSelections.includes(user))
        : [...prevSelectedUsers, ...latestSelections];

      return newSelectedUsers;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({
      requestName,
      priority,
      additionalDetails,
      attachment,
      selectedUsers,
    });
    resetForm();
  };

  const resetForm = () => {
    setRequestName('');
    setPriority('medium');
    setAdditionalDetails('');
    setAttachment(null);
    setSelectedUsers([]);
    setFormVisible(false);
    setOpenFormButtonVisible(true); 
  };

  const openForm = () => {
    setFormVisible(true);
    setOpenFormButtonVisible(false); 
  };

  return (
    <div>
      <button type="button">Reseved</button>
      <button type="button">send</button>

      {openFormButtonVisible && (
        <button onClick={openForm}>Open Form</button>
      )}
      {formVisible && (
        <form onSubmit={handleFormSubmit}>
        <button type="button" onClick={resetForm}>Close</button>
          <div>
            <label htmlFor="requestName">Name of Request:</label>
            <input
              type="text"
              id="requestName"
              value={requestName}
              onChange={(e) => setRequestName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="approvers">Approvers:</label>
            <select
              multiple
              size="4"
              value={selectedUsers}
              onChange={handleUserSelection}
              id="approvers"
            >
              {users.map((user, index) => (
                <option key={index} value={index}>
                  {user.ed_name}, {user.ed_mailid}
                </option>
              ))}
            </select>
          </div>

          {/* Display selected users */}
          <div>
            <label>Selected Approvers:</label>
            <ul>
              {displayedUsers.map((user, index) => (
                <li key={index}>
                  {user.ed_name}, {user.ed_mailid}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label htmlFor="priority">Priority:</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="medium">Medium</option>
              <option value="important">Important</option>
            </select>
          </div>

          <div>
            <label htmlFor="additionalDetails">Additional Details:</label>
            <textarea
              id="additionalDetails"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label htmlFor="attachment">Add Attachment:</label>
            <input
              type="file"
              id="attachment"
              onChange={(e) => setAttachment(e.target.files[0])}
            />
          </div>

          <div>
            <button type="submit">Send</button>
           
          </div>
        </form>
      )}
    </div>
  );
}

export default Employee_Approval;
