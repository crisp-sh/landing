"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Mail, User, Loader2, Check, Link } from "lucide-react";
import { HoverButton } from "./hover-button";
import { Separator } from "./ui/separator";
import { balloons } from "balloons-js";
import { Spinner } from "./ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function WaitlistForm({
  flexDirection,
}: {
  flexDirection: string;
}) {
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
        <div className="w-full max-w-full mx-auto space-y-4 text-center">
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
          className="w-full w-full mx-auto space-y-2"
          onSubmit={handleSubmit}
          method="POST"
        >
          <div className="space-y-6 mb-6 text-center">
            <h2 className="uppercase text-2xl xs:text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl font-normal text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400">
              Join the waitlist
            </h2>
          </div>
          <div className={`flex flex-${flexDirection} sm:flex-row gap-2`}>
            <div className="space-y-1 flex-1">
              <div className="relative">
                <Input
                  id="waitlist-first-name"
                  className="peer ps-[3rem] h-10 sm:h-12 font-bold bg-background tracking-wide uppercase w-full"
                  placeholder="HELENA"
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
                  className="peer ps-[3rem] h-10 sm:h-12 font-bold tracking-wide uppercase w-full"
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
                className="peer ps-[3rem] h-10 sm:h-12 font-bold tracking-wide uppercase w-full"
                placeholder="HELLY.R@LUMON.INDUSTRIES"
                type="email"
                aria-label="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/50 peer-disabled:opacity-50">
                <span className="text-[10px] font-semibold tracking-widest">
                  EMAIL
                  <br />
                  ADDR
                </span>
              </div>
            </div>
          </div>
          <HoverButton
            type="submit"
            className="w-full uppercase h-12 font-extralight flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <Spinner variant="ellipsis" /> : "notify me"}
          </HoverButton>
        </form>
      )}
      <div className="w-full max-w-[18rem] sm:max-w-xs md:max-w-sm mx-auto px-4 space-y-5 sm:space-y-6 flex flex-col items-center py-10">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <Avatar className="border-2 border-black w-8 h-8 sm:w-12 sm:h-12">
                <AvatarImage src="/avatars/two.png" alt="User 1 Avatar" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-black w-8 h-8 sm:w-12 sm:h-12">
                <AvatarImage src="/avatars/three.png" alt="User 2 Avatar" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-black w-8 h-8 sm:w-12 sm:h-12">
                <AvatarImage src="/avatars/one.png" alt="User 3 Avatar" />
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>
            </div>
            <span className="font-semibold text-xs sm:text-sm text-gray-400">
              200+ people already on the waitlist
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
