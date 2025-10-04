// Translation management
const translations = {
    tr: {
        mainTitle: '💰 Grup Borç Takibi',
        addPaymentTitle: 'Ödeme Ekle',
        payerLabel: 'Kim ödedi?',
        selectPerson: 'Kişi seçin...',
        amountLabel: 'Tutar (TL)',
        amountPlaceholder: 'Tutarı girin',
        splitLabel: 'Paylaşılacak kişiler:',
        addButton: 'Ödeme Ekle',
        debtsTitle: 'Mevcut Borçlar',
        isOwed: 'alacaklı:',
        owes: 'borçlu',
        noDebts: 'Kimse borçlu değil',
        errorSelectPayer: 'Lütfen ödemeyi yapan kişiyi seçin',
        errorValidAmount: 'Lütfen geçerli bir tutar girin',
        errorSelectPeople: 'Lütfen en az bir kişi seçin'
    },
    en: {
        mainTitle: '💰 Group Debt Tracker',
        addPaymentTitle: 'Add Payment',
        payerLabel: 'Who paid?',
        selectPerson: 'Select person...',
        amountLabel: 'Amount (TL)',
        amountPlaceholder: 'Enter amount',
        splitLabel: 'Split between:',
        addButton: 'Add Payment',
        debtsTitle: 'Current Debts',
        isOwed: 'is owed:',
        owes: 'owes',
        noDebts: 'No one owes money',
        errorSelectPayer: 'Please select who paid',
        errorValidAmount: 'Please enter a valid amount',
        errorSelectPeople: 'Please select at least one person'
    }
};

let currentLang = appConfig.defaultLanguage;

function getTranslation(key) {
    return translations[currentLang][key];
}

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    updateUIText();
    renderDebts();
}

function updateUIText() {
    document.getElementById('mainTitle').textContent = getTranslation('mainTitle');
    document.getElementById('addPaymentTitle').textContent = getTranslation('addPaymentTitle');
    document.getElementById('payerLabel').textContent = getTranslation('payerLabel');
    document.getElementById('selectPersonOption').textContent = getTranslation('selectPerson');
    document.getElementById('amountLabel').textContent = getTranslation('amountLabel');
    document.getElementById('amount').placeholder = getTranslation('amountPlaceholder');
    document.getElementById('splitLabel').textContent = getTranslation('splitLabel');
    document.getElementById('addButton').textContent = getTranslation('addButton');
    document.getElementById('debtsTitle').textContent = getTranslation('debtsTitle');
}