# Reporte de Problemas - API CRM Cluster Module

**Fecha**: 12 de Diciembre, 2025 (Actualizado: 20:20:13 GMT)  
**Endpoint**: `https://api2.eventosorganizador.com/graphql`  
**Origen Frontend**: `http://192.168.88.254:3005`

> **✅ FRONTEND CORREGIDO**: El frontend ahora envía correctamente la mutation con `CRM_LeadInput!` y solo `input` en las variables. El backend responde con **200 OK**, pero el navegador bloquea la respuesta debido a **headers CORS duplicados** que el backend está enviando.

> **⚠️ ACTUALIZACIÓN IMPORTANTE**: Según respuesta del backend, los parámetros `development` y `userId` NO deben enviarse como parámetros separados. Estos valores se extraen automáticamente del JWT token en el header `Authorization`. El tipo de input correcto es `CRM_LeadInput!` (no `CreateCRM_LeadInput!`).

---

## 🔴 Problemas Identificados

### 1. Error CORS - Header Duplicado ⚠️ PROBLEMA PERSISTENTE

```
Access to fetch at 'https://api2.eventosorganizador.com/graphql' from origin 'http://192.168.88.254:3005' 
has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header contains multiple values 
'http://192.168.88.254:3005, http://192.168.88.254:3005', but only one is allowed.
```

**Causa**: El servidor está enviando los headers CORS duplicados con el mismo valor.

**Respuesta del servidor (20:20:13 GMT)**:
```
Status Code: 200 OK ✅
access-control-allow-credentials: true
access-control-allow-credentials: true  ⚠️ DUPLICADO
access-control-allow-origin: http://192.168.88.254:3005
access-control-allow-origin: http://192.168.88.254:3005  ⚠️ DUPLICADO
```

**Estado**: 
- ✅ El backend responde correctamente con **200 OK**
- ✅ El frontend envía la request correctamente
- ❌ El navegador bloquea la respuesta debido a headers duplicados
- ⚠️ **Este es un problema del backend que necesita ser corregido**

### 2. Error 400 Bad Request ✅ RESUELTO
- **Estado anterior**: El servidor respondía con `400 Bad Request`
- **Estado actual**: El servidor responde con **200 OK** ✅
- **Causa resuelta**: El frontend ahora envía la estructura correcta (`CRM_LeadInput!` y solo `input`)

---

## 📤 Request Enviado

### Headers Enviados

```http
POST /graphql HTTP/1.1
Host: api2.eventosorganizador.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1MTg5MTkxMTA3NjA1NDM0NGUxNWUyNTY0MjViYjQyNWVlYjNhNWMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVXN1YXJpbyBCb2Rhc2RlaG95IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqN2FKQmZhOWZhZVAyNGs2UGRLNkJRWnJFaVU1aGsydFNIdnZqUjZ3PXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2JvZGFzZGVob3ktMTA2MyIsImF1ZCI6ImJvZGFzZGVob3ktMTA2MyIsImF1dGhfdGltZSI6MTc2NTU2MzIxOCwidXNlcl9pZCI6InVwU0VUcm1YYzdabnNJaHJqRGpiSGQ3dTJ1cDEiLCJzdWIiOiJ1cFNFVHJtWGM3Wm5zSWhyakRqYkhkN3UydXAxIiwiaWF0IjoxNzY1NTYzMjE4LCJleHAiOjE3NjU1NjY4MTgsImVtYWlsIjoiYm9kYXNkZWhveS5jb21AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX251bWJlciI6IiszNDYyMjQ0MDIxMyIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDc0MzYwNzUzMjMxNzE1MTYxNTgiXSwiZW1haWwiOlsiYm9kYXNkZWhveS5jb21AZ21haWwuY29tIl0sInBob25lIjpbIiszNDYyMjQ0MDIxMyJdfSwic2lnbl9pbl9wcm92aWRlciI6ImN1c3RvbSJ9fQ.Y_LVpsxf2GStfYmww7josIWOSzIfoG2w5-CmhYlv0qqaTi6g-u00kyKxC9OMIrTZ4m-Xn2ctb18b7YFyXzWWNjwCILS8Z8X8Cyto4S12-uWM6bML0Rlvbw3O7LHsQYb5BoR0mnfm82B-1MkDsPFp_U8vwfnjIoldXKVI3sUskdBx5sAJgg2TM6h_c6JJVLD4Zjlxd2VgKEE9UAVJEI3GmGwRgf8KD1AubLUj8yK6mJxvmXegxK81So5cXIcxBdB68UWt1ezhrdIc_Uh0iJ_WIcSgSaX30NG8tTDfUopiM9L3ERLljvappVjmkWwoyOioW-bOqb0sH3AgyOmSWss8Tg
X-Development: bodasdehoy
Origin: http://192.168.88.254:3005
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
```

