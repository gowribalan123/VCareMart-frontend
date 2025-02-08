import React from "react";
import { CreateProductForm } from "../../components/seller/CreateProductForm";

export const CreateProduct = () => {
    return (
        <main className="container mx-auto px-2">
            <section className="my-8 lg:w-3/4 mx-auto px-1">
                <h2 className="font-semibold text-center text-2xl my-5 underline">Create new Product</h2>
                <CreateProductForm />
            </section>
        </main>
    );
};