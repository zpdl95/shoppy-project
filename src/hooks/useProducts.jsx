import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addOrUpdateProducts,
  getProducts,
  removeFromProducts,
} from '../api/firebase';

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  });

  const addOrUpdateProduct = useMutation({
    mutationFn: ({ formProduct, url }) => addOrUpdateProducts(formProduct, url),
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });

  const removeProduct = useMutation({
    mutationFn: (productId) => removeFromProducts(productId),
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });

  return { productsQuery, addOrUpdateProduct, removeProduct };
}
