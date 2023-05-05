import { collection, doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';
import { database, auth } from '../config/firebase';



const addToGroceryList = async (item) => {
    const user = auth.currentUser;
  const userRef = doc(database, 'users', user.uid);

  const yourGroceryListsRef = collection(userRef, 'grocerylists');
  const yourGroceryListDocRef = doc(yourGroceryListsRef, 'yourgrocerylist');
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
  await updateDoc(userRef, { currentlist: 'yourgrocerylist' });
};

export default addToGroceryList;