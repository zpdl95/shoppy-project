import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import { get, getDatabase, ref, remove, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// auth관련 코드
provider.setCustomParameters({
  prompt: 'select_account',
});

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  // onAuthStateChanged 함수는 유저정보가 변하면 등록된 콜백함수를 자동으로 실행한다.
  onAuthStateChanged(auth, async (user) => {
    const updateUser = user && (await adminUser(user));
    callback(updateUser);
  });
}

async function adminUser(user) {
  return get(ref(database, '/admins'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    })
    .catch((error) => {
      console.log(error);
      return user;
    });
}

// product관련 코드
export async function getProducts() {
  return get(ref(database, '/products')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const products = snapshot.val();
        return Object.values(products);
      }
      return [];
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function addOrUpdateProducts(product, imageUrl) {
  if (product.productId) {
    return set(ref(database, `/products/${product.productId}`), {
      ...product,
      price: parseInt(product.price),
      imageUrl,
      options: product.options
        ? product.options.toLowerCase().split(',')
        : null,
    });
  }

  const productId = uuidv4();
  return set(ref(database, `/products/${productId}`), {
    ...product,
    productId,
    price: parseInt(product.price),
    imageUrl,
    options: product.options ? product.options.toLowerCase().split(',') : null,
  });
}

export async function removeFromProducts(productId) {
  return remove(ref(database, `/products/${productId}`));
}

// cart관련 코드
export async function getCart(userId) {
  return get(ref(database, `/carts/${userId}`)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const items = snapshot.val();

        return items;
      }
      return [];
    });
}

export async function addToCart(userId, product) {
  if (!userId) return Promise.reject('로그인이 필요한 기능입니다.');
  await get(ref(database, `/carts/${userId}`)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        let addCount = 1;
        const items = snapshot.val();

        for (let index = 0; index < items.length; index++) {
          if (!addCount) break;
          /* 같은 제품 && 같은 옵션이면 수량만 더하기 */
          if (items[index].productId === product.productId) {
            if (items[index].option === product.option) {
              items[index].quantity++;
              addCount--;
              return set(ref(database, `/carts/${userId}`), items);
            }
          }
        }

        /* 그 이외 전부 추가 */
        if (addCount) {
          addCount--;
          return set(ref(database, `/carts/${userId}`), [...items, product]);
        }
      } else {
        return set(ref(database, `/carts/${userId}`), [product]);
      }
    });
}

export async function updateCart(userId, product) {
  await get(ref(database, `/carts/${userId}`)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const items = snapshot.val();
        const updateItems = items.map((item) => {
          if (item.productId === product.productId) {
            if (item.option === product.option) {
              return product;
            }
            return item;
          }
          return item;
        });
        return set(ref(database, `/carts/${userId}`), updateItems);
      }
    });
}

export async function removeFromCart(userId, product) {
  await get(ref(database, `/carts/${userId}`)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const items = snapshot.val();
        const updateItems = items.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(product)
        );
        return set(ref(database, `/carts/${userId}`), updateItems);
      }
    });
}
