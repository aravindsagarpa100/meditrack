import {
  auth,
  provider,
  db,
  storage,
  signInWithPopup,
  onAuthStateChanged,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  ref,
  uploadBytes,
  getDownloadURL
} from './firebase.js';

const loginBtn = document.getElementById('loginBtn');
const takePhotoBtn = document.getElementById('takePhotoBtn');
const photoInput = document.getElementById('photoInput');
const medicationList = document.getElementById('medicationList');

let currentUser = null;

loginBtn.addEventListener('click', async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    alert(err.message);
  }
});

onAuthStateChanged(auth, async user => {
  if (!user) return;

  currentUser = user;

  document.getElementById('profileName').textContent = user.displayName;
  document.getElementById('caregiverName').textContent = user.displayName;

  loadMedications();
});

takePhotoBtn.addEventListener('click', () => {
  photoInput.click();
});

photoInput.addEventListener('change', async e => {
  const file = e.target.files[0];

  if (!file || !currentUser) return;

  try {
    const storageRef = ref(
      storage,
      `proofs/${currentUser.uid}/${Date.now()}-${file.name}`
    );

    await uploadBytes(storageRef, file);

    const imageUrl = await getDownloadURL(storageRef);

    await addDoc(collection(db, 'doses'), {
      uid: currentUser.uid,
      userName: currentUser.displayName,
      imageUrl,
      createdAt: Date.now()
    });

    alert('Medication proof uploaded');

    loadMedications();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
});

async function loadMedications() {
  medicationList.innerHTML = '';

  const q = query(
    collection(db, 'doses'),
    where('uid', '==', currentUser.uid)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(docSnap => {
    const data = docSnap.data();

    const div = document.createElement('div');

    div.innerHTML = `
      <div class="med-card">
        <img src="${data.imageUrl}" width="120" />
        <p>${data.userName}</p>
        <button onclick="deleteDose('${docSnap.id}')">
          Delete
        </button>
      </div>
    `;

    medicationList.appendChild(div);
  });
}

window.deleteDose = async function(id) {
  try {
    await deleteDoc(doc(db, 'doses', id));
    loadMedications();
  } catch (err) {
    alert(err.message);
  }
}