### Token JWT Decodificado (Actualizado)

```json
{
  "name": "Usuario Bodasdehoy",
  "picture": "https://lh3.googleusercontent.com/a-/AOh14Gj7aJBfa9fadEP24k6PdK6BQZrEiU5hk2tSHvvjR6w=s96-c",
  "iss": "https://securetoken.google.com/bodasdehoy-1063",
  "aud": "bodasdehoy-1063",
  "auth_time": 1765569057,
  "user_id": "upSETrmXc7ZnsIhrjDjbHd7u2up1",
  "sub": "upSETrmXc7ZnsIhrjDjbHd7u2up1",
  "iat": 1765569057,
  "exp": 1765572657,
  "email": "bodasdehoy.com@gmail.com",
  "email_verified": true,
  "phone_number": "+34622440213",
  "firebase": {
    "identities": {
      "google.com": ["107436075323171516158"],
      "email": ["bodasdehoy.com@gmail.com"],
      "phone": ["+34622440213"]
    },
    "sign_in_provider": "custom"
  }
}
```

**User ID extraído del token**: `upSETrmXc7ZnsIhrjDjbHd7u2up1`  
**Token completo**: `eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1MTg5MTkxMTA3NjA1NDM0NGUxNWUyNTY0MjViYjQyNWVlYjNhNWMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVXN1YXJpbyBCb2Rhc2RlaG95IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqN2FKQmZhOWZhZVAyNGs2UGRLNkJRWnJFaVU1aGsydFNIdnZqUjZ3PXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2JvZGFzZGVob3ktMTA2MyIsImF1ZCI6ImJvZGFzZGVob3ktMTA2MyIsImF1dGhfdGltZSI6MTc2NTU2OTA1NywidXNlcl9pZCI6InVwU0VUcm1YYzdabnNJaHJqRGpiSGQ3dTJ1cDEiLCJzdWIiOiJ1cFNFVHJtWGM3Wm5zSWhyakRqYkhkN3UydXAxIiwiaWF0IjoxNzY1NTY5MDU3LCJleHAiOjE3NjU1NzI2NTcsImVtYWlsIjoiYm9kYXNkZWhveS5jb21AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX251bWJlciI6IiszNDYyMjQ0MDIxMyIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDc0MzYwNzUzMjMxNzE1MTYxNTgiXSwiZW1haWwiOlsiYm9kYXNkZWhveS5jb21AZ21haWwuY29tIl0sInBob25lIjpbIiszNDYyMjQ0MDIxMyJdfSwic2lnbl9pbl9wcm92aWRlciI6ImN1c3RvbSJ9fQ.Z_pyhBCxUJ8kpn3dTDxRc4s3UxJQz0gUZtUaQeCF0KsxI8c1jGamp15wEjridwFqmCTyViKHz-5tuTw8CpHxxLCMY2E5G6_wTtDiX8MJxCpcGU9r-NEUW2QRjl_ntUoDtYVhM1HRMbklw1uGgu4Fjs1Sxu-CqDQlyEEbUYI_9lRH_uZVqNFM7Q-AtUNZS94CdKTxTdWvCJ_2hbOfg85s4Oz_gZxnnDGUQn1SIa9Vrr7w7ul0labac4SUFhhbDAEo_zmfdYicT_nq889uMOa6eNudaSh2bhJ99BpYgg2hJzOn18l6xs63D7JrEjSL5EdYeK4BarhRsoUgwA65_h79Xw`

