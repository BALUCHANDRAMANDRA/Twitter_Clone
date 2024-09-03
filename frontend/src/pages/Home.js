import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Lost } from '../componets/Lost';
import { Post } from './Post';
import axios from 'axios';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa"; 

export const Home = () => {
    const [showPopUp, setShowPopUp] = useState(false);
    const [user, setUser] = useState({ userId: '', username: '', email: '' });
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [visibleComments, setVisibleComments] = useState({});
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
       
    const handlePopup = () => {
        navigate('/home/post');
    };

    const handleClosePopup = () => {
        navigate('/home');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
        const lowercasedKeyword = keyword.toLowerCase();
        if (keyword.trim()) {
            const filtered = posts.filter(post =>
                post.username.toLowerCase().includes(lowercasedKeyword)
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(posts);  
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedPosts = JSON.parse(localStorage.getItem('posts'));

        if (storedPosts) {
            setPosts(storedPosts);
            setFilteredPosts(storedPosts);
        }

        if (token) {
            axios
                .get('http://localhost:4000/accessResource', { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    setUser(response.data.data);
                })
                .catch((err) => {
                    console.error(err);
                });

            axios
                .get('http://localhost:4000/posts', { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    setPosts(response.data.data);
                    setFilteredPosts(response.data.data);
                    localStorage.setItem('posts', JSON.stringify(response.data.data));
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            navigate('/');
        }
    }, [navigate]);

    const handleDeletePost = (postId) => {
        const token = localStorage.getItem('token');
        axios
            .delete(`http://localhost:4000/posts/${postId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                const updatedPosts = posts.filter((post) => post._id !== postId);
                setPosts(updatedPosts);
                setFilteredPosts(updatedPosts.filter(post =>
                    post.username.toLowerCase().includes(searchKeyword.toLowerCase())
                ));
                localStorage.setItem('posts', JSON.stringify(updatedPosts));
            })
            .catch((err) => {
                console.error('Error deleting post:', err);
            });
    };

    const handleAddPost = (newPost) => {
        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts.filter(post =>
            post.username.toLowerCase().includes(searchKeyword.toLowerCase())
        ));
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    const handleLike = (postId) => {
        const token = localStorage.getItem('token');
        axios.patch(`http://localhost:4000/like/${postId}`, {}, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                const updatedPosts = posts.map(post => post._id === postId ? { ...post, likes: response.data.likes, dislikes: response.data.dislikes } : post);
                setPosts(updatedPosts);
                setFilteredPosts(updatedPosts.filter(post =>
                    post.username.toLowerCase().includes(searchKeyword.toLowerCase())
                ));
                localStorage.setItem('posts', JSON.stringify(updatedPosts));
            })
            .catch(error => console.log(error));
    };

    const handleDislike = (postId) => {
        const token = localStorage.getItem('token');
        axios.patch(`http://localhost:4000/dislike/${postId}`, {}, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                const updatedPosts = posts.map(post => post._id === postId ? { ...post, likes: response.data.likes, dislikes: response.data.dislikes } : post);
                setPosts(updatedPosts);
                setFilteredPosts(updatedPosts.filter(post =>
                    post.username.toLowerCase().includes(searchKeyword.toLowerCase())
                ));
                localStorage.setItem('posts', JSON.stringify(updatedPosts));
            })
            .catch(error => console.log(error));
    };

    const handleAddComment = async (postId, commentText) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                `http://localhost:4000/posts/${postId}/comments`,
                { text: commentText },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const updatedPosts = posts.map((post) =>
                post._id === postId ? { ...post, comments: response.data.data.comments } : post
            );
            setPosts(updatedPosts);
            setFilteredPosts(updatedPosts.filter(post =>
                post.username.toLowerCase().includes(searchKeyword.toLowerCase())
            ));
            setCommentText(''); // Clear the comment input
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = async (postId, commentId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(
                `http://localhost:4000/posts/${postId}/comments/${commentId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const updatedPosts = posts.map((post) =>
                post._id === postId ? { ...post, comments: response.data.data.comments } : post
            );
            setPosts(updatedPosts);
            setFilteredPosts(updatedPosts.filter(post =>
                post.username.toLowerCase().includes(searchKeyword.toLowerCase())
            ));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    
      const toggleComments = (postId) => {
        setVisibleComments((prev) => ({
          ...prev,
          [postId]: !prev[postId],
        }));
      };

    return (
        <Container>
            <Content>
                <Iconstyle>
                    <FaBars onClick={() => setShowSidebar(!showSidebar)} />
                </Iconstyle>
                <Start showSidebar={showSidebar}>
                <CloseButton onClick={() => setShowSidebar(false)}><FaTimes /></CloseButton>
                    <Div>
                        <Img src={require('../images/X-Logo.png')} alt="" />
                        <HomeButton>
                            <Image src={require('../images/Home-icon.png')} alt="" /> <Text>Home</Text>
                        </HomeButton>
                        <Explore>
                            <Image src={require('../images/Home-icon.png')} alt="" /> <Text>Explore</Text>
                        </Explore>
                        <Notifications>
                            <Image src={require('../images/Home-icon.png')} alt="" /> <Text>Notifications</Text>
                        </Notifications>
                        <Messages>
                            <Image src={require('../images/Home-icon.png')} alt="" /> <Text>Messages</Text>
                        </Messages>
                        <Grok>
                            <Image src={require('../images/Home-icon.png')} alt="" /> <Text>Grok</Text>
                        </Grok>
                        <List>
                            <Image src={require('../images/Home-icon.png')} alt="" /> <Text>List</Text>
                        </List>
                        <Communities>
                            <Image src={require('../images/Home-icon.png')} alt="" /> <Text>Communities</Text>
                        </Communities>
                        <Premium>
                            <Image src={require('../images/Home-icon.png')} alt="" /> <Text>Premium</Text>
                        </Premium>
                        <Profile>
                            <Image src={require('../images/Home-icon.png')} alt="" /> <Text>Profile</Text>
                        </Profile>
                        <More>
                            <Image src={require('../images/Home-icon.png')} alt="" /> <Text>More</Text>
                        </More>
                        <PostButton onClick={handlePopup}>Post</PostButton>
                        <Routes>
                            <Route path="post" element={<Post onClose={handleClosePopup} onAddPost={handleAddPost} />} />
                        </Routes>
                        {showPopUp && <Post onClose={handleClosePopup} onAddPost={handleAddPost} />}
                    </Div>
                    <ProfileArea>
                        <UserName>{user ? user.username : 'Loading...'}</UserName>
                        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                    </ProfileArea>
                </Start>
                <Middle>
          {filteredPosts.map((post) => (
            <React.Fragment key={post._id}>
              <PostContainer>
                <PostHeader>
                  <Username>{post.username}</Username>
                </PostHeader>
                <PostContent>{post.content}</PostContent>
                <ImageWrapper>{post.image && <PostImage src={`http://localhost:4000/uploads/${post.image}`} alt="Post" />}</ImageWrapper>
                <Button>
                  <LikeButton onClick={() => handleLike(post._id)}>Likes {post.likes}</LikeButton>
                  <DislikeButton onClick={() => handleDislike(post._id)}>Dislikes {post.dislikes}</DislikeButton>
                </Button>
                {post.userId === user.userId && (
                  <DeleteButton onClick={() => handleDeletePost(post._id)}>Delete</DeleteButton>
                )}
                <CommentToggleButton onClick={() => toggleComments(post._id)}>
                  {visibleComments[post._id] ? 'Hide Comments' : 'Show Comments'}
                </CommentToggleButton>
                {visibleComments[post._id] && (
                  <Comments>
                    {post.comments.map((comment) => (
                      <Comment key={comment._id}>
                        <CommentUser>{comment.username}</CommentUser>
                        <CommentContent>{comment.text}</CommentContent>
                        {comment.userId === user.userId && (
                          <DeleteCommentButton onClick={() => handleDeleteComment(post._id, comment._id)}>Delete</DeleteCommentButton>
                        )}
                      </Comment>
                    ))}
                    <AddCommentContainer>
                      <CommentInput value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                      <AddCommentButton onClick={() => handleAddComment(post._id, commentText)}>Add Comment</AddCommentButton>
                    </AddCommentContainer>
                  </Comments>
                )}
              </PostContainer>
              <Divider />
            </React.Fragment>
          ))}
        </Middle>
                <Last>
                    <Lost  onSearch={handleSearch} />
                </Last>
            </Content>
        </Container>
    );
};



