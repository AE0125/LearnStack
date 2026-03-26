"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox"
import { Button } from "@/components/ui/button"
import { Group } from "@/app/generated/prisma/client"
import { Badge } from "@/components/ui/badge"

export default function GroupPicker({ 
  groups, 
  value, 
  onValueChange 
}: { 
  groups: Group[], 
  value?: Group | null, 
  onValueChange?: (val: Group | null) => void 
}) {
  return (
    <>
      <Combobox 
        items={groups} 
        itemToStringLabel={(item: Group) => item.code}
        value={value}
        onValueChange={onValueChange}
      >
        <ComboboxTrigger
          render={
            <Button
              variant="outline"
              className="w-full justify-between font-normal"
            >
              <ComboboxValue />
            </Button>
          }
        />
        <ComboboxContent>
          <ComboboxInput
            showTrigger={false}
            showClear={true}
            placeholder="Search"
          />
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item}>
                <Badge variant="secondary">{item.code}</Badge>
                {item.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  )
}
