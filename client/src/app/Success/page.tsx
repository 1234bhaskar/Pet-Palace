'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { useEffect, useRef } from 'react';
import { ProductInput } from '../../../gql/graphql';
import { useCaptureOrder } from '../../../hooks/order';
import { RemoveAllProduct } from '../Redux/Slices/Cart/Cart';

interface Productprops {
    id: string;
    name: string;
    description?: string;
    price: number;
    images?: string;
    stock?: Boolean;
    quantity: number;
}

export default function Success() {
    const router = useRouter()
    const search = useSearchParams();
    const CartNumber = useAppSelector((Cart) => Cart.Cart.Cart);
    const { mutateAsync } = useCaptureOrder();
    const dispatch=useAppDispatch();

    // Add a ref to prevent double execution

    const hasMutated = useRef(false); // Ensure this is outside the async function
    useEffect(() => {

        const performMutation = async () => {
            if (hasMutated.current) return; // Prevent duplicate execution in Strict Mode
            hasMutated.current = true;

            const searchQuery = search ? search.get('token') : '';
            console.log('Search Query:', searchQuery);

            // Calculate total price
            const totalPrice = CartNumber.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            // Create products checkout array
            const productsCheckout: ProductInput[] = CartNumber.map((cart) => ({
                name: cart.name,
                price: cart.price,
                quantity: cart.quantity,
                id: cart.id,
            }));

            // Log the data for debugging
            console.log('Total Price:', totalPrice);
            console.log('Products Checkout:', productsCheckout);

            // Perform the mutation with directly calculated values
            try {
                await mutateAsync({
                    total: totalPrice,
                    address: '',
                    Products: productsCheckout,
                    OrderId: searchQuery as string,
                });
                setTimeout(() => {
                    router.push("/")
                    dispatch(RemoveAllProduct())
                }, 5000)
            } catch (error) {
                console.error('Mutation Error:', error);
            }

        };

        // Call the async function
        performMutation();
    }, [CartNumber, search, mutateAsync,dispatch,router]);

    return (
        <div className="h-screen text-4xl">Success</div>
    );
}
