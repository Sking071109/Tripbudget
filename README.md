# 🌍 TripBudget — Planificador de Presupuesto de Viajes

> Una herramienta elegante y moderna para planificar el presupuesto de tus viajes antes de reservar.

---

## 📋 ¿Qué es TripBudget?

**TripBudget** es una aplicación web que te ayuda a calcular el presupuesto total de tu viaje y determinar si tienes suficiente dinero para hacerlo realidad. Es perfecta para viajeros que quieren planificar de manera inteligente antes de reservar sus vacaciones.

La herramienta fue diseñada pensando en que sea **intuitiva, visual y accesible** tanto en dispositivos móviles como en desktop.

---

## ✨ Características principales

✅ **Cálculo automático**: Ingresa tus datos y obtén el costo total al instante  
✅ **Veredicto claro**: Sabe si tu presupuesto alcanza o cuánto te falta  
✅ **Categorización**: Clasificación automática de tu viaje (Económico, Moderado o Lujoso)  
✅ **Desglose detallado**: Visualiza exactamente a dónde va tu dinero  
✅ **Diseño responsivo**: Perfecto en cualquier dispositivo  
✅ **Interfaz atractiva**: Colores vibrantes y animaciones suaves  
✅ **Validación completa**: Campos validados para datos correctos  

---

## 📊 ¿Cómo funciona?

### Paso 1: Ingresa tus datos
Completa el formulario con:
- **Destino**: A dónde quieres viajar
- **Duración**: Cuántos días durará tu viaje (máximo 365)
- **Presupuesto disponible**: Cuánto dinero tienes para gastar
- **Costo de transporte**: Vuelos ida y vuelta
- **Alojamiento por noche**: Hotel, hostal o Airbnb
- **Presupuesto diario de comida**: Lo que planeas gastar en comidas
- **Presupuesto diario de actividades**: Tours, entradas, paseos

### Paso 2: La app calcula
TripBudget realiza automáticamente:
- Costo total de alojamiento (por noche × duración)
- Costo total de comida (diario × duración)
- Costo total de actividades (diario × duración)
- **Costo total estimado** = Transporte + Alojamiento + Comida + Actividades
- Gasto promedio diario
- Diferencia entre tu presupuesto y el costo total

### Paso 3: Obtén tu resultado
Verás:
- ✅ **Si alcanza**: Cuánto dinero te sobra
- ❌ **Si no alcanza**: Cuánto dinero te falta

### Paso 4: Categoría del viaje
Tu viaje se clasifica automáticamente:
- 💚 **Económico**: Menos de $100.000 por día
- 💛 **Moderado**: Entre $100.000 y $300.000 por día
- 🔴 **Lujoso**: Más de $300.000 por día

---

## 🎨 Diseño y Estilo

