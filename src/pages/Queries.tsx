import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

type Status = "pending" | "in-progress" | "resolved";

type Issue = {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: Status;
};

const getStatusColor = (status: Status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "in-progress":
      return "bg-blue-500";
    case "resolved":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export default function Issues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  const fetchIssues = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/issues/getall", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIssues(response.data);
    } catch (error) {
      console.error("Failed to fetch issues:", error);
      toast({
        title: "Error",
        description: "Failed to fetch issues.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  fetchIssues();
}, []);


const handleStatusChange = async (issueId: string, newStatus: Status) => {
  console.log("Updating issue:", { issueId, newStatus }); // Debug log

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const response = await axios.patch(
      "http://localhost:3001/issues/update",
      { issueId, status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Updated issue response:", response.data); // Debug log
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue._id === response.data._id ? response.data : issue
      )
    );

    toast({
      title: "Status Updated",
      description: `Issue status updated to ${newStatus}`,
    });
  } catch (error) {
    console.error("Failed to update issue status:", error);
    toast({
      title: "Error",
      description: error.response?.data?.message || "Failed to update issue status.",
      variant: "destructive",
    });
  }
};





  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Issues</h1>
          <p className="text-muted-foreground">
            Manage and respond to user issues
          </p>
        </div>

        {loading ? (
          <p>Loading issues...</p>
        ) : (
          <div className="grid gap-4">
            {issues.map((issue) => (
              <Card key={issue._id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{issue.name}</h3>
                    <p className="text-sm text-muted-foreground">{issue.email}</p>
                    <p className="text-sm">{issue.message}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={issue.status}
                      onValueChange={(value: Status) =>
                        handleStatusChange(issue.email, value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                    <Badge className={getStatusColor(issue.status)}>
                      {issue.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
