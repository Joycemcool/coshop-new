import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import { useUser } from '../../src/context/userContext';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled(Image)`
  border-radius: 8px;
  object-fit: cover;
  width: 100%;
  height: 150px;
`;

const PostInfo = styled.div`
  margin-top: 10px;
`;

const PostTitle = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
`;

const PostLocation = styled.p`
  color: #777;
  font-size: 0.8rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ListingsContainer = styled.div`
  padding: 20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

interface Post {
  post_id: number;
  image: string;
  title: string;
  location: string;
  content: string;
}

const PostCard = ({ post } : { post: Post }) => {
  const router = useRouter();
  const handleClick = () => {
    console.log(`Clicked on post: ${post.title}`);
    router.push(`http://localhost:5000/api/posts/${post.post_id}`);
  }


  return (
  <Card onClick={handleClick} style={{ cursor: 'pointer' }}> 
    <ProductImage src={post.image ? post.image : "/images/defaultPost.png"} alt={post.title} width={200} height={150} />
    <PostInfo>
      <PostTitle>{post.title}</PostTitle>
      <PostLocation>{post.location}</PostLocation>
    </PostInfo>
  </Card>
  );
};

const PostsList = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const { user } = useUser();
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/posts?user_id=${user?.user_id}`, {
            method: "GET",
          });
          const data = await response.json();
          console.log("Fetched post:", data);
          setPosts(data);
        } catch (error) {
          console.error("Failed to fetch user posts:", error);
        }
      }
      fetchPosts();
    },[]);
  
    return (
    <ListingsContainer>
      <Title>My Listings</Title>
      <ProductGrid>
        { 
          Array.isArray(posts) ? posts.map((post) => (
          <PostCard key={post.post_id} post={post} />
          )) : <p>No posts available</p>
        }
      </ProductGrid>
    </ListingsContainer>
  );} 

  export default PostsList;