"use client";
import React from "react";
import { TextField, Flex, Button, TextArea } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueProps {
  title: string;
  description: string;
}

const NewIssue = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueProps>();
  const onSubmit = async (data: IssueProps) => {
    await axios
      .post("/api/issues", data)
      .then(() => router.push("/issues"))
      .catch((error) => {
        console.error("Failed to create issue:", error);
      });
  };
  return (
    <div className="p-5">
      <Flex direction="column" gap="3" maxWidth="400px">
        <TextField.Root
          variant="soft"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && <span className="text-red-500">Title is required</span>}
        <TextArea
          variant="soft"
          placeholder="Description"
          {...register("description" , { required: true })}
        />
        {errors.description && <span className="text-red-500">Description is required</span>}
      </Flex>
      <div className="mt-3">
        <Button onClick={handleSubmit(onSubmit)}>Create Issue</Button>
      </div>
    </div>
  );
};

export default NewIssue;
