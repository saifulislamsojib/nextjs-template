"use client";

import Button from "@/components/ui/button";
import { NextError } from "@/types";
import { useEffect } from "react";

const Error = ({ error, reset }: NextError) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-red-500">
        {error.message || "Something went wrong happened!"}
      </h1>
      <Button onClick={() => reset()}>Re Try</Button>
    </div>
  );
};

export default Error;