### Query GraphQL Correcta (Según Backend)

```graphql
mutation CreateLead($input: CRM_LeadInput!) {
  createCRMLead(input: $input) {
    success
    errors {
      field
      message
      code
    }
    lead { 
      id 
      name 
      email 
      phone 
      company 
      position 
      source 
      status 
      priority 
      value 
      notes 
      createdAt 
      updatedAt 
    }
  }
}
```

**⚠️ CORRECCIÓN**: 
- Tipo de input: `CRM_LeadInput!` (NO `CreateCRM_LeadInput!`)
- NO incluir `$development` ni `$userId` como parámetros
- `development` y `userId` se extraen automáticamente del JWT token

### Variables Correctas (SEGÚN BACKEND)

```json
{
  "input": {
    "name": "Lead Demo Test",
    "email": "lead.test@example.com",
    "phone": "+34 600 000 000",
    "company": "Empresa Demo",
    "position": "Director Comercial",
    "source": "WEBSITE",
    "status": "NEW",
    "priority": "MEDIUM",
    "value": 15000,
    "notes": "Lead generado desde playground CRM."
  }
}
```

**✅ CORRECTO**: 
- Solo se envía `input`
- `development` y `userId` se extraen automáticamente del JWT token en el header `Authorization`
- El backend decodifica el token y obtiene estos valores automáticamente

---

## 📥 Response Recibido

### Status Code
```
400 Bad Request
```

### Headers de Respuesta

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8
Content-Length: 463
Access-Control-Allow-Origin: http://192.168.88.254:3005
Access-Control-Allow-Origin: http://192.168.88.254:3005  ⚠️ DUPLICADO
Access-Control-Allow-Credentials: true
Access-Control-Allow-Credentials: true  ⚠️ DUPLICADO
Cache-Control: no-store
Vary: Origin
Server: nginx
```

### Body de Respuesta
*(No se muestra en los logs, pero el servidor responde con 400)*

---

## 🧪 cURL de Prueba

### Request Actual (INCORRECTO)

```bash
curl -X POST https://api2.eventosorganizador.com/graphql \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1MTg5MTkxMTA3NjA1NDM0NGUxNWUyNTY0MjViYjQyNWVlYjNhNWMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVXN1YXJpbyBCb2Rhc2RlaG95IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqN2FKQmZhOWZhZVAyNGs2UGRLNkJRWnJFaVU1aGsydFNIdnZqUjZ3PXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2JvZGFzZGVob3ktMTA2MyIsImF1ZCI6ImJvZGFzZGVob3ktMTA2MyIsImF1dGhfdGltZSI6MTc2NTU2MzIxOCwidXNlcl9pZCI6InVwU0VUcm1YYzdabnNJaHJqRGpiSGQ3dTJ1cDEiLCJzdWIiOiJ1cFNFVHJtWGM3Wm5zSWhyakRqYkhkN3UydXAxIiwiaWF0IjoxNzY1NTYzMjE4LCJleHAiOjE3NjU1NjY4MTgsImVtYWlsIjoiYm9kYXNkZWhveS5jb21AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX251bWJlciI6IiszNDYyMjQ0MDIxMyIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDc0MzYwNzUzMjMxNzE1MTYxNTgiXSwiZW1haWwiOlsiYm9kYXNkZWhveS5jb21AZ21haWwuY29tIl0sInBob25lIjpbIiszNDYyMjQ0MDIxMyJdfSwic2lnbl9pbl9wcm92aWRlciI6ImN1c3RvbSJ9fQ.Y_LVpsxf2GStfYmww7josIWOSzIfoG2w5-CmhYlv0qqaTi6g-u00kyKxC9OMIrTZ4m-Xn2ctb18b7YFyXzWWNjwCILS8Z8X8Cyto4S12-uWM6bML0Rlvbw3O7LHsQYb5BoR0mnfm82B-1MkDsPFp_U8vwfnjIoldXKVI3sUskdBx5sAJgg2TM6h_c6JJVLD4Zjlxd2VgKEE9UAVJEI3GmGwRgf8KD1AubLUj8yK6mJxvmXegxK81So5cXIcxBdB68UWt1ezhrdIc_Uh0iJ_WIcSgSaX30NG8tTDfUopiM9L3ERLljvappVjmkWwoyOioW-bOqb0sH3AgyOmSWss8Tg" \
  -H "X-Development: bodasdehoy" \
  -H "Origin: http://192.168.88.254:3005" \
  -d '{
    "query": "mutation CreateLead($input: CreateCRM_LeadInput!, $development: String!, $userId: ID!) { createCRMLead(input: $input, development: $development, userId: $userId) { success errors { message code } lead { id name email phone company position source status priority value notes createdAt updatedAt } } }",
    "variables": {
      "input": {
        "name": "Lead Demo Test",
        "email": "lead.test@example.com",
        "phone": "+34 600 000 000",
        "company": "Empresa Demo",
        "position": "Director Comercial",
        "source": "WEBSITE",
        "status": "NEW",
        "priority": "MEDIUM",
        "value": 15000,
        "notes": "Lead generado desde playground CRM."
      }
    }
  }'
