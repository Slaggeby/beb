import { collection, doc, getDoc, setDoc, } from '@firebase/firestore';

import { database, auth } from '../config/firebase';


let userData = {};

const fetchUserData = async () => {
  const user = auth.currentUser;
  const docRef = await doc(database, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    userData = docSnap.data();
    console.log(userData)
  } 
  else {
    console.log("No such document!");
  }
};

const addToGroceryList = async (item) => {
  await fetchUserData();
  const user = await auth.currentUser;
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

};

export default addToGroceryList;