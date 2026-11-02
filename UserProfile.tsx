// import React, { useState, useEffect } from 'react';
//  interface UserProps { userId: string; onFetch: (data: any) => void; }
//  export const UserProfile: React.FC<UserProps> = ({ userId, onFetch }) => {
//    const [user, setUser] = useState();
//    useEffect(() => {
//      fetch('/api/user/' + userId)
//        .then((res) => res.json())
//        .then((data) => {
//          setUser(data);
//         onFetch(data);
//       });
//   }, [userId, onFetch]);
//   return <div>{user ? user.name : 'Loading...'}</div>;
//  };



// Errors 

// 1. No .catch() on line 6-11 
// A network failure causes an unhandled promise rejection, and the UI says “Loading...” forever.
//Fix: Add .catch((err) => { if (err.name !== 'AbortError') setError(err); }).


// 2. HTTP Errors Aren't deceted : fetch only rejects on network failure, not on 404 or 500.
//  A 404 still goes to res.json(), which may throw or return an
//  error body that gets treated as a user. 
//Fix: if (!res.ok) throw new Error(\HTTP ${res.status}`);beforeres.json()`.

// 3. useState() has no type (line 4)
// TypeScript infers the type as undefined, so inside user ? user.name : ... the 
// type narrows to never and user.name is a compile error.
//Fix: const [user, setUser] = useState<User | null>(null); with an interface User { name: string; ... }.

// 4. any in the props (line 2)
// onFetch: (data: any) => void turns off type checking for whoever uses the callback.
//Fix: onFetch: (data: User) => void;

// 5.Response data is untyped (line 8)
// res.json() returns Promise<any>, so nothing verifies the shape of data 
//Fix: .then((data: User) => ...), or validate with a schema library like Zod if the API isn’t trusted.

// 6. userId isn’t URL-encoded (line 6)
// An ID containing /, ? or # would break the URL.
//Fix: fetch(\/api/user/${encodeURIComponent(userId)}`)`.

// 7. Loading and error states look the same (line 13)
// user ? ... : 'Loading...' means a failed request is indistinguishable from a slow one.
//Fix: Add error state and render {error ? 'Failed to load' : !user ? 'Loading...' : user.name}.

// 8. onFetch fires twice in development
// React 18 StrictMode mounts, unmounts and remounts components in dev,
//  so without cleanup the request and callback run twice.
//Fix: Abort in cleanup (#2) so the first request’s result is discarded.


// 9. Race condition when userId changes (lines 5–12)
// If userId changes from "1" to "2" quickly, the response for "1" can arrive 
// after "2" and overwrite it, showing the wrong user.
//Fix: Create an AbortController in the effect and call controller.abort() in the cleanup function.