const Container = styled.div`
    overflow: hidden;
    background-color: black;
    color: white;
    height: 100vh;

    @media (max-width: 768px) {
        height: 100vh; 
        overflow: hidden;
    }
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: black;

    @media (max-width: 768px) {
        flex-direction: column; 
        height: auto; 
        justify-content: center;
        align-items: center;
        width: 100%;
    }
`;

const Iconstyle = styled.div`
    display: flex;
    margin-left: -120px;
    @media (max-width: 768px) {
        margin-left:0px;
        display: block; 
        background: none;
        border: none;
        color: white;
        align-self: flex-start;
        cursor: pointer;
        font-size: 1.5rem;
    }
   
`;

const CloseButton = styled.button`
    display: flex;
    
    @media (max-width: 768px) {
        margin-left: 120px;
        display: block; /* Show on mobile devices */
        background: none;
        border: none;
        color: white;
        align-self: flex-end;
        cursor: pointer;
        font-size: 1.5rem;
    }
`;




const Start = styled.div`
    width: 33%;
    flex-shrink: 0;
    background-color: black;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    

     @media (max-width: 768px) {  
        position: absolute;
        top: 0;
        left: 0;
        width: 40%;
        height: 100%;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.9);
        flex-direction: column;
        padding: 20px;
        left: ${({ showSidebar }) => (showSidebar ? "0" : "-100%")};
        transition: 350ms;
        overflow-y: auto;
    }
`;


