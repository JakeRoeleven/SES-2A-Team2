const fireStore = require('firebase-admin');

class SubjectService {

    constructor() {
        this.init();
        this.db = fireStore.firestore(); 
    }

    init() {
        const serviceAccount = {
            "type": "service_account",
            "project_id": "ses-2a-team-2",
            "private_key_id": "7d61cc292b473167517ced73c0ff627c4ed99287",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCfPeH6lVQUMGzo\nkJ1GTQD2+pSwQZ13n6lvdJCySlBj+FZ6U+UVtkijpq3bGeA6yv6uIR818sH+Fwe+\nlj4xNuhfwQYm7QDYqzDH+mTMlSgg6NrlpB3rREfpa8DSzD7tUZSdmoyhws2cvE6/\nadY3MxKmrfCsNmXwcZsx0du7dIvhPEuHnfQVckc18JpdgrOKwduL/0c5d9odLA40\n4E4sT1/AdI7OL4IRrxmhD972VOOsv0gmmHRODNBAcN5UunV3aNXv+5HfG7CVLt7n\njeeTkucNak7KcUhUnTSxQS7M/hQP9OCVBSSKKL5uCf6nNaDEGNRwKD/aEVt3tnnZ\nJKZzAQBJAgMBAAECggEAHSMOD7M2HLGVo+IeHOhnFknYXf3LicFZl86s0Sqe1gPx\nEtX580SUuvj7E72C1U8iVYsy8kSWcV8WaC2GeKvSzf58GTBBeOOt+9FZk0NxgcAJ\nmX4ziUJHpDK2p/t+Qh8swb+vHsQNqjGceRKtAxGhxoTKJkCX22x2GKINAho7o/0B\n70f0e5YKWjYPSPbf2NhLTxZFodMLGnPss6KbmYr9guzSUH1qDYd1P+IYlTA/PGRJ\nxforLXxVoihvqOYwuxM0+PjU69I1rcT/PAobzs/Praf20ZdGxP03Llv41RX97bkw\n5jGa2p+wCWK5yq1tScSG4QnsMcih2E3V02VxV8dEHwKBgQDOUNrU6AbGNlWrTexb\nzRS4ZPRPbkFlFtCHqHmIImboJaAeLnT17vBHai51SzbmbWVyHzEBq3b8EzjqS0Xe\n6Arcc36tRs5vfhCqwdBewmn4jVcpGjU6pFT8onEsYuDehgznK6DSjtC9syeY5fep\nColAkdMRgbPRH/+Dw7hB4ag7cwKBgQDFlvXvp6Zn1XyQ1AsEHUWNI7M4mwv/IMlL\nyRlkHux4CJizrDvoTxNCTs4Et1e/xYk/WIpGRQv396zXByRuvU9vbAhKO04bsu0J\nwmCY4ilQ7ZQil3qg90bWnzXQ7XQbkwptlO6VHimGGllbo0OgMSiqDFJQu66efHvK\nj1a1WHjeUwKBgQCSjxdUpNqjFVf4D6u2btGoR3bRshXcVL+fjot+rEmD4a6DoibN\nyYWAhaopAlwmhlHJJuUuNXqZiKImtYAV36pPfe/f8WuWAeyfEH0Pw3V57hWbihWD\n6dbBfDd++2KYUIt78B8XVAJur4SSddJfj69+YdiZGBT/moZtOKx8iGt0hwKBgFy7\nuvUdM8Yrteiq+/iUXF4fUS/R5NF6a777xMTuloDHWBOLVBp1ck5+ecZQ3ggNB5sJ\nTOwp37IjNaU9nuWyR6O9ii58ou3xDbq01W0rR8TJm+qYOV9ubnqwAivqJcIDQrOn\nYEnv/AEKQMH3X/fA2prkaYWmcA/F0LuChmlZ+nAtAoGAGuIia/bp0pA+6aA+i6HO\nLzQ82oFb96jpTLG96G+xQFd27G0SuiiIvu1GMJaOGprLWb2Fsq9+N5pKe/ZmJxVb\ncQtvXBkVp88KXCzs+O5vnFVPYKSImmp3Qu5/zwFJjM6PAAS58eWjQKDVh9QG4M8/\nb2l6u5sQLjJIVAJIs/FhGJk=\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-tzrft@ses-2a-team-2.iam.gserviceaccount.com",
            "client_id": "114098105708445700690",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tzrft%40ses-2a-team-2.iam.gserviceaccount.com"
        };
        
        
        fireStore.initializeApp({
            credential: fireStore.credential.cert(serviceAccount)
        });
    }

    async setSubjects(id, subject) {
        const courses = this.db.collection('courses');
        let courseDoc = courses.doc(id);
        await courseDoc.set(subject)
    }

    async getSubject(id) {
        const courseRef = this.db.collection('courses').doc(id);
        const doc = await courseRef.get();
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            console.log('Document data:', doc.data());
        }
    }

    async getAllSubjects() {
        const courseRef = this.db.collection('courses');
        const snapshot = await courseRef.get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }  
          
        let subjects ={}

        snapshot.forEach(doc => {
            subjects[doc.id] = doc.data();
        });

        console.log(subjects);
    }

    async getSubjectFromName(name) {
        const courseRef = this.db.collection('courses');
        const snapshot = await courseRef.where('course_name', '>=', name).where('course_name', '<=', name + '\uf8ff').get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }  

        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
        });
    }



    // TODO: AllSubjects, Subject Description, Subject Update Subject Delete, JSON to Subjects
}

subjectService =  new SubjectService();
subjectService.setSubjects();
// subjectService.getSubject("57239")
// subjectService.getSubjectFromName("Writing")
// subjectService.getSubjectFromName("Lol")
// subjectService.getSubjectFromName("Practice")
subjectService.getAllSubjects();