```

### Request Correcto (SEGÚN BACKEND)

```bash
curl -X POST https://api2.eventosorganizador.com/graphql \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1MTg5MTkxMTA3NjA1NDM0NGUxNWUyNTY0MjViYjQyNWVlYjNhNWMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVXN1YXJpbyBCb2Rhc2RlaG95IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqN2FKQmZhOWZhZVAyNGs2UGRLNkJRWnJFaVU1aGsydFNIdnZqUjZ3PXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2JvZGFzZGVob3ktMTA2MyIsImF1ZCI6ImJvZGFzZGVob3ktMTA2MyIsImF1dGhfdGltZSI6MTc2NTU2OTA1NywidXNlcl9pZCI6InVwU0VUcm1YYzdabnNJaHJqRGpiSGQ3dTJ1cDEiLCJzdWIiOiJ1cFNFVHJtWGM3Wm5zSWhyakRqYkhkN3UydXAxIiwiaWF0IjoxNzY1NTY5MDU3LCJleHAiOjE3NjU1NzI2NTcsImVtYWlsIjoiYm9kYXNkZWhveS5jb21AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX251bWJlciI6IiszNDYyMjQ0MDIxMyIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDc0MzYwNzUzMjMxNzE1MTYxNTgiXSwiZW1haWwiOlsiYm9kYXNkZWhveS5jb21AZ21haWwuY29tIl0sInBob25lIjpbIiszNDYyMjQ0MDIxMyJdfSwic2lnbl9pbl9wcm92aWRlciI6ImN1c3RvbSJ9fQ.Z_pyhBCxUJ8kpn3dTDxRc4s3UxJQz0gUZtUaQeCF0KsxI8c1jGamp15wEjridwFqmCTyViKHz-5tuTw8CpHxxLCMY2E5G6_wTtDiX8MJxCpcGU9r-NEUW2QRjl_ntUoDtYVhM1HRMbklw1uGgu4Fjs1Sxu-CqDQlyEEbUYI_9lRH_uZVqNFM7Q-AtUNZS94CdKTxTdWvCJ_2hbOfg85s4Oz_gZxnnDGUQn1SIa9Vrr7w7ul0labac4SUFhhbDAEo_zmfdYicT_nq889uMOa6eNudaSh2bhJ99BpYgg2hJzOn18l6xs63D7JrEjSL5EdYeK4BarhRsoUgwA65_h79Xw" \
  -H "X-Development: bodasdehoy" \
  -H "Origin: http://192.168.88.254:3005" \
  -d '{
    "query": "mutation CreateLead($input: CRM_LeadInput!) { createCRMLead(input: $input) { success errors { field message code } lead { id name email phone company position source status priority value notes createdAt updatedAt } } }",
    "variables": {
      "input": {
        "name": "Lead Demo Test",
        "email": "lead.test@example.com",
        "phone": "+34 600 000 000",
        "company": "Empresa Demo",
        "position": "Director Comercial",
        "source": "WEBSITE",
        "status": "NEW",
        "priority": "MEDIUM",
        "value": 15000,
        "notes": "Lead generado desde playground CRM."
      }
    }
  }'