### Contexto visual
La interfaz utiliza un **tema de viajes** con:
- **Colores vibrantes**: Rojo coral (#FF6B6B), Turquesa (#4ECDC4), Amarillo (#FFE66D)
- **Animaciones suaves**: Efectos de deslizamiento y flotación
- **Iconos Material Design**: Íconos intuitivos de Google Fonts
- **Tipografía moderna**: Fuentes Poppins e Inter de Google Fonts
- **Gradientes atractivos**: Que transmiten movimiento y energía

### Responsividad
- ✅ Diseño completamente responsive
- ✅ Optimizado para móviles (480px en adelante)
- ✅ Interfaz adaptable a tablets y desktop
- ✅ Texto legible en todos los tamaños

---

## 💻 Estructura técnica

### Tecnologías utilizadas
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos avanzados con Flexbox y Grid
- **JavaScript (Vanilla)**: Lógica modular sin frameworks
- **Google Fonts**: Tipografía profesional
- **Material Icons**: Iconografía de Google

### Arquitectura del código

#### JavaScript - Funciones organizadas por responsabilidad

**Validación:**
- `validateField()`: Valida campos no vacíos
- `validatePositiveNumber()`: Valida números positivos
- `validateDestination()`: Validación específica para destino
- `validateDuration()`: Validación específica para duración
- `validateAllFields()`: Valida el formulario completo

**Cálculos:**
- `calculateTotalAccommodation()`: Alojamiento total
- `calculateTotalFood()`: Comida total
- `calculateTotalActivities()`: Actividades total
- `calculateTotalCost()`: Costo total del viaje
- `calculateDifference()`: Diferencia presupuesto vs costo
- `calculateDailyAverage()`: Gasto promedio diario

**Categorización:**
- `determineTripCategory()`: Clasifica el viaje por gasto diario
- `determineVerdict()`: Determina si hay presupuesto suficiente

**Helpers:**
- `formatCurrency()`: Formatea números como moneda COP
- `getFormData()`: Obtiene datos del formulario
- `displayErrors()`: Muestra errores en la UI
- `clearErrors()`: Limpia mensajes de error
- `displayResults()`: Muestra los resultados calculados
- `handleFormSubmit()`: Procesa el envío del formulario
- `resetForm()`: Reinicia el formulario

---

## 📁 Estructura de archivos

```
├── index.html          # Estructura HTML del proyecto
├── style.css           # Estilos CSS con variables de tema
├── script.js           # Lógica JavaScript modular
└── README.md           # Este archivo
```

---

## 🎯 Características del código

### ✅ Buenas prácticas implementadas

1. **Funciones puras**: Cada función recibe parámetros y retorna valores
2. **Una función, una responsabilidad**: Separación clara de conceptos
3. **Sin lógica global**: Todo encapsulado en funciones
4. **Validación robusta**: Todos los campos se validan antes de procesar
5. **Comentarios descriptivos**: Cada función tiene documentación
6. **Código limpio**: Legibilidad y mantenibilidad prioritarias
7. **Manejo de errores**: Mensajes claros para el usuario
8. **CSS escalable**: Variables CSS para tema centralizado
9. **HTML semántico**: Elementos HTML con significado claro
10. **Accesibilidad**: Labels asociados a inputs, estructura lógica

---

## 🚀 Cómo usar

### 1. Abre la aplicación
Simplemente abre `index.html` en tu navegador

### 2. Completa el formulario
Ingresa todos los campos con datos realistas

### 3. Haz clic en "Calcular presupuesto"
La app procesará tus datos al instante

### 4. Revisa tu resultado
- Verás el veredicto clara­mente
- Tendrás un desglose completo de gastos
- Podrás planificar mejor tu viaje

### 5. Planifica otro viaje
Usa el botón "Planificar otro viaje" para resetear

---

## 🎓 Lo que aprendí construyendo esto

✅ Separación de responsabilidades en funciones  
✅ Validación de formularios en JavaScript  
✅ Manipulación del DOM de forma eficiente  
✅ Uso de variables CSS para temas dinámicos  
✅ Diseño responsive con Flexbox y Grid  
✅ Animaciones CSS smooth  
✅ Formato de números y monedas  
✅ Gestión de estados de UI  
✅ Buenas prácticas de accesibilidad  
✅ Estructura de código modular y mantenible  

---

## 📱 Compatibilidad

| Navegador | Estado |
|-----------|--------|
| Chrome    | ✅ Soportado |
| Firefox   | ✅ Soportado |
| Safari    | ✅ Soportado |
| Edge      | ✅ Soportado |
| Mobile    | ✅ Totalmente responsive |

---

## 💡 Ejemplo de uso

**Ejemplo:** Viaje a Cartagena por 5 días
- Destino: Cartagena
- Duración: 5 días
- Presupuesto disponible: $1.500.000
- Transporte: $300.000
- Alojamiento: $150.000/noche
- Comida: $80.000/día
- Actividades: $50.000/día

**Resultado:**
- Gasto total: $1.570.000
- Diferencia: Falta $70.000
- Categoría: Moderado 💛

---

## 🔧 Mejoras futuras posibles

- 📊 Gráficos de distribución de gastos
- 💾 Guardar viajes en localStorage
- 📤 Exportar resumen en PDF
- 🌍 Soporte para múltiples divisas
- 📍 Información de ciudades (clima, precios típicos)
- 🏆 Sistema de recomendaciones inteligentes
- 🌙 Modo oscuro

---

## 📝 Notas finales

Este proyecto fue construido siguiendo principios de:
- **Código limpio**: Legibilidad y mantenibilidad
- **Experiencia de usuario**: Interfaz intuitiva y atractiva
- **Funcionalidad robusta**: Validación y manejo de errores completos

> *"Este es tu primer proyecto propio. No lo primero que funcione — lo mejor que puedas hacer."* 💪

---

**Hecho con ❤️ por un desarrollador apasionado por los viajes y la programación.**
> Pero yo sí sé de código. Lo que reviso es la arquitectura."*

---

**Módulo:** 2 — Proyecto Final
**Dificultad:** ⭐⭐⭐ Intermedio
**Tiempo estimado:** 4 a 6 horas