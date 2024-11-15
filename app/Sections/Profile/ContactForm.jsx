"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    inquiryType: "",
    subject: "",
    phoneNumber: "", // Add phoneNumber here
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const inquiryOptions = [
    "Career Opportunities",
    "Partnership or Collaboration Opportunity",
    "Investment Opportunities",
    "Compliment or Praise",
    "Press or Media Inquiry",
    "Product Suggestions or Recommendations",
    "Custom Orders or Special Requests",
    "Wholesale or Bulk Order Inquiry",
    "Events",
    "Subscription or Service Questions",
    "Billing or Payment",
    "Website Bug or Technical Issue",
    "Technical Assistance",
    "Returns, Exchanges, or Refunds",
    "Order Status",
    "Product Information Request",
    "Account Login or Password Help",
    "Feedback or Complaint",
    "Developer Support (API, Integration)",
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
          subject: "",
          inquiryType: "",
          phoneNumber: "",
        });
      } else {
        setError("Failed to send the message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setError("Error submitting contact form.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
      <div className="flex w-full claracontainer px-2 lg:px-4 flex-col items-center justify-center">
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
        <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col gap-2 lg:gap-4 w-full"
          >
            <div className="flex w-full flex-col lg:flex-row gap-2 lg:gap-1">
              <Input
                type="text"
                name="name"
                value={formData.name}
                className="border bg-white p-2"
                placeholder="Your Name"
                onChange={handleChange}
                required
              />

              <Input
                type="email"
                name="email"
                className="border bg-white p-2"
                value={formData.email}
                placeholder="Your Email"
                onChange={handleChange}
                required
              />
            </div>

            <Input
              type="tel"
              name="phoneNumber"
              className="border bg-white p-2"
              value={formData.phoneNumber}
              required
              placeholder="Your Contact"
              onChange={handleChange}
            />
            <Input
              name="subject"
              value={formData.subject}
              placeholder="Enter Subject"
              onChange={handleChange}
              className="border bg-white p-2"
              required
            />
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              required
              className="border p-2 bg-white font-fredoka text-[#7f8896] rounded-[8px] w-full"
            >
              <option className="text-black" value="">Select Inquiry Type</option>
              {inquiryOptions.map((option, index) => (
                <option className="text-black" key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <Textarea
              name="message"
              value={formData.message}
              placeholder="Your Message"
              onChange={handleChange}
              className="border bg-white p-2"
              required
            />
            <Button
              type="submit"
              disabled={loading}
              className="clarabutton w-[200px] lg:w-[300px] bg-red hover:bg-hoverRed text-white p-2"
            >
              {loading ? "Sending..." : "Submit"}
            </Button>
          </form>
      </div>
    </section>
  );
}
