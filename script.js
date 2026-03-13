// ============================================
// VALIDACIÓN DE FORMULARIO
// ============================================

/**
 * Valida que un campo no esté vacío
 * @param {string} value - Valor del campo
 * @param {string} fieldName - Nombre del campo para el mensaje de error
 * @returns {object} {isValid: boolean, error: string}
 */
function validateField(value, fieldName) {
    if (!value || value.trim() === '') {
        return {
            isValid: false,
            error: `${fieldName} es requerido`
        };
    }
    return { isValid: true, error: '' };
}

/**
 * Valida que un número sea positivo
 * @param {number} value - Valor a validar
 * @param {string} fieldName - Nombre del campo
 * @returns {object} {isValid: boolean, error: string}
 */
function validatePositiveNumber(value, fieldName) {
    const num = parseFloat(value);
    
    if (isNaN(num)) {
        return {
            isValid: false,
            error: `${fieldName} debe ser un número válido`
        };
    }
    
    if (num <= 0) {
        return {
            isValid: false,
            error: `${fieldName} debe ser mayor a 0`
        };
    }
    
    return { isValid: true, error: '' };
}

/**
 * Valida el campo de destino
 * @param {string} destination - Valor del destino
 * @returns {object} {isValid: boolean, error: string}
 */
function validateDestination(destination) {
    const validation = validateField(destination, 'Destino');
    if (!validation.isValid) return validation;
    
    if (destination.length < 3) {
        return {
            isValid: false,
            error: 'El destino debe tener al menos 3 caracteres'
        };
    }
    
    return { isValid: true, error: '' };
}

/**
 * Valida el campo de duración
 * @param {number} duration - Número de días
 * @returns {object} {isValid: boolean, error: string}
 */
function validateDuration(duration) {
    const validation = validatePositiveNumber(duration, 'Duración');
    if (!validation.isValid) return validation;
    
    const days = parseInt(duration);
    if (days > 365) {
        return {
            isValid: false,
            error: 'La duración no puede ser mayor a 365 días'
        };
    }
    
    return { isValid: true, error: '' };
}

/**
 * Valida todos los campos del formulario
 * @param {object} formData - Objeto con los datos del formulario
 * @returns {object} {isValid: boolean, errors: object}
 */
function validateAllFields(formData) {
    const errors = {};
    let isValid = true;

    // Validar destino
    const destinationValidation = validateDestination(formData.destination);
    if (!destinationValidation.isValid) {
        errors.destination = destinationValidation.error;
        isValid = false;
    }

    // Validar duración
    const durationValidation = validateDuration(formData.duration);
    if (!durationValidation.isValid) {
        errors.duration = durationValidation.error;
        isValid = false;
    }

    // Validar presupuesto disponible
    const budgetValidation = validatePositiveNumber(formData.budget, 'Presupuesto disponible');
    if (!budgetValidation.isValid) {
        errors.budget = budgetValidation.error;
        isValid = false;
    }

    // Validar transporte
    const transportValidation = validatePositiveNumber(formData.transport, 'Costo de transporte');
    if (!transportValidation.isValid) {
        errors.transport = transportValidation.error;
        isValid = false;
    }

    // Validar alojamiento
    const accommodationValidation = validatePositiveNumber(formData.accommodation, 'Alojamiento por noche');
    if (!accommodationValidation.isValid) {
        errors.accommodation = accommodationValidation.error;
        isValid = false;
    }

    // Validar comida
    const foodValidation = validatePositiveNumber(formData.food, 'Presupuesto de comida');
    if (!foodValidation.isValid) {
        errors.food = foodValidation.error;
        isValid = false;
    }

    // Validar actividades
    const activitiesValidation = validatePositiveNumber(formData.activities, 'Presupuesto de actividades');
    if (!activitiesValidation.isValid) {
        errors.activities = activitiesValidation.error;
        isValid = false;
    }

    return { isValid, errors };
}

// ============================================
// CÁLCULOS DEL PRESUPUESTO
// ============================================

/**
 * Calcula el costo total de alojamiento
 * @param {number} accommodationPerNight - Costo por noche
 * @param {number} duration - Número de noches
 * @returns {number} Costo total de alojamiento
 */
function calculateTotalAccommodation(accommodationPerNight, duration) {
    return parseFloat(accommodationPerNight) * parseInt(duration);
}

/**
 * Calcula el costo total de comida
 * @param {number} foodPerDay - Presupuesto diario
 * @param {number} duration - Número de días
 * @returns {number} Costo total de comida
 */
