"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function LeadTable() {
  const [mounted, setMounted] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("All");
  const [source, setSource] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/leads?page=${page}&search=${search}&stage=${stage}&source=${source}`
      );
      const data = await res.json();
      setLeads(data.leads || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!mounted) return;
    const delayDebounceFn = setTimeout(() => {
      fetchLeads();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, stage, source, page, mounted]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            className="pl-10"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <Select
          value={stage}
          onValueChange={(val) => {
            setStage(val);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Stages</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Qualified">Qualified</SelectItem>
            <SelectItem value="Proposal">Proposal</SelectItem>
            <SelectItem value="Negotiation">Negotiation</SelectItem>
            <SelectItem value="Closed Won">Closed Won</SelectItem>
            <SelectItem value="Closed Lost">Closed Lost</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={source}
          onValueChange={(val) => {
            setSource(val);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Sources</SelectItem>
            <SelectItem value="Website">Website</SelectItem>
            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            <SelectItem value="Referral">Referral</SelectItem>
            <SelectItem value="Cold Call">Cold Call</SelectItem>
            <SelectItem value="Email Campaign">Email Campaign</SelectItem>
            <SelectItem value="Event">Event</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : leads.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  No leads found.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((item: any) => (
                <TableRow
                  key={item._id}
                  className="cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => {
                    setSelectedLead(item);
                    setIsModalOpen(true);
                  }}
                >
                  <TableCell className="font-medium">
                    <div>
                      <p>{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{item.company}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`font-semibold ${
                        item.stage === "Closed Won"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : item.stage === "Closed Lost"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : item.stage === "New"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}
                    >
                      {item.stage}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.source}</TableCell>
                  <TableCell className="font-medium">
                    ₹{item.value?.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || loading}
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedLead?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-900">
              <div>
                <p className="text-muted-foreground font-normal">Email</p>
                <p className="font-medium truncate">{selectedLead?.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-normal">Phone</p>
                <p className="font-medium">{selectedLead?.phone || "N/A"}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-normal">Company</p>
                <p className="font-medium">{selectedLead?.company}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-normal">Source</p>
                <p className="font-medium">{selectedLead?.source}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-normal">Stage</p>
                <Badge
                  variant="outline"
                  className={`mt-1 
                 ${
                   selectedLead?.stage === "Closed Won"
                     ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                     : ""
                 }
                ${
                  selectedLead?.stage === "Closed Lost"
                    ? "bg-rose-100 text-rose-700 border-rose-200"
                    : ""
                }
                ${
                  selectedLead?.stage === "New"
                    ? "bg-blue-100 text-blue-700 border-blue-200"
                    : ""
                }
                `}
                >
                  {selectedLead?.stage}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground font-normal">Value</p>
                <p className="font-medium">
                  ₹{selectedLead?.value?.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-muted-foreground text-sm font-normal">Notes</p>
              <p className="text-sm mt-1 bg-slate-50 p-3 rounded-md italic text-slate-700 leading-relaxed">
                {selectedLead?.notes ||
                  "No additional notes available for this lead."}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
