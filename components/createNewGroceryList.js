import { collection, doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';
import { database, auth } from '../config/firebase';

const createNewGroceryList = async (newListName) => {
  console.log('I CREATE NEW GROCERY', newListName, typeof (newListName), newListName.length)
  const user = auth.currentUser;
  if (newListName.length > 0) {
    const userRef = doc(database, 'users', user.uid);

    const yourGroceryListsRef = collection(userRef, 'grocerylists');
    const yourGroceryListDocRef = doc(yourGroceryListsRef, newListName);

    await setDoc(yourGroceryListDocRef, { shown: true });

    console.log('updated currentlist to;', newListName)
    await updateDoc(userRef, { currentlist: newListName });

  } else {

    console.log('Empty name, creating your grocery')
    const userRef = doc(database, 'users', user.uid);
    const yourGroceryListsRef = collection(userRef, 'grocerylists');
    const yourGroceryListDocRef = doc(yourGroceryListsRef, 'Your Grocery List');
    await setDoc(yourGroceryListDocRef, { shown: true });


    await updateDoc(userRef, { currentlist: 'Your Grocery List' });


  }
}

export default createNewGroceryList;