// Firebase service for data persistence
class FirebaseService {
    constructor() {
        this.db = null;
        this.debtsRef = null;
    }

    initialize() {
        try {
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            this.db = firebase.database();
            this.debtsRef = this.db.ref('debts');
            
            // Listen for changes
            this.debtsRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    debtCalculator.setDebtsData(data);
                    renderDebts();
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
            debtCalculator.clearAllDebts();
            renderDebts();
            console.log('All debts cleared from Firebase');
        } catch (error) {
            console.error('Error clearing Firebase data:', error);
        }
    }
}

// Initialize Firebase service
const firebaseService = new FirebaseService();