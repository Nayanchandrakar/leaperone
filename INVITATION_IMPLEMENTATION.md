# Member Invitation System Implementation

## Overview
Implemented a complete member invitation system where managers can invite members by creating their accounts immediately, and invited members receive an email with a 7-day link to set their password.

## Implementation Summary

### 1. Database Schema Changes

#### Added `jobRole` column to users table
- **File**: `packages/database/src/schema/users.ts`
- **Change**: Added nullable `jobRole: text()` column
- **Migration**: Created `packages/database/drizzle/0003_add_job_role.sql`

### 2. Constants Update

#### Extended invitation expiry to 7 days
- **File**: `packages/core/src/constants/index.ts`
- **Change**: `INVITATION_EXPIRY = 60 * 60 * 24 * 7` (was 1 day, now 7 days)

### 3. Database Repository

#### Created invitation repository
- **File**: `packages/database/src/repository/invitation.ts`
- **Functions**:
  - `createWorkspaceInviteAndUser()` - Transactionally creates:
    - User record (with email, username, name, jobRole)
    - Credential account (with password=null)
    - Workspace membership (as "member" role)
    - Invitation record (with 7-day expiry)
    - Verification token (invite:token pattern)
  - `acceptWorkspaceInviteAndSetPassword()` - Transactionally:
    - Validates token and expiry
    - Sets account password
    - Marks invitation as accepted
    - Deletes verification token (single-use)
  - `getInvitationById()` - Retrieves invitation by ID

### 4. Zod Schema Updates

#### Added accept invitation schema
- **File**: `packages/zod/src/schema/invitation.ts`
- **Added**: `acceptInvitationSchema` with `token` and `password` fields
- **File**: `packages/zod/src/types/index.ts`
- **Added**: `AcceptInvitationSchema` type export

### 5. Server Types

#### Added accept invitation context type
- **File**: `apps/server/src/types/invitation.types.ts`
- **Added**: `AcceptInvitationContext` type for the new endpoint

### 6. Service Implementation

#### Updated InvitationService
- **File**: `apps/server/src/features/invitation/services/invitation.service.ts`
- **inviteMember()**: 
  - Validates permissions (manage:members)
  - Checks email and username uniqueness
  - Creates user + account + membership + invitation + token
  - Sends email with invite link to `/invite/accept?token=...`
  - Returns userId and invitationId for manager access
- **acceptInvitation()**: 
  - Hashes password
  - Validates token and expiry
  - Sets password and marks invitation accepted
  - Returns success message

### 7. Controller Routes

#### Updated InvitationController
- **File**: `apps/server/src/features/invitation/controllers/invitation.controller.ts`
- **Routes**:
  - `POST /api/invitation/invite` - Invite a member (requires auth + workspace)
  - `POST /api/invitation/accept` - Accept invitation and set password (public)

## API Endpoints

### POST /api/invitation/invite
**Auth Required**: Yes  
**Permissions**: `manage:members`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "jobRole": "Software Engineer"
}
```

**Response**:
```json
{
  "userId": "cm...",
  "invitationId": "cm...",
  "message": "Invitation sent successfully"
}
```

**Errors**:
- `409 Conflict` - Email or username already exists
- `403 Forbidden` - Insufficient permissions

### POST /api/invitation/accept
**Auth Required**: No

**Request Body**:
```json
{
  "token": "cm...",
  "password": "SecurePass123!"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Invitation accepted successfully. You can now log in with your credentials."
}
```

**Errors**:
- `400 Bad Request` - Invalid or expired token, already accepted

## Flow Diagram

```
Manager invites member
    ↓
POST /api/invitation/invite
    ↓
Create user (emailVerified=false, password=null)
    ↓
Create account (credential provider, password=null)
    ↓
Add to workspace (member role)
    ↓
Create invitation record (7-day expiry)
    ↓
Create verification token (invite:token)
    ↓
Send email with /invite/accept?token=... link
    ↓
Return userId + invitationId
    ↓
[Manager can immediately view member profile]

---

Member clicks email link
    ↓
POST /api/invitation/accept
    ↓
Validate token (not expired, not used)
    ↓
Hash password
    ↓
Update account password
    ↓
Mark invitation accepted
    ↓
Delete verification token
    ↓
Member can now log in
```

## Key Features

1. **Immediate Account Creation**: Member accounts are created during invite, not during accept
2. **Manager Access**: Managers can view member profiles immediately after invite
3. **Unique Constraints**: Enforces unique email and username
4. **Single-Use Token**: Verification token is deleted after use
5. **7-Day Expiry**: Invite links expire after 7 days
6. **Transactional Safety**: All database operations use transactions for consistency
7. **Email Notification**: Automated email sent with invite link
8. **Password Security**: Passwords are hashed using bcrypt (10 rounds)

## Database Migration

To apply the schema changes, run:
```bash
# Generate and apply migrations
cd packages/database
npm run db:generate
npm run db:migrate
```

## Testing

Test the endpoints:

1. **Invite a member**:
```bash
curl -X POST http://localhost:3000/api/invitation/invite \
  -H "Content-Type: application/json" \
  -H "Cookie: __Secure.leaper.session_token=..." \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "username": "testuser",
    "jobRole": "Developer"
  }'
```

2. **Accept invitation**:
```bash
curl -X POST http://localhost:3000/api/invitation/accept \
  -H "Content-Type: application/json" \
  -d '{
    "token": "TOKEN_FROM_EMAIL",
    "password": "SecurePass123!"
  }'
```

## Notes

- The `jobRole` is stored on the `user` table (user-global, not workspace-specific)
- Invite accept page should be implemented at `/invite/accept` in the frontend
- Email template is basic HTML; can be enhanced with branded templates
- Consider adding rate limiting on the invite endpoint to prevent abuse

