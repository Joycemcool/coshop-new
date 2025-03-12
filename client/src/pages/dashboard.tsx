import { useState } from "react";
import { useUser } from "../context/userContext";
import styled from "styled-components";
import Header from "@/components/Header";
import ProfileEditForm from "@/components/Profile/ProfileEditForm"; // Import ProfileEditForm
import ProfileDetails from "@/components/Profile/ProfileDetails";
import PostsList from "@/components/Post/PostList";


// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.aside`
  width: 20%;
  background: #f7f7f7;
  padding: 20px;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProfileSection = styled.div`
  text-align: center;
`;

const UserName = styled.h2`
  margin-top: 10px;
  font-size: 1.1rem;
  font-weight: bold;
`;

const NavSection = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SidebarLink = styled.button<{ $isActive: boolean }>`
  background: ${({ $isActive }) => ($isActive ? "#ddd" : "transparent")};
  border: none;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: #e2e2e2;
  }
`;
const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const DashboardPage = () => {
  const { user } = useUser();
  
  const [selectedSection, setSelectedSection] = useState("profile");
  const [isEditing, setIsEditing] = useState(false); // State to manage form visibility

  const handleEditProfile = () => {
    setIsEditing(true); // Show the form when editing starts
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Hide the form when cancel is clicked
  };

  return (
    <div>
      <Header></Header> 
      <Container>
        {/* Sidebar */}
        <Sidebar>
          <ProfileSection>
            <UserName>Welcome, {user?.name}!</UserName>
          </ProfileSection>

          {/* Navigation */}
          <NavSection>
          <SidebarLink 
            onClick={() => setSelectedSection("profile")} 
            $isActive={selectedSection === "profile"}> {/* Use $isActive here */}
            👤 My Profile
          </SidebarLink>
          <SidebarLink 
            onClick={() => setSelectedSection("listings")} 
            $isActive={selectedSection === "listings"}> {/* Use $isActive here */}
            📋 My Listings
          </SidebarLink>
          </NavSection>
        </Sidebar>

        {/* Main Content */}
        <MainContent>
        {selectedSection === "profile" ? (
            isEditing ? (
              <ProfileEditForm onCancel={handleCancelEdit} setIsEditing={setIsEditing} /> // Show form when editing
            ) : (
              <ProfileDetails onEdit={handleEditProfile} /> // Show profile details
            )
          ) : (
            <PostsList />
          )}
        </MainContent>
      </Container>
    </div>
    
  );
};

export default DashboardPage;