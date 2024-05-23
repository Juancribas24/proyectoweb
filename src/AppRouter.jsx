import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import Register from './Login/Register';


export const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home/>} />
                <Route path='/user' element={<UserPage/>} />
                <Route path='/admin' element={<AdminPage/>} />
				<Route path="/register" element={<Register/>} />
			</Route>
		</Routes>
	);
};