function calculateTotalFood(foodPerDay, duration) {
    return parseFloat(foodPerDay) * parseInt(duration);
}

/**
 * Calcula el costo total de actividades
 * @param {number} activitiesPerDay - Presupuesto diario
 * @param {number} duration - Número de días
 * @returns {number} Costo total de actividades
 */
function calculateTotalActivities(activitiesPerDay, duration) {
    return parseFloat(activitiesPerDay) * parseInt(duration);
}

/**
 * Calcula el costo total del viaje
 * @param {number} transport - Costo de transporte
 * @param {number} totalAccommodation - Costo total de alojamiento
 * @param {number} totalFood - Costo total de comida
 * @param {number} totalActivities - Costo total de actividades
 * @returns {number} Costo total estimado
 */
function calculateTotalCost(transport, totalAccommodation, totalFood, totalActivities) {
    return parseFloat(transport) + totalAccommodation + totalFood + totalActivities;
}

/**
 * Calcula la diferencia entre presupuesto disponible y costo total
 * @param {number} availableBudget - Presupuesto disponible
 * @param {number} totalCost - Costo total estimado
 * @returns {number} Diferencia (positiva = sobra, negativa = falta)
 */
function calculateDifference(availableBudget, totalCost) {
    return parseFloat(availableBudget) - totalCost;
}

/**
 * Calcula el gasto promedio diario
 * @param {number} totalCost - Costo total del viaje
 * @param {number} duration - Duración en días
 * @returns {number} Gasto promedio diario
 */
function calculateDailyAverage(totalCost, duration) {
    return totalCost / parseInt(duration);
}

// ============================================
// CATEGORIZACIÓN DEL VIAJE
// ============================================

/**
 * Determina la categoría del viaje según el gasto diario promedio
 * @param {number} dailyAverage - Gasto promedio por día
 * @returns {object} {categoryId: string, categoryName: string, emoji: string}
 */
function determineTripCategory(dailyAverage) {
    if (dailyAverage < 100000) {
        return {
            categoryId: 'economics',
            categoryName: 'Económico',
            emoji: '💚'
        };
    } else if (dailyAverage <= 300000) {
        return {
            categoryId: 'moderate',
            categoryName: 'Moderado',
            emoji: '💛'
        };
    } else {
        return {
            categoryId: 'luxury',
            categoryName: 'Lujoso',
            emoji: '🔴'
        };
    }
}

/**
 * Determina el veredicto: si hay presupuesto o no
 * @param {number} difference - Diferencia entre presupuesto y gasto
 * @returns {object} {verdictId: string, verdictTitle: string, verdictMessage: string}
 */
function determineVerdict(difference) {
    if (difference >= 0) {
        return {
            verdictId: 'surplus',
            verdictTitle: '¡Perfecto, tienes presupuesto!',
            verdictMessage: `Tu presupuesto es suficiente para este viaje. 
                            Podrás disfrutar sin preocupaciones.`
        };
    } else {
        return {
            verdictId: 'deficit',
            verdictTitle: 'Te falta presupuesto',
            verdictMessage: `Tu presupuesto actual no es suficiente. 
                            Necesitarás ahorrar más para hacer este viaje.`
        };
    }
}

// ============================================
// FORMATEO DE NÚMEROS
// ============================================

/**
 * Formatea un número como moneda
 * @param {number} amount - Cantidad a formatear
 * @returns {string} Cantidad formateada como moneda
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// ============================================
// MANEJO DEL FORMULARIO
// ============================================

/**
 * Obtiene los datos del formulario
 * @returns {object} Objeto con todos los valores del formulario
 */
function getFormData() {
    return {
        destination: document.getElementById('destination').value,
        duration: document.getElementById('duration').value,
        budget: document.getElementById('budget').value,
        transport: document.getElementById('transport').value,
        accommodation: document.getElementById('accommodation').value,
        food: document.getElementById('food').value,
        activities: document.getElementById('activities').value
    };
}

/**
 * Muestra los mensajes de error en el formulario
 * @param {object} errors - Objeto con errores por campo
 */
function displayErrors(errors) {
    // Limpiar todos los errores primero
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => el.classList.remove('show'));

    // Mostrar nuevos errores
    Object.keys(errors).forEach(fieldName => {
        const errorElement = document.getElementById(`${fieldName}Error`);
        if (errorElement) {
            errorElement.textContent = errors[fieldName];
            errorElement.classList.add('show');
        }
    });
}

/**
 * Limpia todos los mensajes de error del formulario
 */
function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
}

// ============================================
// MOSTRAR RESULTADOS
// ============================================

