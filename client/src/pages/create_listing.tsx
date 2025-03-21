import React, { useRef } from "react";
import styled from "styled-components";
import { FaImage, FaVideo } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: #f8f8f8;
  padding: 20px;
`;

const Sidebar = styled.div`
  width: 250px;
  background: white;
  padding: 150px 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: url("/images/avatar.jpg") center top/cover no-repeat;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 10px;
`;

const MainContent = styled.div`
  flex: 1;
  background: white;
  padding: 30px;
  margin-left: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 20px;
`;

const UploadButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #f3f3f3;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  width: 350px;

  &:hover {
    background: #e8e8e8;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  margin: 0 auto;
  display: block;
  width: 80%;
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const TextArea = styled.textarea`
  margin: 0 auto;
  display: block;
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  height: 70px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const SubmitButton = styled.button`
  padding: 13px 20px;
  background: #c5b5c5;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  width: 350px;
  margin: 20px auto 0 auto;
  display: block;

  &:hover {
    background: #a392a3;
  }
`;

const CreateListing: React.FC = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageUploadClick = () => {
    imageInputRef.current?.click();
  };
  
  const handleVideoUploadClick = () => {
    videoInputRef.current?.click();
  };
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected image:", file.name);

    }
  };
  
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected video:", file.name);
    }
  };

  return (
    <Container>
      <Sidebar>
        <ProfileImage />
        <UserInfo>
          <h3>Andy Macdonald</h3>
          <p>Location: 100 Connaught Ave, Halifax, NS, Canada B3L 3B6</p>
          <p>Listing to Marketplace</p>
        </UserInfo>
      </Sidebar>

      <MainContent>
        <UploadContainer>
          <UploadButton type="button" onClick={handleImageUploadClick}>
            <FaImage size={24} />
            Add photos
          </UploadButton>
          <UploadButton type="button" onClick={handleVideoUploadClick}>
            <FaVideo size={24} />
            Add videos
          </UploadButton>
        </UploadContainer>

        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={imageInputRef}
          onChange={handleImageChange}
        />

        <input 
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          ref={videoInputRef}
          onChange={handleVideoChange}
        />

        <Form>
          <Input type="text" placeholder="Title" required />
          <Input type="text" placeholder="Price" required />
          <Input type="text" placeholder="Category" required />
          <Input type="text" placeholder="Weight / Volume" required />
          <TextArea placeholder="Description" required />
        </Form>
        <SubmitButton type="submit">Submit</SubmitButton>
      </MainContent>
    </Container>
  );
};

export default CreateListing;