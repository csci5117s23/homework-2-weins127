import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { useAuth, UserButton, SignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import Todos from './todos';

export default function Home() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    return (
        <>
        <SignedIn>
            <Todos></Todos>
        </SignedIn>
        <SignedOut>
            <h1>Welcome to Brandon's todo list</h1>
            <br></br>
            <SignIn></SignIn>
        </SignedOut>
        </>
    )
}