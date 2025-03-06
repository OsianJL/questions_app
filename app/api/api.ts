// src/api/api.ts

import axios from 'axios';

// Configuración de la URL base de la API
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Cambia a tu URL de desarrollo o producción según corresponda
});

// ================================
// Funciones de Autenticación
// ================================

/**
 * Registra un nuevo usuario.
 * Endpoint: POST /register
 * Ejemplo de body:
 * {
 *   "email": "nuevo_usuario@example.com",
 *   "password": "Test@1234"
 * }
 * Respuesta: JSON que incluye un mensaje con el enlace de confirmación.
 */
export const registerUser = async (email: string, password: string) => {
  const response = await api.post('/register', { email, password });
  return response.data;
};

/**
 * Inicia sesión y obtiene un token JWT.
 * Endpoint: POST /login
 * Ejemplo de body:
 * {
 *   "email": "nuevo_usuario@example.com",
 *   "password": "Test@1234"
 * }
 * Respuesta: { access_token: "eyJhb..." }
 */
export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

/**
 * Obtiene un recurso protegido.
 * Endpoint: GET /protected
 * Requiere token JWT en la cabecera.
 */
export const getProtectedResource = async (token: string) => {
  const response = await api.get('/protected', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ================================
// Funciones para Confirmación de Email y Recuperación de Contraseña
// ================================

/**
 * Confirma el email del usuario.
 * Endpoint: GET /confirm/<token>
 */
export const confirmEmail = async (token: string) => {
  const response = await api.get(`/confirm/${token}`);
  return response.data;
};

/**
 * Solicita el restablecimiento de contraseña.
 * Endpoint: POST /reset_password
 * Ejemplo de body:
 * { "email": "nuevo_usuario@example.com" }
 */
export const requestPasswordReset = async (email: string) => {
  const response = await api.post('/reset_password', { email });
  return response.data;
};

/**
 * Confirma el token de reset y actualiza la contraseña.
 * Endpoint: POST /reset_password/confirm/<token>
 * Ejemplo de body:
 * { "new_password": "NuevaContraseña@123" }
 */
export const resetPassword = async (token: string, newPassword: string) => {
  const response = await api.post(`/reset_password/confirm/${token}`, { new_password: newPassword });
  return response.data;
};

// ================================
// Funciones para Gestión del Perfil de Usuario
// ================================

/**
 * Crea el perfil del usuario.
 * Endpoint: POST /profile
 * Ejemplo de body:
 * {
 *   "username": "mi_usuario",
 *   "image_url": "http://example.com/imagen.jpg",
 *   "moto": "Mi moto favorita"
 * }
 * Requiere token JWT.
 */
export const createProfile = async (token: string, username: string, image_url: string, moto: string) => {
  const response = await api.post('/profile', { username, image_url, moto }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Obtiene el perfil del usuario.
 * Endpoint: GET /profile/<user_id>
 * Se espera que el usuario autenticado sea el propietario.
 */
export const getProfile = async (token: string, userId: number) => {
  const response = await api.get(`/profile/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Actualiza parcialmente el perfil del usuario.
 * Endpoint: PATCH /profile/<user_id>
 * Ejemplo de body (puede incluir uno o varios campos):
 * { "username": "nuevo_usuario", "image_url": "http://example.com/nueva_imagen.jpg", "moto": "Nuevo lema" }
 */
export const updateProfile = async (
  token: string,
  userId: number,
  updateData: { username?: string; image_url?: string; moto?: string }
) => {
  const response = await api.patch(`/profile/${userId}`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Elimina el perfil del usuario.
 * Endpoint: DELETE /profile/<user_id>
 */
export const deleteProfile = async (token: string, userId: number) => {
  const response = await api.delete(`/profile/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ================================
// Funciones para Gestión de Mensajes Públicos
// ================================

/**
 * Crea un nuevo mensaje público (una pregunta).
 * Endpoint: POST /message
 * Ejemplo de body:
 * {
 *   "tematica": "Ciencia",
 *   "idioma": "Español",
 *   "content": "¿Cuál es tu descubrimiento científico favorito?"
 * }
 * Requiere token JWT.
 */
export const createPublicMessage = async (
  token: string,
  tematica: string,
  idioma: string,
  content: string
) => {
  const response = await api.post('/message', { tematica, idioma, content }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Lista mensajes públicos, con filtros opcionales.
 * Endpoint: GET /message
 * Ejemplo de URL: /message?tematica=Ciencia&idioma=Español
 */
export const listPublicMessages = async (
  token: string,
  filters?: { tematica?: string; idioma?: string; contestado?: boolean }
) => {
  const response = await api.get('/message', {
    headers: { Authorization: `Bearer ${token}` },
    params: filters,
  });
  return response.data;
};

/**
 * Obtiene el detalle de un mensaje público.
 * Si el usuario autenticado es el autor, se incluye el campo 'reply' y 'responder_id'.
 * Endpoint: GET /message/<message_id>
 */
export const getPublicMessageDetail = async (token: string, messageId: number) => {
  const response = await api.get(`/message/${messageId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Responde a un mensaje público.
 * Endpoint: PATCH /message/<message_id>
 * Ejemplo de body:
 * { "reply": "Esta es mi respuesta a la pregunta." }
 * Requiere token JWT, y el usuario autenticado no debe ser el autor.
 */
export const replyToPublicMessage = async (
  token: string,
  messageId: number,
  reply: string
) => {
  const response = await api.patch(`/message/${messageId}`, { reply }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Elimina un mensaje público (solo el autor puede hacerlo).
 * Endpoint: DELETE /message/<message_id>
 */
export const deletePublicMessage = async (token: string, messageId: number) => {
  const response = await api.delete(`/message/${messageId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ================================
// Funciones para Gestión de Chats (Mensajes Directos)
// ================================

/**
 * Lista todas las conversaciones (chats) en las que participa el usuario autenticado.
 * Endpoint: GET /chats
 */
export const listChats = async (token: string) => {
  const response = await api.get('/chats', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Inicia un chat con otro usuario.
 * Si ya existe un chat entre ambos, retorna el chat existente.
 * Endpoint: POST /chat
 * Ejemplo de body:
 * { "other_user_id": 9876543210 }
 */
export const initiateChat = async (token: string, otherUserId: number) => {
  const response = await api.post('/chat', { other_user_id: otherUserId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Lista los mensajes de un chat.
 * Endpoint: GET /chat/<chat_id>
 */
export const getChatMessages = async (token: string, chatId: number) => {
  const response = await api.get(`/chat/${chatId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Envía un mensaje en un chat.
 * Endpoint: POST /chat/<chat_id>
 * Ejemplo de body:
 * { "content": "Hola, ¿cómo estás?" }
 */
export const sendChatMessage = async (token: string, chatId: number, content: string) => {
  const response = await api.post(`/chat/${chatId}`, { content }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
