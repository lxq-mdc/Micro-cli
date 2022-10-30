import React, { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import Home from '../pages/Home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  }
];

export default routes;
