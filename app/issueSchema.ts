import z from "zod";


enum IssueStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}

export const issueSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(6).max(1024),
  status: z.nativeEnum(IssueStatus).default(IssueStatus.OPEN),
});


