import React from "react";
import { Card, CardBody, Typography, Input, Button } from "@material-tailwind/react";

export const Contact = () => {
    return (
        <div className="flex flex-col items-center justify-center p-10 min-h-screen">
            <Typography variant="h1" className="text-4xl font-bold mb-8 text-blue-600">
                Contact Us
            </Typography>
            <Card className="max-w-3xl w-full shadow-lg mb-6">
                <CardBody>
                    <Typography variant="h5" className="mb-4">
                        We'd Love to Hear From You!
                    </Typography>
                    <Typography className="mb-6">
                        If you have any questions, feedback, or inquiries, please fill out the form below, and we will get back to you as soon as possible.
                    </Typography>
                    <form>
                        <div className="mb-4">
                            <Input label="Your Name" required />
                        </div>
                        <div className="mb-4">
                            <Input label="Your Email" type="email" required />
                        </div>
                        <div className="mb-4">
                            <Input label="Subject" required />
                        </div>
                        <div className="mb-4">
                            <Input label="Message" type="textarea" required />
                        </div>
                        <Button type="submit" className="btn btn-primary">
                            Send Message
                        </Button>
                    </form>
                </CardBody>
            </Card>
            <Typography variant="h2" className="text-2xl font-semibold mb-3 text-blue-500">
                Our Location
            </Typography>
            <Typography className="mb-6">
                123 VCare St.<br />
                Health City, HC 12345<br />
                Email: support@vcare.com<br />
                Phone: (123) 456-7890
            </Typography>
        </div>
    );
};
