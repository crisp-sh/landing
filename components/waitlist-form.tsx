"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Mail, User, Loader2, Check, Link } from "lucide-react";
import { HoverButton } from "./hover-button";
import { Separator } from "./ui/separator";
import { balloons } from "balloons-js";

export default function WaitlistForm() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || isSuccess) return;

    setIsLoading(true);
    setIsSuccess(false);

    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstName, lastName }),
      });

      if (response.ok) {
        setIsSuccess(true);
        balloons();
        setEmail("");
        setFirstName("");
        setLastName("");
        toast.success("Thank you for joining our waitlist! 🚀");
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error occurred" }));
        const errorMessage =
          errorData?.detail ||
          errorData?.title ||
          "Oops! Something went wrong!";
        toast.error(errorMessage);
        console.error("Submission Error:", response.status, errorData);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
  };

  return (
    <>
      {isSuccess ? (
        <div className="w-full max-w-md mx-auto space-y-4 text-center">
          <h3 className="text-xl font-semibold text-neutral-400">
            Thank you for joining the waitlist!
          </h3>
          <p className="text-gray-400">
            We will notify you when your spot is confirmed.
          </p>
          <HoverButton
            onClick={handleReset}
            className="w-2/3 uppercase h-12 font-extralight"
          >
            Sign up with another email
          </HoverButton>
        </div>
      ) : (
        <form
          className="w-full max-w-md mx-auto space-y-4"
          onSubmit={handleSubmit}
          method="POST"
        >
          <div className="space-y-6 mb-6 text-center">
            <h2 className="text-3xl sm:text-2xl font-normal text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400">
              Join the waitlist
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="space-y-2 flex-1">
              <div className="relative">
                <Input
                  id="waitlist-first-name"
                  className="peer ps-[4.5rem] h-10 sm:h-12 font-bold tracking-wide uppercase w-full"
                  placeholder="HELLY"
                  type="text"
                  aria-label="First Name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/50 peer-disabled:opacity-50">
                  <span className="text-[10px] font-semibold tracking-widest">
                    FIRST
                    <br />
                    NAME
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2 flex-1">
              <div className="relative">
                <Input
                  id="waitlist-last-name"
                  className="peer ps-[4.5rem] h-10 sm:h-12 font-bold tracking-wide uppercase w-full"
                  placeholder="EAGAN"
                  type="text"
                  aria-label="Last Name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/50 peer-disabled:opacity-50">
                  <span className="text-[10px] font-semibold tracking-widest">
                    LAST
                    <br />
                    NAME
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Input
                id="waitlist-subscribe"
                className="peer ps-9 h-10 sm:h-12 font-bold tracking-wide uppercase"
                placeholder="HELLY.R@LUMON.INDUSTRIES"
                type="email"
                aria-label="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <Mail size={16} strokeWidth={2} aria-hidden="true" />
              </div>
            </div>
          </div>
          <HoverButton
            type="submit"
            className="w-full uppercase h-12 font-extralight flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "notify me"
            )}
          </HoverButton>
        </form>
      )}
    </>
  );
}
