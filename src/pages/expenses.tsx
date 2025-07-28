import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUniversities } from "@/@core/api/api";
import { University } from "@/types/university";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Expense = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const { toggleSidebar } = useSidebar();

  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  const [open, setOpen] = useState(false);
  const [inputCountry, setInputCountry] = useState(""); // input shown
  const [shouldFetch, setShouldFetch] = useState(false); // only true if "United States"

  const {
    isPending,
    error,
    data: fetchedData,
  } = useQuery<University[], Error>({
    queryKey: ["universities"],
    queryFn: () => getUniversities("United States"),
    enabled: shouldFetch,
    retry: 2,
  });

  useEffect(() => {
    if (fetchedData) setUniversities(fetchedData);
  }, [fetchedData]);

  const totalPages = Math.ceil(universities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = universities.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (uni: University) => {
    setSelectedUni(uni);
    setOpen(true);
  };

  const handleDelete = (name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setUniversities((prev) => prev.filter((uni) => uni.name !== name));
    }
  };

  return (
    <div className="p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Expenses</h1>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4 w-full max-w-sm flex gap-2">
        <Input
          type="text"
          placeholder='search'
          value={inputCountry}
          onChange={(e) => setInputCountry(e.target.value)}
        />
        <Button
          onClick={() => {
            const trimmed = inputCountry.trim().toLowerCase();
            if (trimmed === "united states") {
              setShouldFetch(true);
              setCurrentPage(1);
            } else {
              setShouldFetch(false);
              setUniversities([]); // clear table
            }
          }}
        >
          Search
        </Button>
      </div>

      {/* Message if input not "United States" */}
      {!shouldFetch && (
        <p className="text-sm text-gray-600 italic">
          no data found
        </p>
      )}

      {/* Table */}
      {shouldFetch && (
        <div className="mt-4 w-full overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1 text-left">Sr.</th>
                <th className="border px-2 py-1 text-left">Name</th>
                <th className="border px-2 py-1 text-left">Country</th> 
                <th className="border px-2 py-1 text-left">Alpha Code</th>
                <th className="border px-2 py-1 text-left">State</th>
                <th className="border px-2 py-1 text-left">Domain</th>
                <th className="border px-2 py-1 text-left">Website</th>
                <th className="border px-2 py-1 text-left w-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isPending ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={8} className="text-center text-red-600 py-4">
                    Error: {error.message}
                  </td>
                </tr>
              ) : (
                visibleItems.map((uni, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="border px-2 py-1">{uni.name}</td>
                    <td className="border px-2 py-1">{uni.country}</td>
                    <td className="border px-2 py-1">{uni.alpha_two_code}</td>
                    <td className="border px-2 py-1">{uni["state-province"] ?? "Null"}</td>
                    <td className="border px-2 py-1">{uni.domains?.[0]}</td>
                    <td className="border px-2 py-1">
                      <a
                        href={uni.web_pages?.[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {uni.web_pages?.[0]}
                      </a>
                    </td>
                    <td className="border px-2 py-1 w-40">
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="text-xs" onClick={() => handleEdit(uni)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs" onClick={() => handleDelete(uni.name)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {shouldFetch && totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => Math.abs(currentPage - page) <= 2)
              .map((page) => (
                <PaginationItem key={page}>
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page ? "bg-gray-800 text-white" : "bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                </PaginationItem>
              ))}
            <PaginationItem>
              <PaginationNext onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>University Info</DialogTitle>
            <DialogDescription>
              {selectedUni ? (
                <div className="space-y-2 text-sm mt-4">
                  <p><strong>Name:</strong> {selectedUni.name}</p>
                  <p><strong>Country:</strong> {selectedUni.country}</p>
                  <p><strong>Alpha Code:</strong> {selectedUni.alpha_two_code}</p>
                  <p><strong>State:</strong> {selectedUni["state-province"] ?? "Null"}</p>
                  <p><strong>Domain:</strong> {selectedUni.domains?.[0]}</p>
                  <p>
                    <strong>Website:</strong>
                    <a href={selectedUni.web_pages?.[0]} target="_blank" className="text-blue-600 underline ml-1">
                      {selectedUni.web_pages?.[0]}
                    </a>
                  </p>
                </div>
              ) : (
                "No data available"
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Expense;
