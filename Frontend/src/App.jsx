import React from "react";
import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import Home from "./components/user/Home";
import UserForm from "./components/user/UserForm";
import DailyNewsUpdate from "./components/user/News/DailyNewsUpdate";
import AiPromptGenerator from "./components/user/AI/AiPromptGenerator";
import Dashboard from "./components/user/Dashboard/Dashboard";
import AuthProvider from "./components/user/context/AuthContext";
import OverFlow from "./components/user/NexCodeOverFlow/OverFlow";
import AskQuestion from "./components/user/NexCodeOverFlow/AskQuestion";
import GetAnswer from "./components/user/NexCodeOverFlow/GetAnswer";
import EditProfile from "./components/user/Dashboard/EditProfile";
import EditProfilePicture from "./components/user/Dashboard/EditProfilePicture";
import CodeSnippet from "./components/user/Codesnippet/CodeSnippet";
import CodeConverter from "./components/user/Codesnippet/CodeConverter";
import AddNewSnippet from "./components/user/Codesnippet/AddNewSnippet";
import TaskManager from "./components/user/TaskManager/TaskManager";
import AdminForm from "./components/admin/AdminForm";
import AdminDash from "./components/admin/AdminDash";
import Features from "./components/user/Features";
import NexGram from "./components/user/Socialmedia/NexGram";
import NewPost from "./components/user/Socialmedia/NewPost";
import Post from "./components/user/Socialmedia/Post";
import UserProfile from "./components/user/Socialmedia/UserProfile";
import AIHub from "./components/user/AiHub/AIHub";
import ResetPassword from "./components/user/ResetPassword";
import About from "./components/user/About";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/form" element={<UserForm />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route
              path="/dailynewsupdate"
              element={<DailyNewsUpdate />}
            ></Route>
            <Route
              path="/aiprompt"
              element={<AiPromptGenerator />}
            ></Route>
            <Route path="/nexcodeoverflow-data" element={<OverFlow />}></Route>
            <Route path="/askquestion-data" element={<AskQuestion />}></Route>
            <Route path="/getanswer-data" element={<GetAnswer />}></Route>
            <Route path="/editprofile" element={ <EditProfile/> }></Route>
            <Route path="/editprofilepicture" element={ <EditProfilePicture/> }></Route>
            <Route path="/codesnippet" element={<CodeSnippet/>}></Route>
            <Route path="/codeconverter" element={<CodeConverter/>}></Route>
            <Route path="/addnewsnippet" element={<AddNewSnippet/>}></Route>
            <Route path="/taskmanager" element={<TaskManager/>}></Route>
            <Route path="/features" element={<Features/>}></Route>
            <Route path="/nexgram/:id" element={<NexGram/>}></Route>
            <Route path="/newpost/:id" element={<NewPost/>}></Route>
            <Route path="/post/:id" element={<Post/>}></Route>
            <Route path="/userprofile/:id" element={<UserProfile/>}></Route>
            <Route path="/aihub" element={<AIHub/>}></Route>
            <Route path="/resetpassword" element={<ResetPassword/>}></Route>
            <Route path="/about" element={<About/>}></Route>

            <Route path="/adminform" element={<AdminForm/>}></Route>
            <Route path="/admindashboard" element={<AdminDash/>}></Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