```

**✅ CORRECTO**: 
- Tipo de input: `CRM_LeadInput!`
- Solo se envía `input` en variables
- `development` y `userId` se extraen del JWT token automáticamente

---

## 📋 Resumen de Problemas

### 1. CORS - Header Duplicado
- **Problema**: El servidor envía `Access-Control-Allow-Origin` y `Access-Control-Allow-Credentials` duplicados
- **Impacto**: El navegador bloquea la petición por política CORS
- **Solución requerida**: El backend debe enviar cada header una sola vez

### 2. Variables y Tipos Incorrectos (RESUELTO)
- **Problema inicial**: Se intentó enviar `development` y `userId` como parámetros separados
- **Solución del Backend**: 
  - ✅ `development` y `userId` se extraen automáticamente del JWT token
  - ✅ NO deben enviarse como parámetros en la mutation
  - ✅ Tipo correcto: `CRM_LeadInput!` (NO `CreateCRM_LeadInput!`)
- **Estado actual**: 
  - ✅ Frontend corregido para enviar solo `input`
  - ✅ Mutations actualizadas con tipo correcto `CRM_LeadInput!`
  - ✅ JWT token se envía en header `Authorization` (el backend lo decodifica)

### 3. Error 400 Bad Request
- **Problema**: El servidor responde con 400 cuando se intenta crear un Lead
- **Posible causa**: 
  - Variables faltantes (`development` y `userId`)
  - Tipo de input incorrecto (`CreateCRM_LeadInput!` vs `CRM_LeadInput!`)
  - Validación del schema GraphQL

---

## ✅ Soluciones Implementadas en Frontend (CORREGIDAS)

1. ✅ Mutations corregidas: Eliminados `$development` y `$userId` como parámetros
2. ✅ Tipo de input corregido: `CRM_LeadInput!` (no `CreateCRM_LeadInput!`)
3. ✅ Todos los `variablesBuilder` actualizados para enviar solo `input`
4. ✅ Componentes actualizados: LeadsCRM, ContactsCRM, EntitiesCRM, CampaignsCRM
5. ✅ JWT token se envía en header `Authorization` (el backend extrae `development` y `userId` automáticamente)
6. ✅ Campo `field` agregado en la respuesta de `errors` según especificación del backend

---

## 🔍 Información Adicional

### User ID del Token
- **Campo en JWT**: `user_id` o `sub`
- **Valor**: `upSETrmXc7ZnsIhrjDjbHd7u2up1`

### Development
- **Valor**: `bodasdehoy`
- **Origen**: Cookie `development` o `localStorage.getItem("development")` o `process.env.NEXT_PUBLIC_DEVELOPMENT`

### Endpoint
- **URL**: `https://api2.eventosorganizador.com/graphql`
- **Método**: `POST`
- **Content-Type**: `application/json`

---

## 📝 Notas para el Backend

1. **✅ Schema GraphQL Confirmado**:
   - Tipo de input: `CRM_LeadInput!` (correcto)
   - `development` y `userId` se extraen del JWT token automáticamente (correcto)
   - Estructura de respuesta incluye `field` en `errors` (correcto)

2. **⚠️ URGENTE - Corregir headers CORS duplicados**:
   - **Problema**: El backend está enviando headers CORS duplicados
   - **Impacto**: Aunque el servidor responde con 200 OK, el navegador bloquea la respuesta
   - **Solución requerida**: 
     - Asegurarse de que `Access-Control-Allow-Origin` se envía solo una vez
     - Asegurarse de que `Access-Control-Allow-Credentials` se envía solo una vez
   - **Estado**: El backend mencionó que los headers CORS ya están corregidos, pero el problema **persiste** (última prueba: 20:20:13 GMT)
   - **Evidencia**: Los headers aparecen duplicados en la respuesta HTTP

3. **Verificar manejo de peticiones OPTIONS (preflight)**:
   - El servidor debe responder correctamente a las peticiones OPTIONS

