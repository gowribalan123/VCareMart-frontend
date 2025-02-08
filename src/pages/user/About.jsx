import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";

export const About = () => {
    return (
        <div className="flex flex-col items-center justify-center p-10  min-h-screen">
            <Typography variant="h1" className="text-4xl font-bold mb-8 text-blue-600">
                About Us
            </Typography>
            <Card className="max-w-3xl w-full shadow-lg mb-6">
                <CardBody>
                    <Typography variant="h5" className="mb-4">
                        Welcome to VCare!
                    </Typography>
                    <Typography className="mb-6">
                        We are dedicated to providing you with the best health and wellness products available on the market. Our mission is to empower individuals to take charge of their health through quality products and exceptional service.
                    </Typography>
                </CardBody>
            </Card>
            <Typography variant="h2" className="text-2xl font-semibold mb-3 text-blue-500">
                Our Mission
            </Typography>
            <Card className="max-w-3xl w-full shadow-lg mb-6">
                <CardBody>
                    <Typography className="mb-4">
                        At VCare, our mission is to enhance the quality of life for our customers by offering innovative health solutions and personalized care. We believe in the power of knowledge and strive to educate our customers about health and wellness.
                    </Typography>
                </CardBody>
            </Card>
            <Typography variant="h2" className="text-2xl font-semibold mb-3 text-blue-500">
                Our Values
            </Typography>
            <Card className="max-w-3xl w-full shadow-lg mb-6">
                <CardBody>
                    <ul className="list-disc list-inside mb-4">
                        <li>Integrity: We uphold the highest standards of integrity in all our actions.</li>
                        <li>Customer Focus: We prioritize our customers and their needs.</li>
                        <li>Quality: We are committed to providing high-quality products and services.</li>
                        <li>Innovation: We continuously seek innovative solutions to improve health and wellness.</li>
                    </ul>
                </CardBody>
            </Card>
            <Typography variant="h2" className="text-2xl font-semibold mb-3 text-blue-500">
                Join Us
            </Typography>
            <Card className="max-w-3xl w-full shadow-lg mb-6">
                <CardBody>
                    <Typography>
                        Thank you for choosing VCare. We invite you to explore our range of products and join us on this journey to better health!
                    </Typography>
                </CardBody>
            </Card>
        </div>
    );
};
