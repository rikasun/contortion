import { Button, Dialog } from "@radix-ui/themes";

interface Props {
  instruction: string;
  detail?: string;
  focus?: string;
}

export function FocusCard({ instruction, detail, focus }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button
            size="2"
            variant="surface"
            className="!w-full !justify-center"
          >
            How to do it
          </Button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="520px">
          <Dialog.Title>How to do it</Dialog.Title>
          <Dialog.Description size="3" mb="2">
            {instruction}
          </Dialog.Description>
          {detail ? (
            <div
              className="text-[14px] leading-[1.5] mt-2"
              style={{ color: "var(--ink-soft)" }}
            >
              {detail}
            </div>
          ) : null}
          <div className="flex justify-end mt-4">
            <Dialog.Close>
              <Button variant="soft">Close</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>

      <Dialog.Root>
        <Dialog.Trigger>
          <Button
            size="2"
            className="!w-full !justify-center"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            Your focus
          </Button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="520px">
          <Dialog.Title>Your focus</Dialog.Title>
          <Dialog.Description size="3" mb="2">
            {focus ?? "No specific focus for this exercise."}
          </Dialog.Description>
          <div className="flex justify-end mt-4">
            <Dialog.Close>
              <Button variant="soft">Close</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
