// ============================================
// VALIDACIÓN DE FORMULARIO
// ============================================

function validateField(value, fieldName) {
    if (!value || value.trim() === '') {
        return {
            isValid: false,
            error: `${fieldName} es requerido`
        };
    }
    return { isValid: true, error: '' };
}

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

function validateAllFields(formData) {
    const errors = {};
    let isValid = true;

    const destinationValidation = validateDestination(formData.destination);
    if (!destinationValidation.isValid) {
        errors.destination = destinationValidation.error;
        isValid = false;
    }

    const durationValidation = validateDuration(formData.duration);
    if (!durationValidation.isValid) {
        errors.duration = durationValidation.error;
        isValid = false;
    }

    const budgetValidation = validatePositiveNumber(formData.budget, 'Presupuesto disponible');
    if (!budgetValidation.isValid) {
        errors.budget = budgetValidation.error;
        isValid = false;
    }

    const transportValidation = validatePositiveNumber(formData.transport, 'Costo de transporte');
    if (!transportValidation.isValid) {
        errors.transport = transportValidation.error;
        isValid = false;
    }

    const accommodationValidation = validatePositiveNumber(formData.accommodation, 'Alojamiento por noche');
    if (!accommodationValidation.isValid) {
        errors.accommodation = accommodationValidation.error;
        isValid = false;
    }

    const foodValidation = validatePositiveNumber(formData.food, 'Presupuesto de comida');
    if (!foodValidation.isValid) {
        errors.food = foodValidation.error;
        isValid = false;
    }

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

function calculateTotalAccommodation(accommodationPerNight, duration) {
    return parseFloat(accommodationPerNight) * parseInt(duration);
}

function calculateTotalFood(foodPerDay, duration) {
    return parseFloat(foodPerDay) * parseInt(duration);
}

function calculateTotalActivities(activitiesPerDay, duration) {
    return parseFloat(activitiesPerDay) * parseInt(duration);
}

function calculateTotalCost(transport, totalAccommodation, totalFood, totalActivities) {
    return parseFloat(transport) + totalAccommodation + totalFood + totalActivities;
}

function calculateDifference(availableBudget, totalCost) {
    return parseFloat(availableBudget) - totalCost;
}

function calculateDailyAverage(totalCost, duration) {
    return totalCost / parseInt(duration);
}

// ============================================
// CATEGORIZACIÓN DEL VIAJE
// ============================================

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

function displayErrors(errors) {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => el.classList.remove('show'));
    Object.keys(errors).forEach(fieldName => {
        const errorElement = document.getElementById(`${fieldName}Error`);
        if (errorElement) {
            errorElement.textContent = errors[fieldName];
            errorElement.classList.add('show');
        }
    });
}

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

function displayResults(tripData) {
    const resultsSection = document.getElementById('resultsSection');
    const verdictCard = document.getElementById('verdictCard');
    verdictCard.classList.remove('surplus', 'deficit');
    document.getElementById('verdictEmoji').textContent = tripData.verdict.emoji || tripData.category.emoji;
    document.getElementById('verdictTitle').textContent = tripData.verdict.verdictTitle;
    document.getElementById('verdictMessage').textContent = tripData.verdict.verdictMessage;
    document.getElementById('verdictAmount').textContent = formatCurrency(Math.abs(tripData.difference));
    verdictCard.classList.add(tripData.verdict.verdictId);
    document.getElementById('resultDestination').textContent = tripData.destination;
    document.getElementById('resultDuration').textContent = `${tripData.duration} días`;
    document.getElementById('resultCategory').textContent = `${tripData.category.emoji} ${tripData.category.categoryName}`;
    document.getElementById('resultTransport').textContent = formatCurrency(tripData.transport);
    document.getElementById('resultAccommodationTotal').textContent = formatCurrency(tripData.totalAccommodation);
    document.getElementById('resultFoodTotal').textContent = formatCurrency(tripData.totalFood);
    document.getElementById('resultActivitiesTotal').textContent = formatCurrency(tripData.totalActivities);
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

    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// PROCESAMIENTO DEL FORMULARIO
// ============================================

function handleFormSubmit(event) {
    event.preventDefault();
    clearErrors();
    const formData = getFormData();
    const validation = validateAllFields(formData);
    
    if (!validation.isValid) {
        displayErrors(validation.errors);
        return;
    }
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
    const category = determineTripCategory(dailyAverage);
    const verdict = determineVerdict(difference);
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
    displayResults(tripData);
}

function resetForm() {
    document.getElementById('tripForm').reset();
    document.getElementById('resultsSection').style.display = 'none';
    clearErrors();
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const tripForm = document.getElementById('tripForm');
    if (tripForm) {
        tripForm.addEventListener('submit', handleFormSubmit);
    }
});
