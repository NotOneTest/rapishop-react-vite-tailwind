export function validateEmail(email) {
  if (!email || email.trim() === '') {
    return 'El email es obligatorio'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'El formato del email no es válido'
  }
  return null
}

export function validatePassword(password) {
  if (!password || password.trim() === '') {
    return 'La contraseña es obligatoria'
  }
  if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres'
  }
  if (password.length > 50) {
    return 'La contraseña no puede tener más de 50 caracteres'
  }
  if (!/[A-Z]/.test(password)) {
    return 'La contraseña debe tener al menos una letra mayúscula'
  }
  if (!/[a-z]/.test(password)) {
    return 'La contraseña debe tener al menos una letra minúscula'
  }
  if (!/[0-9]/.test(password)) {
    return 'La contraseña debe tener al menos un número'
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return 'La contraseña debe tener al menos un carácter especial (!@#$%^&*)'
  }
  return null
}

export function validateName(name) {
  if (!name || name.trim() === '') {
    return 'El nombre es obligatorio'
  }
  if (name.trim().length < 2) {
    return 'El nombre debe tener al menos 2 caracteres'
  }
  if (name.trim().length > 50) {
    return 'El nombre no puede tener más de 50 caracteres'
  }
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(name.trim())) {
    return 'El nombre solo puede contener letras y espacios'
  }
  return null
}

export function validateRegisterForm(formData) {
  const nameError = validateName(formData.name)
  if (nameError) return nameError

  const emailError = validateEmail(formData.email)
  if (emailError) return emailError

  const passwordError = validatePassword(formData.password)
  if (passwordError) return passwordError

  if (formData.password !== formData.confirmPassword) {
    return 'Las contraseñas no coinciden'
  }

  return null
}

export function validateLoginForm(formData) {
  const emailError = validateEmail(formData.email)
  if (emailError) return emailError

  if (!formData.password || formData.password.trim() === '') {
    return 'La contraseña es obligatoria'
  }

  return null
}

export function getPasswordStrength(password) {
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++

  if (score <= 2) return { level: 'weak', label: 'Débil', color: '#EF4444' }
  if (score <= 4) return { level: 'medium', label: 'Media', color: '#FFD700' }
  return { level: 'strong', label: 'Fuerte', color: '#00CFFF' }
}
