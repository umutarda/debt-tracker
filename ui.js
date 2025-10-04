// UI management
function initializeUI() {
    const payerSelect = document.getElementById('payer');
    const splitGroup = document.getElementById('splitGroup');
    
    appConfig.people.forEach(person => {
        const option = document.createElement('option');
        option.value = person;
        option.textContent = person;
        payerSelect.appendChild(option);
        
        const label = document.createElement('label');
        label.className = 'checkbox-label';
        label.innerHTML = `
            <input type="checkbox" value="${person}" onchange="updateSplitOptions()">
            <span>${person}</span>
        `;
        splitGroup.appendChild(label);
    });
    
    document.getElementById('payer').addEventListener('change', updateSplitOptions);
}

function updateSplitOptions() {
    const payer = document.getElementById('payer').value;
    const checkboxes = document.querySelectorAll('#splitGroup input[type="checkbox"]');
    
    checkboxes.forEach(cb => {
        cb.disabled = false;
    });
}

function renderDebts() {
    const container = document.getElementById('debtsContainer');
    container.innerHTML = '';
    
    const netDebts = debtCalculator.calculateNetDebts();
    
    appConfig.people.forEach(creditor => {
        const personDiv = document.createElement('div');
        personDiv.className = 'person-debts';
        
        let debtsHTML = `<h3>${creditor} ${getTranslation('isOwed')}</h3>`;
        
        if (netDebts[creditor] && netDebts[creditor].length > 0) {
            netDebts[creditor].forEach(debt => {
                debtsHTML += `
                    <div class="debt-item">
                        <span>${debt.debtor} ${getTranslation('owes')}</span>
                        <span class="debt-amount">${debt.amount.toFixed(2)} TL</span>
                    </div>
                `;
            });
        } else {
            debtsHTML += `<p class="no-debts">${getTranslation('noDebts')}</p>`;
        }
        
        personDiv.innerHTML = debtsHTML;
        container.appendChild(personDiv);
    });
}

function clearForm() {
    document.getElementById('amount').value = '';
    const splitCheckboxes = document.querySelectorAll('#splitGroup input[type="checkbox"]:checked');
    splitCheckboxes.forEach(cb => cb.checked = false);
    document.getElementById('splitError').textContent = '';
}

function showError(message) {
    const errorDiv = document.getElementById('splitError');
    errorDiv.textContent = message;
}