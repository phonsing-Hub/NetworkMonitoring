import React from "react";
import { Listbox, ListboxItem, cn } from "@nextui-org/react";
import { ListboxWrapper } from "./ListboxWrapper";
import { AddNoteIcon } from "../icons/AddNoteIcon.jsx";
import { CopyDocumentIcon } from "../icons/CopyDocumentIcon.jsx";
import { EditDocumentIcon } from "../icons/EditDocumentIcon.jsx";
import { DeleteDocumentIcon } from "../icons/DeleteDocumentIcon.jsx";

export default function ListItems() {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <ListboxWrapper>
      <Listbox variant="flat" aria-label="Listbox menu with descriptions">
        <ListboxItem
          key="new"
          description="Create a new file"
          startContent={<AddNoteIcon className={iconClasses} />}
        >
          New file
        </ListboxItem>
        <ListboxItem
          key="copy"
          description="Copy the file link"
          startContent={<CopyDocumentIcon className={iconClasses} />}
        >
          Copy link
        </ListboxItem>
        <ListboxItem
          key="edit"
          showDivider
          description="Allows you to edit the file"
          startContent={<EditDocumentIcon className={iconClasses} />}
        >
          Edit file
        </ListboxItem>
        <ListboxItem
          key="delete"
          className="text-danger"
          color="danger"
          description="Permanently delete the file"
          startContent={
            <DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />
          }
        >
          Delete file
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}
