import { collection, doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';
import { database, auth } from '../config/firebase';

const user = auth.currentUser;

let userData={};

const fetchUserData = async () => {

   
  const docRef = await doc(database, "users", user.uid);
  const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
//console.log("Document data:", docSnap.data());

userData=docSnap.data();
} else {
// docSnap.data() will be undefined in this case
console.log("No such document!");
}
}

const addToGroceryList = async (item) => {
    await fetchUserData();
    console.log(userData)
    const user = auth.currentUser;
  const userRef = doc(database, 'users', user.uid);

  const yourGroceryListsRef = collection(userRef, 'grocerylists');
  const yourGroceryListDocRef = doc(yourGroceryListsRef, userData.currentlist);
  const yourGroceryListRef = collection(yourGroceryListDocRef, 'items');
  const itemDocRef = doc(yourGroceryListRef, item.id);
  const itemDoc = await getDoc(itemDocRef);

  if (itemDoc.exists()) {
  
    const existingAmount = itemDoc.data().amount;
    await setDoc(itemDocRef, { item: item, amount: existingAmount + 1 });
  } else {
    await setDoc(itemDocRef, {
      item: item,
      amount: 1,
    });
  }

  // Update the currentlist field to 'yourgrocerylist'
  
};

export default addToGroceryList;