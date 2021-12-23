import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import hash from 'object-hash';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};


class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();

        this.doCreateUserWithEmailAndPassword = this.doCreateUserWithEmailAndPassword.bind(this);
        this.doSignInWithEmailAndPassword = this.doSignInWithEmailAndPassword.bind(this);
        this.doPasswordUpdate = this.doPasswordUpdate.bind(this);
        this.users = this.users.bind(this);
        this.user = this.user.bind(this);
    }


    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');

    data_in = (espid) => this.db.ref(`house/${espid}/data_in`);
    control_out = (espid) => this.db.ref(`house/${espid}/control_out`);

    doCreateUserWithEmailAndPassword = (username, email, password) =>
      this.users().once('value').then( snapshot => {
        const uid = hash(email);
        return new Promise((resolve, reject) => {
          const id = snapshot.child(`${uid}`).exists();
          if(id) {
            reject('This account already exists');
          }
          else {
            this.users().child(`${uid}`).set({'name': username, 'email': email, 'password': hash(password), 'code': Math.floor(Math.random() * 99999) + 10000});
            resolve('Success!!');
          }
        })
      });


    doSignInWithEmailAndPassword = (email, password) =>
      this.users().once('value').then(snapshot => {
        const uid = hash(email);
        const user = snapshot.child(`${uid}`);
        return new Promise((resolve, reject) => {
          if(user.exists())
            if(user.val().password === hash(password)) {
              resolve(user.val());
            }
          reject('Username or password is wrong!!');
        });
      })



    doPasswordUpdate = (user, password) => {
      const userId = hash(user.email);
      this.user(userId).update({'password': hash(password)});
    }


}

export default Firebase;