const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-wrap: break-word;
    margin-left: 120px;

     @media (max-width: 768px) {
        margin-left: 0;
    }
`;

const Middle = styled.div`
    width: 40%;
    flex-shrink: 0;
    background-color: black;
    height: 100%;
    border: 1px solid white;
    overflow-y: auto;

    &::-webkit-scrollbar {
    display: none;
}

    @media (max-width: 768px) {
        align-items: center;
        width: 100%;
        
    }
`;

const Last = styled.div`
    width: 33.8%;
    flex-shrink: 0;
    background-color: black;
    height: 100%;
    overflow-y: auto;

    @media (max-width: 768px) {
        display: none;
    }
`;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-top: -105px;
    padding: 10px;
    border-radius: 50px;
    &:hover {
        cursor: pointer;
        background-color: #17202a;
        transition: linear;
    }
`;

const commonStyles = `
    margin-top: 5px;
    padding: 10px 25px 10px 10px;
    border-radius: 30px;
    background-color: black;
    border: none;
    &:hover {
        cursor: pointer;
        background-color: #17202a;
        transition: 0.3s linear;
    }
`;

const HomeButton = styled.button`${commonStyles}`;
const Explore = styled.button`${commonStyles}`;
const Notifications = styled.button`${commonStyles}`;
const Messages = styled.button`${commonStyles}`;
const Grok = styled.button`${commonStyles}`;
const List = styled.button`${commonStyles}`;
const Communities = styled.button`${commonStyles}`;
const Premium = styled.button`${commonStyles}`;
const Profile = styled.button`${commonStyles}`;
const More = styled.button`${commonStyles}`;

const PostButton = styled.button`
    bottom: 100px;
    margin-top: 7px;
    background-color: #0ba6ff;
    border: none;
    color: white;
    border-radius: 30px;
    width: 250px;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    padding-right: 30px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
        transition: 0.8s;
    }
`;

const Image = styled.img`
    width: 22px;
    height: 22px;
`;

const Text = styled.span`
    font-size: 20px;
    font-weight: medium;
    color: white;
    margin-left: 10px;
`;

const LogoutButton = styled.button`
    width: 50px;
    height: 50px;
    background-color: white;
    visibility: hidden;
    margin-left: 10px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #ff4d4d;
        color: white;
    }
`;

const ProfileArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 240px;
    height: 40px;
    min-width: 200px;
    min-height: 25px;
    padding: 10px;
    background-color: black;
    position: absolute;
    margin-left: 170px;
    margin-top: 83vh;
    margin-right: 20px;
    border-radius: 40px;
    border: none;
    &:hover {
        cursor: pointer;
        background-color: #17202a;
        transition: background-color 0.3s linear;
    }

    &:hover ${LogoutButton} {
        visibility: visible;
    }

    @media (max-width: 768px) {
        align-self: flex-start;
        margin-left: -10px;
        margin-bottom: -17px;
    }
`;

const UserName = styled.div`
    color: white;
    max-width: 220px;
    height: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18px;
    font-weight: bold;
    padding: 15px;


`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px;
    background-color: black;
    color: black;
    padding: 15px;
    border-radius: 8px;
    width: 90%;
    overflow: hidden;
    cursor: pointer;
`;

const PostHeader = styled.div`
    display: flex;
    align-items: center;
`;

const Username = styled.div`
    font-size: 20px;
    font-weight: 900;
    font-family: Serif;
    color: white;
     &:hover{
      cursor: pointer;
      text-decoration: underline;
    }
`;

const PostContent = styled.div`
    font-size: 14px;
    margin-bottom: 10px;
    margin-top: 10px;
    color: white;
    font-family: "Lucida Console", "Courier New", monospace;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const PostImage = styled.img`
    max-width: 100%;
    height: auto;
    max-height: 500px;
    margin-bottom: 10px;
    border: 1px solid white;
    border-radius: 10px;
`;

const currentUser = styled.div``;

const DeleteIcon = styled.div``;



const DeleteButton = styled.button`
    background-color: red;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    align-self: flex-end;
    &:hover {
        background-color: darkred;
    }
`;

const Button = styled.div`
    display: flex;
    flex-direction: row;
`;

const LikeButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #3182ce;
`;

const DislikeButton = styled(LikeButton)`
    color: #e53e3e;
`;

const CommentToggleButton = styled.button`
    padding: 10px 20px;
    background-color: lightblue;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
`;

const Comments = styled.div`
    margin-top: 10px;
`;

const Comment = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const CommentUser = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: white;
`;

const CommentContent = styled.span`
    font-size: 14px;
    color: white;
`;

const DeleteCommentButton = styled.button`
    padding: 5px 10px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    align-self: flex-end;
`;

const AddCommentContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

const CommentInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const AddCommentButton = styled.button`
    padding: 10px 20px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
`;

const Divider = styled.hr`
  border: 1px solid white;
`;