/**
 * Muestra la sección de resultados con todos los datos calculados
 * @param {object} tripData - Objeto con todos los datos del viaje
 */
function displayResults(tripData) {
    // Obtener elementos del DOM
    const resultsSection = document.getElementById('resultsSection');
    const verdictCard = document.getElementById('verdictCard');
    
    // Limpiar clases anteriores del veredicto
    verdictCard.classList.remove('surplus', 'deficit');
    
    // Actualizar card de veredicto
    document.getElementById('verdictEmoji').textContent = tripData.verdict.emoji || tripData.category.emoji;
    document.getElementById('verdictTitle').textContent = tripData.verdict.verdictTitle;
    document.getElementById('verdictMessage').textContent = tripData.verdict.verdictMessage;
    document.getElementById('verdictAmount').textContent = formatCurrency(Math.abs(tripData.difference));
    
    verdictCard.classList.add(tripData.verdict.verdictId);

    // Actualizar información del viaje
    document.getElementById('resultDestination').textContent = tripData.destination;
    document.getElementById('resultDuration').textContent = `${tripData.duration} días`;
    document.getElementById('resultCategory').textContent = `${tripData.category.emoji} ${tripData.category.categoryName}`;

    // Actualizar desglose de gastos
    document.getElementById('resultTransport').textContent = formatCurrency(tripData.transport);
    document.getElementById('resultAccommodationTotal').textContent = formatCurrency(tripData.totalAccommodation);
    document.getElementById('resultFoodTotal').textContent = formatCurrency(tripData.totalFood);
    document.getElementById('resultActivitiesTotal').textContent = formatCurrency(tripData.totalActivities);

    // Actualizar resumen financiero
    document.getElementById('resultAvailableBudget').textContent = formatCurrency(tripData.budget);
    document.getElementById('resultTotalCost').textContent = formatCurrency(tripData.totalCost);
    
    const differenceElement = document.getElementById('resultDifference');
    if (tripData.difference >= 0) {
        differenceElement.textContent = `+${formatCurrency(tripData.difference)} (Sobra)`;
        differenceElement.style.color = '#51CF66';
    } else {
        differenceElement.textContent = `${formatCurrency(tripData.difference)} (Falta)`;
        differenceElement.style.color = '#FF6B6B';
    }

    // Mostrar sección de resultados
    resultsSection.style.display = 'block';
    
    // Desplazarse a los resultados
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// PROCESAMIENTO DEL FORMULARIO
// ============================================

/**
 * Procesa el envío del formulario y calcula todos los datos del viaje
 * @param {Event} event - Evento del formulario
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Limpiar errores previos
    clearErrors();
    
    // Obtener datos del formulario
    const formData = getFormData();
    
    // Validar datos
    const validation = validateAllFields(formData);
    
    if (!validation.isValid) {
        displayErrors(validation.errors);
        return;
    }
    
    // Realizar cálculos
    const totalAccommodation = calculateTotalAccommodation(
        formData.accommodation,
        formData.duration
    );
    
    const totalFood = calculateTotalFood(
        formData.food,
        formData.duration
    );
    
    const totalActivities = calculateTotalActivities(
        formData.activities,
        formData.duration
    );
    
    const totalCost = calculateTotalCost(
        formData.transport,
        totalAccommodation,
        totalFood,
        totalActivities
    );
    
    const difference = calculateDifference(formData.budget, totalCost);
    
    const dailyAverage = calculateDailyAverage(totalCost, formData.duration);
    
    // Determinar categoría y veredicto
    const category = determineTripCategory(dailyAverage);
    const verdict = determineVerdict(difference);
    
    // Preparar objeto con todos los datos
    const tripData = {
        destination: formData.destination,
        duration: parseInt(formData.duration),
        budget: parseFloat(formData.budget),
        transport: parseFloat(formData.transport),
        accommodation: parseFloat(formData.accommodation),
        food: parseFloat(formData.food),
        activities: parseFloat(formData.activities),
        totalAccommodation,
        totalFood,
        totalActivities,
        totalCost,
        difference,
        dailyAverage,
        category,
        verdict
    };
    
    // Mostrar resultados
    displayResults(tripData);
}

/**
 * Reinicia el formulario y oculta los resultados
 */
function resetForm() {
    document.getElementById('tripForm').reset();
    document.getElementById('resultsSection').style.display = 'none';
    clearErrors();
    
    // Desplazarse al formulario
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const tripForm = document.getElementById('tripForm');
    
    // Agregar listener al formulario
    if (tripForm) {
        tripForm.addEventListener('submit', handleFormSubmit);
    }
});
