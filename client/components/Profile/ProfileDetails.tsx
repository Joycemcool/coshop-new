import { useUser } from '../../src/context/userContext';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from "next/image";

const ProfileCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ProfileTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
`;

const ProfileInfo = styled.div`
  flex-grow: 1;
  padding-left: 20px;
`;

const EditButton = styled.button`
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AddressSection = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
`;

interface ProfileDetailsProps {
  onEdit: () => void;
}

const ProfileDetails = ({ onEdit }: ProfileDetailsProps) => {
  const { user } = useUser();
  interface Address {
    address_id: number;
    street_number: string;
    address_line: string;
    city: string;
    state: string;
    postal_code: string;
  }

  const [addressList, setAddressList] = useState<Address[]>([]);
  useEffect(() => {
    const fetchAddr = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/userAddresses/1/addresses", {
          method: "GET",
        });
        const data = await response.json();
        console.log("Fetched user addresses:", data);
        setAddressList(data);
      } catch (error) {
        console.error("Failed to fetch user addresses:", error);
      }
    };
    fetchAddr();
  }, []);

  return (
    <ProfileCard>
      <ProfileTop>
        <ProfileImage
          src={
            user?.avatar
              ? user?.avatar.startsWith("http")
                ? user?.avatar
                : `http://localhost:5000${user?.avatar}`
              : "/images/defaultAvatar.png"
          }
          alt="User Avatar"
          width={100}
          height={100}
        />
        <ProfileInfo>
          <h2>
            {user?.name} {user?.family_name}
          </h2>
          <p>Email: {user?.email}</p>
        </ProfileInfo>
        <EditButton onClick={onEdit}>Edit Profile</EditButton>
      </ProfileTop>
      <AddressSection>
        <ul>
          {addressList.map((addr) => (
            <li key={addr.address_id}>
              {addr.street_number} {addr.address_line}, {addr.city}, {addr.state}, {addr.postal_code}
            </li>
          ))}
        </ul>
      </AddressSection>
    </ProfileCard>
  );
}

export default ProfileDetails;