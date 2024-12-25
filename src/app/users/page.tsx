"use client";

import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import UserTable from "@/components/userTable";
import { useUsers, useUsersByPage } from "@/hooks/getUserHook";
import React, { useState } from "react";

const Page = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const {
    data: data1,
    isPending: isPending1,
    isError: isError1,
    error: error1,
  } = useUsersByPage(page, pageSize);
  const {
    data: data2,
    isPending: isPending2,
    isError: isError2,
    error: error2,
  } = useUsers();

  const [currentMode, setCurrentMode] = useState("dark");

  const changeMode = () => {
    setCurrentMode((prev) => {
      if (prev == "dark") return "light";
      else return "dark";
    });
  };

  if (isPending1 || isPending2) {
    return (
      <Loader
        isLoading={isPending1 || isPending2}
        message={"Please wait a moment..."}
      />
    );
  }

  if (isError1 || isError2) {
    return <Error error={error1 || error2} />;
  }

  return (
    <div>
      <Navbar currentMode={currentMode} changeMode={changeMode} />
      <div className="w-full h-20 bg-background flex"></div>
      <UserTable
        data={data1}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalCount={100}
      />
      <UserTable data={data2} />
    </div>
  );
};
export default Page;
