import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface LogScoreProps {
  className?: string;
}

export const LogScore: React.FC<LogScoreProps> = ({ className }) => {
  const onSubmit = () => console.log("submitted");

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>

      <Card className="w-full max-w-lg  text-lg"> {/* increase text and spacing */}
        <CardHeader>
          <CardTitle>Score Sheet</CardTitle>
          <CardDescription >
            Select the completed routes
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-6">
            {/* School */}
            <div className="grid gap-2">
              <Label >School</Label>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select a School" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sac">SacState</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Name */}
            <div className="grid gap-2">
              <Label >Name</Label>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select your Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="magnus">Magnus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Route */}
            <div className="grid gap-2">
              <Label >Route</Label>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select a Route" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sac">1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Attempt */}
            <div className="grid gap-2">
              <Label>Attempt</Label>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Attempt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button onClick={onSubmit} className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
