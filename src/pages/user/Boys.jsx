import React from 'react';
import { CardBoy, ProductCard } from '../../components/user/Cards';
export const Boys = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Boys' Products</h1>
            <p className="mt-2">Browse our selection for boys.</p>

            <ProductCard/>
            <CardBoy/>
        </div>

         
    );
};

