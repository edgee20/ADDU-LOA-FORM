import { Button } from "#components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#components/ui/dialog";
import { Field, FieldGroup } from "#components/ui/field";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";

export function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Submit</Button>
        </DialogTrigger>
        <DialogContent className="w-[450px] h-[220px] p-[25px] rounded-lg border-2 border-gray-300">
          <DialogHeader className="mb-auto">
            <DialogTitle className="text-2xl font-semibold text-black">
              Confirmation
            </DialogTitle>
            <DialogDescription className="text-base text-gray-700">
              Are you sure you want to continue with this action? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between gap-2 bg-transparent mt-6">
            <DialogClose asChild>
              <Button variant="outline" className="px-6">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-blue-600 text-white px-6 hover:bg-blue-700"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
