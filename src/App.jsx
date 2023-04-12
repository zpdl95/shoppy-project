import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import {
  MyCarts,
  Home,
  ProductDetail,
  AllProducts,
  Root,
  NewProduct,
  NotFound,
  ProtectedRoute,
  EditProduct,
} from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} errorElement={<NotFound />}>
      <Route index element={<Home />} />
      <Route
        path='/carts'
        element={
          <ProtectedRoute>
            <MyCarts />
          </ProtectedRoute>
        }
      />
      <Route path='/products' element={<AllProducts />} />
      <Route
        path='/products/new'
        element={
          <ProtectedRoute requireAdmin>
            <NewProduct />
          </ProtectedRoute>
        }
      />
      <Route path='/products/:productId' element={<ProductDetail />} />
      <Route path='/products/:productId/edit' element={<EditProduct />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
