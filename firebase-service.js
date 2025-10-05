// Firebase service for data persistence
class FirebaseService {
    constructor() {
        this.db = null;
        this.debtsRef = null;
        this.transactionsRef = null;
        this.transactions = [];
    }

    initialize() {
        try {
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            this.db = firebase.database();
            this.debtsRef = this.db.ref('debts');
            this.transactionsRef = this.db.ref('transactions');
            
            // Listen for debt changes
            this.debtsRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    debtCalculator.setDebtsData(data);
                    renderDebts();
                }
            });
            
            // Listen for transaction changes
            this.transactionsRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    this.transactions = Object.values(data);
                    renderHistory(this.transactions);
                }
            });
            
            console.log('Firebase initialized successfully');
        } catch (error) {
            console.error('Firebase initialization error:', error);
            console.log('Running in offline mode');
        }
    }

    async saveDebts() {
        if (!this.debtsRef) {
            console.log('Firebase not initialized, saving locally only');
            return;
        }

        try {
            const debtsData = debtCalculator.getDebtsData();
            await this.debtsRef.set(debtsData);
            console.log('Debts saved to Firebase');
        } catch (error) {
            console.error('Error saving to Firebase:', error);
        }
    }

    async addTransaction(payer, amount, description, splitWith) {
        if (!this.transactionsRef) {
            console.log('Firebase not initialized');
            // Add to local array
            this.transactions.push({ payer, amount, description, timestamp: Date.now() });
            renderHistory(this.transactions);
            return;
        }

        try {
            const transaction = {
                payer,
                amount,
                description,
                splitWith,
                timestamp: Date.now()
            };
            
            await this.transactionsRef.push(transaction);
            console.log('Transaction saved to Firebase');
        } catch (error) {
            console.error('Error saving transaction:', error);
        }
    }

    async loadDebts() {
        if (!this.debtsRef) {
            console.log('Firebase not initialized');
            return null;
        }

        try {
            const snapshot = await this.debtsRef.once('value');
            return snapshot.val();
        } catch (error) {
            console.error('Error loading from Firebase:', error);
            return null;
        }
    }

    async clearDebts() {
        if (!this.debtsRef) {
            console.log('Firebase not initialized');
            return;
        }

        try {
            await this.debtsRef.remove();
            await this.transactionsRef.remove();
            debtCalculator.clearAllDebts();
            this.transactions = [];
            renderDebts();
            renderHistory([]);
            console.log('All debts and transactions cleared from Firebase');
        } catch (error) {
            console.error('Error clearing Firebase data:', error);
        }
    }

    getTransactions() {
        return this.transactions;
    }
}

// Initialize Firebase service
const firebaseService = new FirebaseService();