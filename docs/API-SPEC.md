# CampusConnect API Specification

Version 1. Base address while developing: `http://localhost:3000/api/v1`.
All requests and responses use JSON. The API is **stateless**: every protected request carries its own token.

## 1. Required endpoints (fixed contract)

| Method | Endpoint | Purpose | Success | Errors |
| --- | --- | --- | --- | --- |
| GET | `/api/v1/health` | Checks that the API is running. | 200 OK | none |
| POST | `/api/v1/sessions` | Logs in. A *session* is what you create when you log in. | 200 OK | 400, 401 |
| GET | `/api/v1/users/me` | Returns the logged-in user. Needs a token. | 200 OK | 401 |

Unknown address: **404** `{ "error": "Not found." }`. Unexpected crash: **500** `{ "error": "Something went wrong." }`.

### GET /api/v1/health

**200 OK**

```json
{ "status": "ok" }
```

### POST /api/v1/sessions

Request body:

```json
{ "email": "student@campusconnect.test", "password": "Campus26" }
```

**200 OK** (login succeeded; the token expires in 1 hour)

```json
{
  "token": "<a long token text>",
  "user": { "id": 1, "name": "Demo Student", "email": "student@campusconnect.test" }
}
```

**400 Bad Request** (email or password missing, not text, or the email is badly formed)

```json
{ "error": "Email and password are required." }
```

**401 Not logged in** (wrong password **or** unknown email; the message is the same for both, so nobody can find out which emails exist)

```json
{ "error": "Invalid email or password." }
```

Rules: the email is trimmed and changed to lowercase before the search. The password is compared with a bcrypt hash. The password and its hash are never sent in any response.

### GET /api/v1/users/me

Request header:

```
Authorization: Bearer <token>
```

**200 OK**

```json
{ "id": 1, "name": "Demo Student", "email": "student@campusconnect.test" }
```

**401 Not logged in** (token missing, wrong, tampered with, or expired)

```json
{ "error": "Not logged in." }
```

### Demo account

| Email | Password | Name |
| --- | --- | --- |
| student@campusconnect.test | Campus26 | Demo Student |

## 2. Status codes used

| Code | When |
| --- | --- |
| 200 OK | Health, login, and "who am I" succeeded. |
| 400 Bad Request | The login body is missing a field or is badly formed. |
| 401 Not logged in | Wrong login, or a missing/invalid/expired token. |
| 404 Not Found | The address does not exist. |
| 500 Internal Server Error | An unexpected crash (no details are sent to the client). |

## 3. Events (design only, not built)

Resource: **events** (the school events page). Plural noun, no verbs in the address, versioned, filters in the query string.

| Method | Endpoint | What it does | Success | Errors |
| --- | --- | --- | --- | --- |
| GET | `/api/v1/events` | List all events | 200 OK | none |
| GET | `/api/v1/events?month=11` | List only events in November | 200 OK | 400 (month is not 1 to 12) |
| GET | `/api/v1/events/12` | Get one event | 200 OK | 404 (no such event) |
| POST | `/api/v1/events` | Add a new event | 201 Created | 400 (title or date missing), 401 |
| PATCH | `/api/v1/events/12` | Change only some fields of event 12 | 200 OK | 400, 401, 404 |
| DELETE | `/api/v1/events/12` | Remove event 12 | 204 No Content | 401, 404 |

Example event:

```json
{ "id": 12, "title": "Intramurals Opening", "date": "2026-11-20", "venue": "University Gym" }
```

Notes: POST is not repeatable (a double click can create two events), PATCH changes only the fields that are sent, and DELETE can be repeated without extra effect.

## 4. Security notes

- `.env` files are never committed; only `.env.example` files with fake values are.
- `JWT_SECRET` lives only on the server. The front end only ever sees the token.
- The backend validates every request, whatever the front end already checked.
- CORS allows only the front end address from `CLIENT_ORIGIN`.
