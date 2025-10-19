"use client";
import React from "react";
import { TextField, Flex, Button, TextArea } from "@radix-ui/themes";

const NewIssue = () => {
  return (
    <div className="p-5">
      <Flex direction="column" gap="3" maxWidth="400px">
        <TextField.Root variant="soft" placeholder="Title" />
        <TextArea variant="soft" placeholder="Description" />
      </Flex>
      <div className="mt-3">
        <Button>Create Issue</Button>
      </div>
    </div>
  );
};

export default NewIssue;
