import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// TODO: Move to env file
const config = {
    apiKey: "AIzaSyAJmVlyeF0BJeeI11wpKFfrdZED4xto5Dw",
    authDomain: "ses-2a-team-2.firebaseapp.com",
    databaseURL: "https://ses-2a-team-2-default-rtdb.firebaseio.com",
    projectId: "ses-2a-team-2",
    storageBucket: "ses-2a-team-2.appspot.com",
    messagingSenderId: "445897167340",
    appId: "1:445897167340:web:08d3b919a7a2c3cb8870c9",
    measurementId: "G-701ZRD9QSB"
};

var provider = new app.auth.GoogleAuthProvider();

class Firebase {

    constructor() {
       
        if (!app.apps.length) {
            app.initializeApp(config);
        }

        this.auth = app.auth();
        this.database = app.database();
    
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    loginwithGoogle() {
        return this.auth.signInWithPopup(provider)
    };

    logout() {
        return this.auth.signOut();
    }

    resetPassword() {
        return this.auth.resetPassword();
    }

    async register(email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password);
    }

    isInitialized() {
        return new Promise((resolve) => {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.email;
    }

    async getCurrentUser() {
        return this.auth.currentUser;
    }

    showNavBar() {

        let show = false 

        if (!!this.auth.currentUser) {
            show = true
        } else {
            console.log("No current user")
        }

        return show;
    }

}

export default new Firebase();
