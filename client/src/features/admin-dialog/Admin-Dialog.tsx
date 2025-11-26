import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AdminDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (password: string) => boolean; // Returns true if password is correct
}

export const AdminDialog: React.FC<AdminDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
}) => {
  const [password, setPassword] = React.useState<string>("");
  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (onSubmit) {
      const isCorrect = onSubmit(password);
      if (!isCorrect) {
        setAlertOpen(true);
        setPassword("");
      } else {
        onOpenChange(false);
        setPassword("");
        setAlertOpen(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
            <DialogTitle>Admin Passcode</DialogTitle>
            <DialogDescription>
              Enter the password to show the navbar again.
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
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleClick}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
