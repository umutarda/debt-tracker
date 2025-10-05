// Main application logic
function addPayment() {
    const payer = document.getElementById('payer').value;
    const amount = parseFloat(parseFloat(document.getElementById('amount').value).toFixed(2));
    const description = document.getElementById('description').value.trim();
    const splitCheckboxes = document.querySelectorAll('#splitGroup input[type="checkbox"]:checked');
    const splitWith = Array.from(splitCheckboxes).map(cb => cb.value);
    
    // Validation
    if (!payer) {
        showError(getTranslation('errorSelectPayer'));
        return;
    }
    
    if (!amount || amount <= 0) {
        showError(getTranslation('errorValidAmount'));
        return;
    }
    
    if (splitWith.length === 0) {
        showError(getTranslation('errorSelectPeople'));
        return;
    }
    
    // Add payment to debt calculator
    debtCalculator.addPayment(payer, amount, splitWith);
    
    // Save to Firebase
    firebaseService.saveDebts();
    firebaseService.addTransaction(payer, amount, description, splitWith);
    
    // Update UI
    clearForm();
    renderDebts();
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeUI();
    firebaseService.initialize();
    renderDebts();
    renderHistory([]);
});