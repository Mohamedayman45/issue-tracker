"use client";
import React from "react";
import { TextField, Flex, Button, TextArea } from "@radix-ui/themes";
import Spinner from "@/app/components/spinner";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { issueSchema } from "@/app/issueSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type IssueProps = z.input<typeof issueSchema>;

const NewIssue = () => {
  const [loading, setLoading] = React.useState(false);
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
      setLoading(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setLoading(false);
      console.error("Failed to create issue:", error);
    } finally {
      setLoading(false);
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
        <Button onClick={handleSubmit(onSubmit)} disabled={loading}>Create Issue {loading && <Spinner />}</Button>
      </div>
    </div>
  );
};

export default NewIssue;
