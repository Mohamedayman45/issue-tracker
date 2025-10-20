"use client";
import React from "react";
import { TextField, Flex, Button, TextArea } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { issueSchema } from "@/app/issueSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type IssueProps = z.input<typeof issueSchema>;

const NewIssue = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueProps>({
    resolver: zodResolver(issueSchema),
  });

  console.log(errors);
  const onSubmit = async (data: IssueProps) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      console.error("Failed to create issue:", error);
    }
  };
  return (
    <div className="p-5">
      <Flex direction="column" gap="3" maxWidth="400px">
        <TextField.Root
          variant="soft"
          placeholder="Title"
          {...register("title")}
        />
        {errors.title && (
          <span className="text-red-500">Title is required</span>
        )}
        <TextArea
          variant="soft"
          placeholder="Description"
          {...register("description")}
        />
        {errors.description && (
          <span className="text-red-500">Description is required</span>
        )}
      </Flex>
      <div className="mt-3">
        <Button onClick={handleSubmit(onSubmit)}>Create Issue</Button>
      </div>
    </div>
  );
};

export default NewIssue;
