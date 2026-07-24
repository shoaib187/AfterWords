# Afterword — API Documentation

## Overview

**Base URL:** `http://localhost:3000` (development) **Content-Type:** `application/json` (except file-upload endpoints, which use `multipart/form-data`) **Authentication:** JWT stored in `HttpOnly` cookie `user_token`. All protected routes also accept an `Authorization: Bearer <token>` header.

**Standard Response:**

```json
{
  "success": true | false,
  "message": "Human-readable description",
  "data": { ... } | null
}
```

- `data` is always `null` on errors.
- Never store the token manually — the cookie is set automatically on register/login.

> **Scope note:** This pass covers **onboarding** (splash → create vault → secure vault → estate readiness) and the **core Legacy flow** — Home dashboard, Treasures (video/voice/photo/document), Recipients, and Legacy Gifts. Executors is the one checklist item still unbuilt — see the "Future Resources" note under Onboarding APIs.

---

## Table of Contents

1. [Auth APIs](#auth-apis)
2. [Security APIs](#security-apis)
3. [Onboarding APIs](#onboarding-apis)
4. [Dashboard APIs](#dashboard-apis)
5. [Treasures APIs](#treasures-apis)
6. [Recipients APIs](#recipients-apis)
7. [Legacy Gifts APIs](#legacy-gifts-apis)
8. [Error Reference](#error-reference)
9. [Frontend Flow Summary](#frontend-flow-summary)
10. [Auth Cookie Details](#auth-cookie-details)
11. [File Upload Details](#file-upload-details)

---

## Auth APIs

Maps to the **splash → "Create your Vault"** screens.

### 1. Register

**POST** `/api/user/auth/register`

Creates a new user account (the user's "Vault") and sets the `user_token` cookie automatically.

**Body:**

```json
{
  "firstName": "Eleanor",
  "lastName": "Harley",
  "email": "eleanor@example.com",
  "password": "SecurePass1",
  "phone": "+13039812333"
}
```

> Password rules: min 8 chars, at least one uppercase, one lowercase, one number. Phone: `+` optional, 7–15 digits. **No SMS/phone-verification provider (e.g. Twilio) or Maps API key is configured yet** — the phone number is only shape-validated (fallback), not OTP-verified. Wire up real verification later without changing this contract.

**Response 201:**

```json
{
  "success": true,
  "message": "Vault created successfully",
  "data": {
    "user": {
      "id": "664f...",
      "firstName": "Eleanor",
      "lastName": "Harley",
      "email": "eleanor@example.com",
      "phone": "+13039812333",
      "maskedPhone": "1303*****2333",
      "biometricEnabled": false,
      "isOnboardingComplete": false
    }
  }
}
```

> `maskedPhone` is provided for display (e.g. confirmation screens) — the raw `phone` is also returned in case the client needs to prefill an edit form.

**Errors:**

| Status | Reason |
|--------|--------|
| 400 | Missing required fields / invalid email / weak password / invalid phone |
| 409 | Email or phone number already registered |
| 500 | Server error |

---

### 2. Login

**POST** `/api/user/auth/login`

Authenticates the user and sets the `user_token` cookie.

**Body:**

```json
{
  "email": "eleanor@example.com",
  "password": "SecurePass1"
}
```

**Response 200:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "664f...",
      "firstName": "Eleanor",
      "lastName": "Harley",
      "email": "eleanor@example.com",
      "phone": "+13039812333",
      "maskedPhone": "1303*****2333",
      "biometricEnabled": true,
      "isOnboardingComplete": true
    }
  }
}
```

> **Frontend logic:** After login, check `isOnboardingComplete`. If `false`, resume onboarding (Secure your Vault / Estate Readiness). If `true`, go straight to Home.

**Errors:**

| Status | Reason |
|--------|--------|
| 400 | Missing required fields |
| 401 | Invalid email or password |
| 500 | Server error |

---

### 3. Logout

**POST** `/api/user/auth/logout`

Clears the `user_token` cookie.

> No body required. No auth required.

**Response 200:**

```json
{ "success": true, "message": "Logged out successfully", "data": null }
```

---

### 4. Me (Get Current User)

**GET** `/api/user/auth/me` 🔒 **Protected** — requires `user_token` cookie

Returns the full authenticated user, including the computed Estate Readiness checklist (same data that powers the "Estate Readiness" onboarding screen and the Home dashboard card).

**Response 200:**

```json
{
  "success": true,
  "message": "Authenticated",
  "data": {
    "user": {
      "_id": "664f...",
      "firstName": "Eleanor",
      "lastName": "Harley",
      "email": "eleanor@example.com",
      "phone": "+13039812333",
      "maskedPhone": "1303*****2333",
      "biometricEnabled": true,
      "isOnboardingComplete": true,
      "firstTreasureAdded": false,
      "recipientAdded": false,
      "executorsComplete": false,
      "legacyCreated": false,
      "lastActiveAt": "2026-07-23T16:44:32.943Z",
      "createdAt": "2026-07-23T16:44:26.477Z",
      "estateReadiness": {
        "percentage": 20,
        "completedSteps": 1,
        "totalSteps": 5,
        "checklist": [
          { "key": "accountCreated", "label": "Account Created", "description": "Your private Vault is secure", "completed": true },
          { "key": "executorsComplete", "label": "Add Executors", "description": "Assign trusted contacts to manage your estate", "completed": false },
          { "key": "recipientAdded", "label": "Add Recipients", "description": "Build your directory of loved ones", "completed": false },
          { "key": "firstTreasureAdded", "label": "Create First Treasure", "description": "Upload a photo, video, or document", "completed": false },
          { "key": "legacyCreated", "label": "Create First Legacy", "description": "Assign a treasure to a recipient", "completed": false }
        ]
      }
    }
  }
}
```

**Errors:**

| Status | Reason |
|--------|--------|
| 401 | Missing or invalid user_token |
| 404 | User not found |
| 500 | Server error |

---

## Security APIs

Maps to the **"Secure your Vault"** biometric setup screen.

### 5. Update Biometric Preference

**PUT** `/api/user/security/update` 🔒 **Protected** — requires `user_token` cookie

Toggles the user's biometric-login preference. Face ID / Touch ID enrollment itself happens on-device (native biometric APIs) — this endpoint only persists whether the app should attempt biometric login next time, so it's called once the client has confirmed the device enrolled successfully.

**Body:**

```json
{ "biometricEnabled": true }
```

**Response 200:**

```json
{
  "success": true,
  "message": "Biometric login enabled",
  "data": { "biometricEnabled": true }
}
```

**Errors:**

| Status | Reason |
|--------|--------|
| 400 | biometricEnabled missing or not a boolean |
| 401 | Missing or invalid user_token |
| 404 | User not found |
| 500 | Server error |

---

## Onboarding APIs

Maps to the **"Estate Readiness"** screen (checklist + "Go to My Vault" button).

### 6. Get Estate Readiness Status

**GET** `/api/user/onboarding/status` 🔒 **Protected** — requires `user_token` cookie

Returns the same checklist/percentage shown in `GET /api/user/auth/me`, as a standalone call for the dedicated readiness screen.

**Response 200:**

```json
{
  "success": true,
  "message": "Estate readiness status",
  "data": {
    "percentage": 20,
    "completedSteps": 1,
    "totalSteps": 5,
    "checklist": [
      { "key": "accountCreated", "label": "Account Created", "description": "Your private Vault is secure", "completed": true },
      { "key": "executorsComplete", "label": "Add Executors", "description": "Assign trusted contacts to manage your estate", "completed": false },
      { "key": "recipientAdded", "label": "Add Recipients", "description": "Build your directory of loved ones", "completed": false },
      { "key": "firstTreasureAdded", "label": "Create First Treasure", "description": "Upload a photo, video, or document", "completed": false },
      { "key": "legacyCreated", "label": "Create First Legacy", "description": "Assign a treasure to a recipient", "completed": false }
    ]
  }
}
```

> `percentage = (completedSteps / totalSteps) * 100`. `accountCreated` is always `true` for any existing user.

**Errors:**

| Status | Reason |
|--------|--------|
| 401 | Missing or invalid user_token |
| 404 | User not found |
| 500 | Server error |

---

### 7. Complete Onboarding

**POST** `/api/user/onboarding/complete` 🔒 **Protected** — requires `user_token` cookie

Called when the user taps **"Go to My Vault"**. Marks `isOnboardingComplete: true` so subsequent logins skip straight to Home.

> No body required.

**Response 200:**

```json
{
  "success": true,
  "message": "Onboarding completed",
  "data": {
    "user": { "...": "full user document, minus password" },
    "estateReadiness": { "percentage": 20, "completedSteps": 1, "totalSteps": 5, "checklist": [ "..." ] }
  }
}
```

**Errors:**

| Status | Reason |
|--------|--------|
| 401 | Missing or invalid user_token |
| 404 | User not found |
| 500 | Server error |

---

### Future Resources (not built yet)

`Treasures`, `Recipients`, and `Legacy Gifts` are now built (see below) — creating each one flips its matching `User` flag (`firstTreasureAdded`, `recipientAdded`, `legacyCreated`) automatically. **Executors** is the one checklist item still unbuilt: `executorsComplete` defaults to `false` and has no endpoint yet. When it's built, its `complete` route should set `executorsComplete: true` on the `User` document the same way the other three do. No changes to `buildEstateReadiness()` (`backend/libs/estateReadiness.js`) will be needed — it already reads the flag directly.

---

## Dashboard APIs

Maps to the **Home** screen (both empty and active states).

### 8. Get Dashboard Stats

**GET** `/api/user/dashboard/stats` 🔒 **Protected** — requires `user_token` cookie

Returns everything the Home screen needs in one call: the greeting name, the Estate Readiness card, and the "Legacy Snapshot" tile numbers.

**Response 200:**

```json
{
  "success": true,
  "message": "Dashboard stats",
  "data": {
    "firstName": "Eleanor",
    "estateReadiness": {
      "percentage": 80,
      "completedSteps": 4,
      "totalSteps": 5,
      "checklist": [
        { "key": "accountCreated", "label": "Account Created", "description": "Your private Vault is secure", "completed": true },
        { "key": "executorsComplete", "label": "Add Executors", "description": "Assign trusted contacts to manage your estate", "completed": false },
        { "key": "recipientAdded", "label": "Add Recipients", "description": "Build your directory of loved ones", "completed": true },
        { "key": "firstTreasureAdded", "label": "Create First Treasure", "description": "Upload a photo, video, or document", "completed": true },
        { "key": "legacyCreated", "label": "Create First Legacy", "description": "Assign a treasure to a recipient", "completed": true }
      ]
    },
    "stats": {
      "treasureCount": 127,
      "legacyCount": 48,
      "recipientCount": 12,
      "scheduledCount": 31
    }
  }
}
```

> **Frontend logic:** if `stats.treasureCount === 0`, render the empty state ("Start Building Your Legacy" + "Create First Treasure" button). Otherwise render the "Legacy Snapshot" tile grid. `scheduledCount` = Legacy Gifts with `releaseType: "scheduled"` that haven't been delivered yet.

**Errors:**

| Status | Reason |
|--------|--------|
| 401 | Missing or invalid user_token |
| 404 | User not found |
| 500 | Server error |

---

## Treasures APIs

Maps to the **"Create Treasure"** flow — 4 types, each ending at the same "Treasure Saved" confirmation screen. All the recording/preview/"Add Details" screens in between are client-side steps; the API is only called once, on the final **"Save Treasure"** tap.

A Treasure always has: `type`, `title` (required), `label` (optional), `description` (optional), and 1+ uploaded `files`. **Document**-type treasures additionally carry `categories`, `importanceLevel`, and `whyImportant` from the Document "Add Details" screen.

### 9. Create Treasure

**POST** `/api/user/treasures/create` 🔒 **Protected** — `multipart/form-data`

**Form fields:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| type | string | ✅ | "video" | "voice" | "photo" | "document"| `"voice"` \| `"photo"` \| `"document"` |
| title | string | ✅ | e.g. "Advice For My Son" |
| label | string | – | e.g. "Life Lessons" |
| description | string | – | e.g. "Thoughts on responsibility and discipline." |
| durationSeconds | number | – | Video/Voice only — the recorded clip length |
| categories | string[] | ✅ (document only) | Repeat the categories key per value. One of: Family Records, Financial & Insurance, Real Estate, Legal & Estate, Medical Information, Business Records, Military Records, Education Records, Personal Instructions, Family History |
| importanceLevel | string | – (document only, default "Standard") | "Standard" | "Important" | "Critical"| `"Important"` \| `"Critical"` |
| whyImportant | string | – (document only) | "Why is this document important?" textarea |
| files | file[] | ✅ | Repeat the files key per file. Video/Voice/Document: exactly 1 file. Photo: 1–20 files (Photo Gallery) |

**File rules per type:**

| Type | Accepted mimetypes | Max files |
|------|--------------------|-----------|
| video | any video/* | 1 |
| voice | any audio/* | 1 |
| photo | any image/* | 20 |
| document | application/pdf, .doc, .docx, .txt, .jpg, .png, .mp4, .zip | 1 |

> Max file size: **50MB** (matches the "Max 50MB" notice on the Document upload screen).

**Response 201:**

```json
{
  "success": true,
  "message": "Treasure saved successfully",
  "data": {
    "treasure": {
      "_id": "665a...",
      "type": "document",
      "typeLabel": "Document",
      "title": "Life Insurance Policy",
      "label": "Financial",
      "description": "What should future family members know about this document...",
      "categories": ["Family Records", "Financial & Insurance"],
      "importanceLevel": "Standard",
      "whyImportant": "Critical for heirs — explains why I kept this and what actions they may need to take.",
      "files": [
        { "url": "https://storage.googleapis.com/...", "mimeType": "application/pdf", "size": 2516582, "originalName": "Eleanor_Will_2025.pdf" }
      ],
      "durationSeconds": null,
      "createdAt": "2026-07-23T17:11:14.542Z"
    }
  }
}
```

> `typeLabel` is the exact display string used on the review/confirmation screens (`"Video"`, `"Voice Note"`, `"Photo"`, `"Document"`) — use it directly rather than re-deriving it from `type`.

**Errors:**

| Status | Reason |
|--------|--------|
| 400 | Missing/invalid type or title, wrong file count for the type, invalid mimetype, file over 50MB, missing/invalid document categories/importanceLevel |
| 401 | Missing or invalid user_token |
| 500 | Server error |

---

### 10. List Treasures

**GET** `/api/user/treasures/list` 🔒 **Protected**

**Query params:**

| Status | Reason |
|--------|--------|
| 400 | Missing required fields |
| 401 | Invalid email or password |
| 500 | Server error |0

**Response 200:**

```json
{
  "success": true,
  "message": "Treasures",
  "data": {
    "treasures": [ { "_id": "665a...", "type": "video", "typeLabel": "Video", "title": "Advice For My Son", "...": "..." } ],
    "pagination": { "total": 127, "page": 1, "limit": 20, "totalPages": 7, "hasNextPage": true, "hasPrevPage": false }
  }
}
```

---

### 11. Get Single Treasure

**GET** `/api/user/treasures/get/[id]` 🔒 **Protected**

**Response 200:** `{ "success": true, "message": "Treasure", "data": { "treasure": { "...": "full treasure document" } } }`

**Errors:** `400` invalid ID · `401` unauthenticated · `404` not found / belongs to another user

---

### 12. Update Treasure

**PUT** `/api/user/treasures/update/[id]` 🔒 **Protected** — JSON body

Metadata-only edit (`title`, `label`, `description`, and for Document treasures also `categories`, `importanceLevel`, `whyImportant`). Re-uploading files isn't supported — create a new Treasure instead.

**Errors:** `400` invalid ID / empty title / invalid category or importance level · `401` · `404`

---

### 13. Delete Treasure

**DELETE** `/api/user/treasures/delete/[id]` 🔒 **Protected**

Deletes the Treasure and its file(s) from Firebase Storage.

**Errors:**

| Status | Reason |
|--------|--------|
| 400 | Missing required fields |
| 401 | Invalid email or password |
| 500 | Server error |1

---

## Recipients APIs

Maps to the **"Add new recipient"** action on the "Assign to" (Legacy Step 1 of 3) screen and the "SAVED RECIPIENTS" list it shows.

### 14. Create Recipient

**POST** `/api/user/recipients/create` 🔒 **Protected**

**Body:**

```json
{ "name": "Sofia Chen", "relationship": "Daughter" }
```

**Response 201:**

```json
{
  "success": true,
  "message": "Recipient added",
  "data": { "recipient": { "_id": "665b...", "name": "Sofia Chen", "relationship": "Daughter", "createdAt": "..." } }
}
```

> First recipient created sets `User.recipientAdded = true`, advancing Estate Readiness.

**Errors:** `400` missing `name`/`relationship` · `401`

---

### 15. List Recipients

**GET** `/api/user/recipients/list` 🔒 **Protected**

**Query params:** `page`, `limit`, `sort` (`name` | `createdAt`), `order`, `search` (matches `name`) — standard pagination.

**Response 200:**

```json
{
  "success": true,
  "message": "Recipients",
  "data": {
    "recipients": [
      { "_id": "665b...", "name": "Sofia Chen", "relationship": "Daughter" },
      { "_id": "665c...", "name": "James Whitfield", "relationship": "Son" },
      { "_id": "665d...", "name": "Marcus Lee", "relationship": "Spouse" }
    ],
    "pagination": { "total": 12, "page": 1, "limit": 20, "totalPages": 1, "hasNextPage": false, "hasPrevPage": false }
  }
}
```

> The avatar initial/color shown per recipient row (e.g. "S", "J", "M" in colored circles) is a frontend-only derivation from `name` — not returned by the API.

---

### 16. Get Single Recipient

**GET** `/api/user/recipients/get/[id]` 🔒 **Protected** — `400` invalid ID · `404` not found

### 17. Update Recipient

**PUT** `/api/user/recipients/update/[id]` 🔒 **Protected** — body: `{ name?, relationship? }`

### 18. Delete Recipient

**DELETE** `/api/user/recipients/delete/[id]` 🔒 **Protected**

**Errors:** `409` if the recipient is assigned to a Legacy Gift — reassign or delete the Legacy first.

---

## Legacy Gifts APIs

Maps to the **"Create Legacy"** wizard: **Assign to** (Step 1 of 3, pick recipients) → **Release Rules** (Step 2 of 3, pick delivery timing) → **Review & Save** (Step 3 of 3) → **"Legacy Created"**. Like Treasures, the intermediate steps are client-side state — the API is called once, on **"Save Legacy"**.

A Legacy Gift wraps one existing Treasure with recipients + a release rule. Every Treasure can only be attached to one Legacy Gift.

### 19. Create Legacy Gift

**POST** `/api/user/legacies/create` 🔒 **Protected**

**Body:**

```json
{
  "treasureId": "665a...",
  "recipientIds": ["665b...", "665c..."],
  "releaseType": "scheduled",
  "releaseDate": "2026-11-03"
}
```

| Status | Reason |
|--------|--------|
| 400 | Missing required fields |
| 401 | Invalid email or password |
| 500 | Server error |2

**Response 201:**

```json
{
  "success": true,
  "message": "Legacy created successfully",
  "data": {
    "legacy": {
      "_id": "665e...",
      "releaseType": "scheduled",
      "releaseDate": "2026-11-03T00:00:00.000Z",
      "status": "pending",
      "treasure": { "_id": "665a...", "title": "Advice for my Son", "type": "video", "typeLabel": "Video", "files": [ "..." ] },
      "recipients": [
        { "_id": "665b...", "name": "Sofia Chen", "relationship": "Daughter" },
        { "_id": "665c...", "name": "James Whitfield", "relationship": "Son" }
      ]
    }
  }
}
```

> **Frontend logic:** the "Legacy Created" confirmation screen's message ("...will be delivered to Sofia & James as scheduled") can be built directly from `data.legacy.recipients` — no extra call needed. First Legacy created sets `User.legacyCreated = true`, advancing Estate Readiness to its final step.

**Errors:**

| Status | Reason |
|--------|--------|
| 400 | Missing required fields |
| 401 | Invalid email or password |
| 500 | Server error |3

---

### 20. List Legacy Gifts

**GET** `/api/user/legacies/list` 🔒 **Protected**

**Query params:** `page`, `limit`, `sort` (`createdAt` | `releaseDate`), `order`, `status` (`pending` | `delivered`), `releaseType` (`estate_activation` | `scheduled`) — standard pagination. Response items include populated `treasure` and `recipients`, same shape as the create response.

---

### 21. Get Single Legacy Gift

**GET** `/api/user/legacies/get/[id]` 🔒 **Protected** — full detail with populated treasure + recipients. `400` invalid ID · `404` not found

### 22. Update Legacy Gift

**PUT** `/api/user/legacies/update/[id]` 🔒 **Protected** — body: `{ recipientIds?, releaseType?, releaseDate? }`. Only allowed while `status: "pending"`.

**Errors:** `409` if the Legacy has already been delivered.

### 23. Delete Legacy Gift

**DELETE** `/api/user/legacies/delete/[id]` 🔒 **Protected** — removes the Legacy Gift only (the underlying Treasure is untouched). `409` if already delivered.

---

## Error Reference

All error responses follow the standard shape:

```json
{
  "success": false,
  "message": "Human-readable error description",
  "data": null
}
```

| Status | Reason |
|--------|--------|
| 400 | Missing required fields |
| 401 | Invalid email or password |
| 500 | Server error |4

---

## Frontend Flow Summary

```
App Launch (3 static splash screens — no API)
  ├── /api/user/auth/me  →  authenticated?
  │     ├── YES + isOnboardingComplete: true  →  Home
  │     ├── YES + isOnboardingComplete: false →  Resume Onboarding (Secure your Vault / Estate Readiness)
  │     └── NO (401)                          →  Sign in (Create your Vault)
  │
"Create your Vault" (register) → POST /api/user/auth/register
  └── auto-cookie set, redirect to "Secure your Vault"
  │
"Secure your Vault" (biometric) → PUT /api/user/security/update  { biometricEnabled }
  └── on-device Face ID/Touch ID enrollment happens client-side; this call just persists the preference
  │
"Estate Readiness" screen
  └── GET /api/user/onboarding/status   (render checklist + %)
  └── "Go to My Vault" → POST /api/user/onboarding/complete
  │
Home  →  GET /api/user/dashboard/stats  (Estate Readiness card + Legacy Snapshot tiles)
  │
"Create Treasure" (video / voice / photo / document — pick one)
  └── record/upload → Add Details → Review  (all client-side)
  └── "Save Treasure" → POST /api/user/treasures/create  (multipart)
  └── "Treasure Saved" → Create Another Treasure | Go to My Treasure | Create Legacy
  │
"Create Legacy" (from "Create Legacy" button, or a fresh Video/Voice/Photo/Document capture)
  └── "Assign to"      → GET /api/user/recipients/list  (pick existing) + POST /api/user/recipients/create (add new)
  └── "Release Rules"  → choose estate_activation | scheduled (+ date)
  └── "Review & Save"  → "Save Legacy" → POST /api/user/legacies/create
  └── "Legacy Created" → Return to My Treasures
```

---

## Auth Cookie Details

| Status | Reason |
|--------|--------|
| 400 | Missing required fields |
| 401 | Invalid email or password |
| 500 | Server error |5

The cookie is set/cleared automatically by the server — the frontend never handles the raw JWT.

---

## File Upload Details

All Treasure files are uploaded to **Firebase Storage** (same project/bucket as the liverr project — shared service account, namespaced under an `afterword/` prefix so objects don't collide). Uploads go through `backend/libs/fileUpload.js` (`uploadFile(buffer, originalName, mimeType)`), which returns a long-lived signed URL stored directly on the `UserTreasure.files[].url` field — there's no separate media/attachment lookup endpoint, the URL is always inline on the Treasure.

| Status | Reason |
|--------|--------|
| 400 | Missing required fields |
| 401 | Invalid email or password |
| 500 | Server error |6

**No CDN / resumable-upload layer yet** — uploads go through the Next.js API route as a single buffered `multipart/form-data` request (same pattern as the liverr project's `/api/media/upload`). This is fine for photos/PDFs/short clips; if video recordings grow large enough to hit serverless request-body limits in production, switch to direct-to-Storage upload (signed upload URL) without changing the `UserTreasure.files` schema.