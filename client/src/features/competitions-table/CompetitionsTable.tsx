import type { Competition } from "@/models/competition";
import { competitionColumns, competitionTypeList } from "./CompetitionColumns";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/table";
import {
  createCompetition,
  getAllCompetitions,
} from "@/services/competitionService";
import { useCompetition } from "@/hooks/useCompetition";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, set } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { deleteCompetition } from "@/services/competitionService";

interface tableProps {
  isSelected: boolean;
}

export const CompetitionsTable: React.FC<tableProps> = ({ isSelected }) => {
  const [competitions, setCompetitions] = useState<Competition[]>([]); // original copy of competitions, update when user saves any edits
  const [rows, setRows] = useState<Competition[]>([]); // rows for data table
  const [compType, setCompType] = useState<string>("");
  const [open, setOpen] = React.useState(false); //calendar open state
  const [date, setDate] = React.useState<string>("");
  const { setComp } = useCompetition();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [password, setPassword] = React.useState<string>("");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [pendingAction, setPendingAction] = useState<string>("");
  const [rowToDelete, setRowToDelete] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);

    getAllCompetitions()
      .then((res: Competition[]) => {
        setCompetitions(res);
        setRows(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdate = (rowIndex: number, columnId: string, value: unknown) => {
    setRows((old) =>
      old.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  };

  const handleDelete = () => {
    if (pendingAction === "delete" && rowToDelete) {
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
      if (password === adminPassword) {
        deleteCompetition(rowToDelete)
          .then(() => {
            loadData();
            setPendingAction("");
            setRowToDelete(null);
          })
          .catch(console.error);
      }
    }
    setPassword("");
    setAlertOpen(false);
    setIsOpen(false);
  };

  const addRow = () => {
    const newComp: Competition = {
      id: 0,
      date_of: date,
      type: compType,
    };

    createCompetition(newComp).then(() => {
      loadData();
    });
  };

  const loadContent = () => {
    if (loading) {
      return (
        <>
          <span className="text-2xl font-medium px-4 py-2 block border-1">
            Competitions
          </span>
          <div className="px-5 border-1 rounded-sm bg-white shadow-xl min-h-[200px] flex justify-center items-center">
            <div className="w-full pt-2 flex justify-center">
              <Spinner variant="default" className="w-8 h-8 text-primary" />
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <span className="text-2xl font-medium px-4 py-2 block border-1">
          Competitions
        </span>
        <div className="px-5 border-1 rounded-sm bg-white shadow-xl">
          <div className="flex space-x-2 pt-5">
            {/* Date */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker"
                  className="w-32 justify-between font-normal"
                >
                  {date ? format(date, "MM/dd/yyyy") : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  // selected={new Date(date)}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(format(date as Date, "MM/dd/yyyy"));
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>

            {/* Type */}
            <Select onValueChange={(value) => setCompType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {competitionTypeList.map((type, index) => (
                  <SelectItem key={index} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Add Button */}
            <Button size="sm" onClick={addRow}>
              <Plus />
            </Button>
          </div>

          {/* Competitions Table */}
          <div className="w-full pt-2  min-h-[300px] ">
            <DataTable
              columns={competitionColumns}
              data={rows}
              onDeselect={(rowIndex, isSave) => {
                // edit row was just canceled, revert row back to pre-edit state
                setRows((old) =>
                  old.map((row, index) =>
                    // search rows until we find rowIndex
                    index === rowIndex && !isSave ? competitions[index] : row
                  )
                );
              }}
              onUpdate={handleUpdate}
              onDelete={(compId?: number) => {
                if (compId) {
                  setRowToDelete(compId);
                  setPendingAction("delete");
                  setIsOpen(true);
                }
              }}
              onRowClick={(row) => {
                if (!isSelected) {
                  setComp(row);
                }
              }}
              isEdit={false}
              isRouteSelected={isSelected}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {loadContent()}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <form onSubmit={(e) => e.preventDefault()}>
          <DialogContent className="sm:max-w-[425px]">
            {alertOpen && (
              <Alert variant="destructive">
                <AlertTitle>Wrong Password</AlertTitle>
                <AlertDescription>
                  <p>Please Try Again</p>
                </AlertDescription>
              </Alert>
            )}
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Enter the admin password to confirm deleting this competition.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="password">Admin Code</Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter admin password"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={() => setPendingAction("")}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};