4. **Estructura de respuesta confirmada**:
   ```json
   {
     "data": {
       "createCRMLead": {
         "success": true,
         "errors": [
           {
             "field": "campo",
             "message": "mensaje",
             "code": "codigo"
           }
         ],
         "lead": { ... }
       }
     }
   }
   ```

---

## 🧪 Pruebas Sugeridas

1. Probar con cURL el request correcto (con `development` y `userId`)
2. Verificar que el schema GraphQL acepta la estructura correcta
3. Probar peticiones OPTIONS (preflight)
4. Verificar que los headers CORS no se duplican
5. Confirmar que el `userId` se extrae correctamente del token JWT

---

**Contacto**: Equipo Frontend - CmsBackoffice  
**Última actualización**: 12 de Diciembre, 2025 - 20:20:13 GMT  
**Corrección según Backend**: 12 de Diciembre, 2025  
**Estado Frontend**: ✅ CORRECTO - Envía request correctamente  
**Estado Backend**: ⚠️ CORS - Headers duplicados persisten

---

## 🔄 Correcciones Aplicadas Según Respuesta del Backend

### Cambios Realizados

1. **Mutations Corregidas**:
   - ❌ Eliminado: `$development: String!` y `$userId: ID!` como parámetros
   - ✅ Corregido: Tipo de input de `CreateCRM_LeadInput!` a `CRM_LeadInput!`
   - ✅ Agregado: Campo `field` en la respuesta de `errors`

2. **Variables Corregidas**:
   - ❌ Eliminado: `development` y `userId` de las variables
   - ✅ Solo se envía: `input` con los datos del lead/contact/entity/campaign

3. **JWT Token**:
   - ✅ El token se envía en header `Authorization: Bearer <token>`
   - ✅ El backend extrae automáticamente `development` y `userId` del token decodificado

### Ejemplo de Código Correcto (Frontend)

```typescript
const CREATE_LEAD = `
  mutation CreateLead($input: CRM_LeadInput!) {
    createCRMLead(input: $input) {
      success
      lead {
        id
        name
        email
        phone
        company
        source
        status
        priority
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

const variables = {
  input: {
    name: "Lead de Prueba",
    email: "lead@example.com",
    source: "WEBSITE",
    status: "NEW",
    priority: "MEDIUM"
  }
};
```

---

## 📝 Notas Adicionales de la Última Prueba

### Timestamp de la Prueba
- **Fecha/Hora**: Fri, 12 Dec 2025 20:20:13 GMT
- **Rate Limit**: 495/500 requests restantes (límite: 500 por 900 segundos)

### Headers de Respuesta Observados
- `status-code`: **200 OK** ✅ (CORREGIDO - anteriormente era 400)
- `access-control-allow-credentials`: **DUPLICADO** (aparece 2 veces) ⚠️
- `access-control-allow-origin`: **DUPLICADO** (aparece 2 veces con valor `http://192.168.88.254:3005`) ⚠️
- `content-length`: 428 bytes
- `content-type`: `application/json; charset=utf-8`

### Request Enviado (CORRECTO)
```json
{
  "query": "mutation CreateLead($input: CRM_LeadInput!) { createCRMLead(input: $input) { success errors { field message code } lead { ... } } }",
  "variables": {
    "input": {
      "name": "Lead Demo Test",
      "email": "lead.test@example.com",
      "phone": "+34 600 000 000",
      "company": "Empresa Demo",
      "position": "Director Comercial",
      "source": "WEBSITE",
      "status": "NEW",
      "priority": "MEDIUM",
      "value": 15000,
      "notes": "Lead generado desde playground CRM."
    }
  }
}
```

### Observaciones
- ✅ **Frontend corregido**: El request ahora es correcto (tipo `CRM_LeadInput!`, solo `input`)
- ✅ **Backend responde**: El servidor responde con **200 OK**
- ❌ **CORS bloquea respuesta**: El navegador bloquea la respuesta debido a headers duplicados
- ⚠️ **Problema pendiente**: El backend necesita corregir los headers CORS duplicados para que el navegador permita leer la respuesta

