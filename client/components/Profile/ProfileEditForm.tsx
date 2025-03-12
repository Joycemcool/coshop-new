import styled from "styled-components";
import { useUser, UserProfile } from "../../src/context/userContext";// Adjust the import path as necessary
import AvatarUpload from "./AvatorUpload"; // Adjust the import path as necessary
import { useState } from "react";

const FormContainer = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  /* width: 10%; */
`;

const Line = styled.span`
  display: flex;
  width: 100%;
`;

const Title = styled.span`
  flex: 1 1 33%;
  padding: 10px;
  margin: 10px 0;
  `;
const LineInput = styled.span`
  flex: 1 1 67%;
  display: flex;
  gap: 2rem;
  `;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const SaveButton = styled.button`
  background: #28a745;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #218838;
  }
`;

const CancelButton = styled.button`
  background: #dc3545;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;

const ProfileEditForm = ({ onCancel, setIsEditing }: { onCancel: () => void , setIsEditing: (isEditing: boolean) => void}) => {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user?.name || "");
  const [familyName, setFamilyName] = useState(user?.family_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [errors, setErrors] = useState({ name: "", email: "" });

  // Validation regex
const nameRegex = /^[A-Za-z\s]{2,}$/; // Only letters and spaces, min 2 chars
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format

  const updateAvatar = (newAvatarUrl: string) => {
    const updatedUser: UserProfile = { 
      ...user, 
      avatar: newAvatarUrl,
      email: user?.email || '',
      name: user?.name || '',
      family_name: user?.family_name || '',
      user_id: user?.user_id || ''
    };
    setUser(updatedUser);
  }

  const validateForm = () => {
    let isValid = true;
    let newErrors = { name: "", email: "" };

    if (!nameRegex.test(name) || !nameRegex.test(familyName)) {
      newErrors.name = "Name must contain only letters and be at least 2 characters long.";
      isValid = false;
    }
    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveEdit = async () => {
    if (!validateForm()) return; // Stop if validation fails
    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.user_id, // Ensure this is being passed correctly
          name,
          family_name: familyName,
          email,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
  
      const data = await response.json();
      console.log("Profile updated:", data);
      alert("Profile updated successfully!");
      const updatedUser: UserProfile = { 
        email: email || user?.email || '',
        name: name|| user?.name || '',
        family_name: familyName || user?.family_name || '',
        user_id: user?.user_id || '',
        avatar: user?.avatar || ''
      };
      setUser(updatedUser);
  
      // Optionally, update the UI with new user data
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
    setIsEditing(false);
  };

  return (
    <FormContainer>
      <h3>Edit Profile</h3>
      <Line>
        <Title>Name</Title>
        <LineInput>
          <Input type="text" placeholder={user?.name} value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="text" placeholder={user?.family_name} value={familyName} onChange={(e) => setFamilyName(e.target.value)} />
        </LineInput>
      </Line>
      {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
      <Line>
        <Title>Email</Title>
        <LineInput>
          <Input type="email" placeholder={user?.email} value={email} onChange={(e) => setEmail(e.target.value)} />
        </LineInput>
      </Line>
      {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      <Line>
        <Title>Avator</Title>
        <LineInput>
          <AvatarUpload onAvatarChange={updateAvatar} user_id={user!.user_id}></AvatarUpload>
        </LineInput>
      </Line>
      <ButtonGroup>
        <SaveButton onClick={handleSaveEdit}>Save</SaveButton>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
      </ButtonGroup>
    </FormContainer>
  );
};

export default ProfileEditForm;
