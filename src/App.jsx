import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import MainLayout from "./components/hand/MainLayout"
import AuthLayout from "./components/hand/AuthLayout"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import TasksPage from "./pages/TasksPage"
import NotFoundPage from "./pages/NotFoundPage"
import AboutPage from "./pages/AboutPage"
import ContactUsPage from "./pages/ContactUsPage"


// function ProtectedRoute({ children }) {
//   if (loggedIn === null) {
//     return <Navigate to="auth/login" />
//   }
//   return (children)
// }

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactUsPage />} />
          <Route path="task" element={<TasksPage />} />
        </Route>

        <Route path="auth" element={<AuthLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
