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
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

type Status = "pending" | "under-review" | "resolved";

type Report = {
  _id: string;
  reporter: {
    name: string;
    email: string;
  };
  reported: {
    name: string;
    email: string;
  };
  details: string;
  status: Status;
};

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch reports
  const fetchReports = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found. Please log in.");
      setLoading(false); // Stop loading
      return;
    }

    try {
      const response = await axios.get("http://localhost:3001/report/getall", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReports(response.data); // Update the reports state
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      toast({
        title: "Error",
        description: "Failed to fetch reports.",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Call fetchReports on component mount
  useEffect(() => {
    fetchReports();
  }, []);

  // Update report status
  const handleStatusChange = async (reportId: string, newStatus: Status) => {
    try {
      const response = await axios.patch(
        "http://localhost:3001/report/update",
        {
          id: reportId,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the token is included
          },
        }
      );
      const updatedReport = response.data;

      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === updatedReport._id ? updatedReport : report
        )
      );
      toast({
        title: "Status Updated",
        description: `Report status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error("Failed to update report status:", error);
      toast({
        title: "Error",
        description: "Failed to update report status.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading screen while fetching
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Reports</h1>
          <p className="text-muted-foreground">Review and manage user reports</p>
        </div>

        <div className="grid gap-4">
          {reports.map((report) => (
            <Card key={report._id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <h3 className="font-semibold">{report.reporter.name}</h3>
                    <span className="text-muted-foreground">reported</span>
                    <h3 className="font-semibold">{report.reported.name}</h3>
                  </div>
                  <p className="text-sm">{report.details}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={report.status}
                    onValueChange={(value: Status) =>
                      handleStatusChange(report._id, value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="under-review">Under Review</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

const getStatusColor = (status: Status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "under-review":
      return "bg-blue-500";
    case "resolved":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};
