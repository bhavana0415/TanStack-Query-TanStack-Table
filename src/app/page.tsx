"use client";

import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import UserTable from "@/components/userTable";
import { useUsers } from "@/hooks/getUserHook";
import React, { useState } from "react";

const Page = () => {
  const { data, isPending, isError, error } = useUsers();
  const [currentMode, setCurrentMode] = useState("dark");

  const changeMode = () => {
    setCurrentMode((prev) => {
      if (prev == "dark") return "light";
      else return "dark";
    });
  };

  if (isPending) {
    return <Loader isLoading={isPending} message={"Please wait a moment..."} />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <div>
      <Navbar currentMode={currentMode} changeMode={changeMode} />
      <div className="w-full h-20 bg-background flex"></div>
      <UserTable data={data} />
    </div>
  );
};
export default Page;
