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
        setFormData({ name: "", email: "", message: "" }); // Reset form
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
          className="flex justify-center items-center flex-col gap-4 w-full"
        >
          <Input
            type="text"
            name="name"
            value={formData.name}
            className="border ring-0 ring-offset-0 focus-visible:ring-0 p-2"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />

          <Input
            type="email"
            name="email"
            className="border ring-0 ring-offset-0 focus-visible:ring-0 p-2"
            value={formData.email}
            placeholder="Your Email"
            onChange={handleChange}
            required
          />
          <Textarea
            name="message"
            value={formData.message}
            placeholder="Your Message"
            onChange={handleChange}
            className="border ring-0 ring-offset-0 focus-visible:ring-0 p-2"
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
