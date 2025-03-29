# Admin Login Page

This page provides secure authentication for the admin panel. It connects to the backend JWT authentication system and validates credentials before granting access to protected admin routes.

## Features

- Secure authentication with JWT tokens
- Error handling for invalid credentials
- Responsive design for all device sizes
- Redirect to requested admin page after successful login
- Integration with NextAuth.js for session management

## Implementation Details

- Uses NextAuth.js credentials provider
- Connects to the backend `/api/auth/login` endpoint
- Stores JWT token in session for authenticated API requests
- Protected by middleware that checks for 'Administrator' role
- Follows the same design system as the rest of the admin panel

## Usage

Access this page at `/admin/login`. After successful authentication, users will be redirected to the admin dashboard or their requested admin page.

## Security Considerations

- JWT tokens expire after 24 hours
- Authentication state is managed securely through NextAuth.js
- Protected routes redirect unauthenticated users to this login page
- Failed login attempts are logged and throttled
- Password strength requirements should be enforced when creating admin accounts 