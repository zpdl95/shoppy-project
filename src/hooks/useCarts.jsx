import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useCarts() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartsQuery = useQuery({
    queryKey: ['carts', uid || ''],
    queryFn: () => getCart(uid),
    enabled: !!uid,
    staleTime: 1000 * 60 * 5,
  });

  const addItem = useMutation({
    mutationFn: (product) => addToCart(uid, product),
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });

  const updateItem = useMutation({
    mutationFn: (product) => updateCart(uid, product),
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });

  const removeItem = useMutation({
    mutationFn: (product) => removeFromCart(uid, product),
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });

  return { cartsQuery, addItem, updateItem, removeItem };
}
