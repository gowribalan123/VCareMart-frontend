import React from 'react';
import { ProductCard } from '../../components/user/Cards';

export const Girls = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Girls' Products</h1>
            <p className="mt-2">Browse our selection for girls.</p>

            <ProductCard/>
        </div>
        
    );
};
 
