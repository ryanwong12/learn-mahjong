import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "../ui/drawer";
import { Switch } from "../ui/switch";
import { RotateCcw, Settings2Icon } from "lucide-react";

type SettingsProps = {
  showEnglishNames: boolean;
  setShowEnglishNames: (value: boolean) => void;
  showChineseNames: boolean;
  setShowChineseNames: (value: boolean) => void;
  hardMode: boolean;
  setHardMode: (value: boolean) => void;
  resetProgress: () => void;
};

const SettingsMenu = ({
  showEnglishNames,
  setShowEnglishNames,
  showChineseNames,
  setShowChineseNames = () => {},
  hardMode,
  setHardMode,
  resetProgress,
}: SettingsProps) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings2Icon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
          </DialogHeader>
          <SettingsForm
            showEnglishNames={showEnglishNames}
            setShowEnglishNames={setShowEnglishNames}
            showChineseNames={showChineseNames}
            setShowChineseNames={setShowChineseNames}
            hardMode={hardMode}
            setHardMode={setHardMode}
            resetProgress={resetProgress}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings2Icon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Settings</DrawerTitle>
          {/* <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription> */}
        </DrawerHeader>
        <SettingsForm
          showEnglishNames={showEnglishNames}
          setShowEnglishNames={setShowEnglishNames}
          showChineseNames={showChineseNames}
          setShowChineseNames={setShowChineseNames}
          hardMode={hardMode}
          setHardMode={setHardMode}
          resetProgress={resetProgress}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsMenu;

const SettingsForm: React.FC<SettingsProps> = ({
  showEnglishNames,
  setShowEnglishNames,
  showChineseNames,
  setShowChineseNames,
  hardMode,
  setHardMode,
  resetProgress,
}) => {
  return (
    <form>
      {/* Add your form fields here */}
      <div className="flex flex-col gap-6 mb-16 px-4 text-xl">
        {/* Show English Names Toggle */}
        <div className="flex items-center justify-between">
          <span className="font-medium">Show English Names</span>
          <Switch
            style={{ transform: "scale(1.3)" }}
            // disabled={hardMode}
            checked={showEnglishNames}
            onClick={() => setShowEnglishNames(!showEnglishNames)}
            className="ml-2"
          />
        </div>

        {/* Show Chinese Names Toggle */}
        <div className="flex items-center justify-between">
          <span className="font-medium">Show Chinese Names</span>
          <Switch
            style={{ transform: "scale(1.3)" }}
            // disabled={hardMode}
            checked={showChineseNames}
            onClick={() => setShowChineseNames(!showChineseNames)}
            className="ml-2"
          />
        </div>

        {/* Hard Mode Toggle */}
        <div className="flex items-center justify-between">
          <span className="font-medium">Hard Mode</span>
          <Switch
            style={{ transform: "scale(1.3)" }}
            checked={hardMode}
            onClick={() => {
              setHardMode(!hardMode);
              setShowEnglishNames(hardMode ? showEnglishNames : false);
            }}
            className="ml-2"
          />
        </div>

        {/* Reset Button */}
        <div className="flex items-center justify-between">
          <span className="font-medium">Reset Progress</span>
          <Button variant="outline" onClick={resetProgress} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
};
