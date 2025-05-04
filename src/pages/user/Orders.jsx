import React, { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Button, Card, Typography } from "@material-tailwind/react"; // Import Material Tailwind components
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { addItem, removeItem, clearOrder, addQuantityToItem, subtractQuantityFromItem } from '../../redux/features/orderSlice';

export const Orders = () => {
  const { userId } = useParams();
  const [orderDetails, isLoading, error] = useFetch(`/order/getUserOrders/${userId}`);

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch order details");
    }
  }, [error]);

  if (isLoading) {
    return <div>Loading order details...</div>;
  }

  return (
    <div className="p-4">
      <section>
        <Typography variant="h4" className="text-center mb-4">Order Summary</Typography>
      </section>
      <section>
        {orderDetails?.items?.length > 0 ? (
          orderDetails.items.map((item) => (
            <Card key={item.productId} className="mb-4 p-4">
              <Typography variant="h5">{item.ProductName}</Typography>
              <Typography>Price: ₹{item.price}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
            </Card>
          ))
        ) : (
          <Typography>No items in this order.</Typography>
        )}
      </section>
      <section className="mt-4">
        <Typography variant="h6">Total Price: ₹{orderDetails?.totalPrice}</Typography>
        <Button className="mt-4" color="green">Track Order</Button>
      </section>
    </div>
  );
};
