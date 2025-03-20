import React, { useState } from 'react';

interface AvatarUploadProps {
  onAvatarChange: (avatarUrl: string) => void;
  user_id: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ onAvatarChange, user_id }) => {
  const [file, setFile] = useState<File | null>(null);

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget & { files: FileList };
  }

  const handleFileChange = (e: FileChangeEvent) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('user_id', user_id); // Add the userId to the FormData

      try {
        const response = await fetch('http://localhost:5000/api/users/avatar', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          onAvatarChange(data.avatarUrl);  // Update the avatar in the parent component
        } else {
          alert('Error uploading avatar.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to upload avatar.');
      }
    }
  };

  return (
    <div style={{   padding: '10px', margin: '10px 0' }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default AvatarUpload;
