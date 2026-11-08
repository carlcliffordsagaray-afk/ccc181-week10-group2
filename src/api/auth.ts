
const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'campusconnect_token';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResult {
  token: string;
  user: User;
}


export type ApiErrorKind = 'invalid' | 'unauthorized' | 'network' | 'server';

export class ApiError extends Error {
  kind: ApiErrorKind;

  constructor(kind: ApiErrorKind) {
    super(kind);
    this.kind = kind;
  }
}


export function messageFor(error: unknown): string {
  const kind = error instanceof ApiError ? error.kind : 'server';
  switch (kind) {
    case 'invalid':
    case 'unauthorized':
      return 'Wrong email or password.';
    case 'network':
      return 'Cannot reach the server. Please try again.';
    default:
      return 'Something went wrong on our side. Please try again later.';
  }
}


async function send(path: string, init: RequestInit): Promise<Response> {
  if (!API_URL) {
    console.error('VITE_API_URL is missing. Copy .env.example to .env and restart npm run dev.');
    throw new ApiError('network');
  }
  try {
    return await fetch(`${API_URL}${path}`, init);
  } catch {
    throw new ApiError('network');
  }
}

function isUser(value: unknown): value is User {
  const user = value as User | null;
  return (
    typeof user === 'object' &&
    user !== null &&
    typeof user.id === 'number' &&
    typeof user.name === 'string' &&
    typeof user.email === 'string'
  );
}


export async function login(email: string, password: string): Promise<LoginResult> {
  const response = await send('/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 400) throw new ApiError('invalid');
  if (response.status === 401) throw new ApiError('unauthorized');
  if (!response.ok) throw new ApiError('server'); // fetch does NOT do this for you

  try {
    const data = (await response.json()) as { token?: unknown; user?: unknown };
    if (typeof data.token !== 'string' || !isUser(data.user)) {
      throw new Error('Unexpected response');
    }
    return { token: data.token, user: data.user };
  } catch {
    throw new ApiError('server');
  }
}


export async function getMe(token: string): Promise<User> {
  const response = await send('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) throw new ApiError('unauthorized');
  if (!response.ok) throw new ApiError('server');

  try {
    const data: unknown = await response.json();
    if (!isUser(data)) throw new Error('Unexpected response');
    return data;
  } catch {
    throw new ApiError('server');
  }
}


export function saveToken(token: string): void {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
  } catch {
 
  }
}

export function readToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function clearToken(): void {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
  } catch {
  
  }
}
